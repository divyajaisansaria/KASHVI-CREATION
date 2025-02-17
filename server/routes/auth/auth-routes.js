const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const zxcvbn = require("zxcvbn"); // ✅ Import zxcvbn for strong password validation
const User = require("../../models/User");
const OTP = require("../../models/OTP"); // Import OTP model to save OTP in the database
const axios = require("axios"); // For sending OTP via external service

const router = express.Router();

// 📌 Register Route (Added Strong Password Validation)
router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists!" });
    }

    // ✅ Validate password strength using zxcvbn
    const passwordStrength = zxcvbn(password);
    if (passwordStrength.score < 2) {
      return res.status(400).json({
        success: false,
        message: "Password is too weak! Use a stronger password.",
      });
    }

    // ✅ Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create and save the new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ success: true, message: "User registered successfully!" });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// 📌 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials!" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // ✅ Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ success: true, token, user });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// 📌 Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found!" });
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Create a transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5173/auth/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Reset link sent to your email." });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// 📌 Reset Password Route (Added Strong Password Validation)
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    // ✅ Validate password strength using zxcvbn
    const passwordStrength = zxcvbn(newPassword);
    if (passwordStrength.score < 2) {
      return res.status(400).json({
        success: false,
        message: "Password is too weak! Use a stronger password.",
      });
    }

    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // ✅ Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password has been reset successfully." });

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// 📌 OTP-based Reset Password Route
router.post("/send-reset-otp", async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random OTP
  const expiry = new Date(Date.now() + 5 * 60000); // OTP expiry in 5 minutes

  // Save OTP in database
  await OTP.findOneAndUpdate({ phone }, { otp, expiry }, { upsert: true });

  // Send OTP via Fast2SMS (or any other service)
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      new URLSearchParams({
        authorization: process.env.FAST2SMS_API_KEY,
        route: "otp",
        variables_values: otp.toString(),
        numbers: phone,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json({ success: true, message: "OTP sent!" });
  } catch (error) {
    res.json({ success: false, message: "Error sending OTP", error });
  }
});

// 📌 OTP Verification for Reset Password
router.post("/verify-reset-otp", async (req, res) => {
  const { phone, enteredOtp } = req.body;
  const userOtp = await OTP.findOne({ phone });

  if (!userOtp) return res.json({ success: false, message: "OTP not found" });
  if (userOtp.otp !== enteredOtp) return res.json({ success: false, message: "Invalid OTP" });
  if (new Date() > userOtp.expiry) return res.json({ success: false, message: "OTP expired" });

  res.json({ success: true, message: "OTP Verified!" });
});

module.exports = router;

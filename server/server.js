require("dotenv").config();
console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ **Corrected MongoDB Connection**
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the server if MongoDB fails
  });
  app.use(cookieParser()); // ✅ Required for parsing cookies

  app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5174"], // ✅ Adjust for your frontend
      credentials: true, // ✅ Required to allow cookies
    })
  );
  
// app.use(cookieParser());

// ✅ **Ensure CORS allows credentials**
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // ✅ Allow frontend ports
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // ✅ Required for cookies in frontend requests
  })
);

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

app.post("/api/auth/logout", (req, res) => {
  console.log("🔹 Logout request received...");

  console.log("🔹 Cookies received:", req.cookies); // Log all cookies

  const token = req.cookies?.token; // ✅ Get token from cookies safely
  console.log("🔹 Token from cookies:", token);

  if (!token) {
    console.log("❌ No token found in cookies!");
    return res.status(400).json({ success: false, message: "No token provided!" });
  }

  // ✅ Clear the cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // False in development
    sameSite: "None",
  });

  console.log("✅ Token cleared from cookies.");
  res.json({ success: true, message: "Logged out successfully." });
});



// ✅ **Start the Server**
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));

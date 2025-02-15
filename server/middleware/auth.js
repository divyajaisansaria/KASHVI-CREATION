const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token; // Check if token exists in cookies

  if (!token) {
    return res.status(401).json({ message: "Access Denied! No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY"); // Use the correct secret key
    req.user = decoded; // Store decoded user info in `req.user`
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = { verifyToken };

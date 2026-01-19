const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log("Auth middleware is called");

  const authHeader = req.headers.authorization;
  console.log("Auth header", authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!process.env.JWT_SECRET_KEY) {
    console.error("JWT_SECRET_KEY is not configured");
    return res.status(500).json({ message: "Server configuration error" });
  }

  try {
    const decodedTockenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token", decodedTockenInfo);
    req.userInfo = decodedTockenInfo;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = authMiddleware;
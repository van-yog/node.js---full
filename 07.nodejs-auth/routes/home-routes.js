const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

router.get("/welcome", authMiddleware, (req, res) => {
  const { username, email, role } = req.userInfo;
  res.json({ message: "Welcome to the home page", user: { username, email, role } });
});

module.exports = router;
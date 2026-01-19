const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const isAdminUser = require('../middleware/admin-middleware');

router.get("/welcome", authMiddleware, isAdminUser, (req, res) => {
  const { username, email, role } = req.userInfo;
  res.json({ message: "Welcome to the admin page", user: { username, email, role } });
});

module.exports = router;
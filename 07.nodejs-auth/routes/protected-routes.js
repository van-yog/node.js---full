const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

// Protected route example - requires authentication
router.get('/profile', authMiddleware, (req, res) => {
  // req.user contains the decoded token data
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user
  });
});

module.exports = router;

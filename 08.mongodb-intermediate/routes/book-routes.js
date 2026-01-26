const express = require('express');
const router = express.Router();
const { createAuthor } = require('../controllers/book-controller');

router.post('/create-author', createAuthor);

module.exports = router;
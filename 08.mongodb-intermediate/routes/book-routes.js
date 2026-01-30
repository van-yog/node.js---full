const express = require('express');
const router = express.Router();
const { createAuthor, getBooks, createBook } = require('../controllers/book-controller');

router.post('/create-author', createAuthor);
router.post('/create-book', createBook);
router.get('/get-books', getBooks);

module.exports = router;
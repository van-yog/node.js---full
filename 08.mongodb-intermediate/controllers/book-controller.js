const Author = require('../models/Author');
const Book = require('../models/Book');

const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const author = await Author.create({ name, bio });
    res.status(201).json({ author });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author');
    res.status(200).json({ books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

const createBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    
    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are required" });
    }

    // Check if author exists
    const authorExists = await Author.findById(author);
    if (!authorExists) {
      return res.status(404).json({ message: "Author not found" });
    }

    const book = await Book.create({ title, author });
    const populatedBook = await Book.findById(book._id).populate('author');
    
    res.status(201).json({ book: populatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createAuthor, getBooks, createBook };
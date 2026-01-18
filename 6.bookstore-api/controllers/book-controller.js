const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books });
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

const getSingleBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ book });
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

const addNewBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newBook = await Book.create({ title, author, year });
    res.status(201).json({ message: "Book added successfully", book: newBook });
  }
  catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

const updateBook = async (req, res) => { }

const deleteBook = async (req, res) => { }

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
}
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

module.exports = { createAuthor };
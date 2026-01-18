const express = require("express");

const app = express();

// middleware
app.use(express.json());


let books = [
  { id: 1, title: "Book 1", author: "Author 1" },
  { id: 2, title: "Book 2", author: "Author 2" },
  { id: 3, title: "Book 3", author: "Author 3" },
]

app.get("/", (req, res) => {
  res.send("Welcome to the books API");
})

// get all books
app.get("/books", (req, res) => {
  res.json(books);
})

// get a single book
app.get("/books/:id", (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
})

// add a new book
app.post("/add", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: `Book ${books.length + 1}`,
    author: `Author ${books.length + 1}`,
  }
  books.push(newBook);
  res.status(201).json({ data: newBook, message: "Book created successfully" });
})

// update a book
app.put("/books/:id", (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  book.title = req.body.title;
  book.author = req.body.author;
  res.json({ data: book, message: "Book updated successfully" });
})

// delete a book
app.delete("/books/:id", (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  books = books.filter(book => book.id !== parseInt(req.params.id));
  res.json({ message: "Book deleted successfully" });
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

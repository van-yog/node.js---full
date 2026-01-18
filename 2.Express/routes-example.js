const express = require("express");

const app = express();

const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
]

// root route
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
})

// get all products
app.get("/products", (req, res) => {

  res.json(products);
})

// get a single product
app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})


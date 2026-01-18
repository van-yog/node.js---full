const express = require("express");

const app = express();

const myFirstMiddleware = (req, res, next) => {
  console.log("This is middleware will run on every request");

  next();
}

app.use(myFirstMiddleware);

app.get("/", (req, res) => {
  res.send("Home page");
  console.log("Home page");
});

app.get("/about", (req, res) => {
  res.send("About page");
  console.log("About page");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
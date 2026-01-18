const express = require("express");

const app = express();

const requestTimestampLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();



  console.log(`[${timestamp}] from ${req.method} ${req.url}`);

  next();
}

app.use(requestTimestampLogger);

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
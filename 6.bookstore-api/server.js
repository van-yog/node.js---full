require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./database/db");
const bookRoutes = require("./routes/book-routes");

const PORT = process.env.PORT || 3000;

//connect to database
connectDB();

// middleware -> express.json()
app.use(express.json());

//routes
app.use("/api/books", bookRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
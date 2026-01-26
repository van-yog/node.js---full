require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');
const productRoutes = require('./routes/product-routes');


const app = express();


// connect to MongoDB
connectDB();
// middleware to parse JSON bodies
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/products', productRoutes);

// start the server
const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
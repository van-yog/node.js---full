require('dotenv').config();
const connectDB = require('./database/db');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');

// Connect to MongoDB
connectDB();

// middleware to parse JSON bodies
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
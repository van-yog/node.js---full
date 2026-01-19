require('dotenv').config();
const connectDB = require('./database/db');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const protectedRoutes = require('./routes/protected-routes');
const imageRoutes = require('./routes/image-routes');

// Connect to MongoDB
connectDB();

// middleware to parse JSON bodies
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/images', imageRoutes);

// Protected routes (require authentication)
app.use('/api', protectedRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
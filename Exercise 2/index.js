const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bookRoutes = require('./routes/books');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Books API'
  });
});

// Books routes
app.use('/books', bookRoutes);

// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌MongoDB connection failed:', error.message);
    process.exit(1);
  });




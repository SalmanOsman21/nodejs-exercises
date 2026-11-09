const Book = require('../models/Book');

// CREATE BOOK
const createBook = async (req, res) => {
  try {
    const { title, author, publishedYear, genre } = req.body;

    const book = await Book.create({
      title,
      author,
      publishedYear,
      genre
    });

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};


// GET ALL BOOKS
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get books',
      error: error.message
    });
  }
};


// GET SINGLE BOOK
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });

  } catch (error) {
    const status = error.name === 'CastError' ? 400 : 500;

    res.status(status).json({
      success: false,
      message: status === 400 ? 'Invalid book ID' : 'Server error'
    });
  }
};


// UPDATE BOOK
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book
    });

  } catch (error) {
    const status =
      error.name === 'CastError' ||
      error.name === 'ValidationError' ? 400 : 500;

    res.status(status).json({
      success: false,
      message: error.message
    });
  }
};


// DELETE BOOK
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully'
    });

  } catch (error) {
    const status = error.name === 'CastError' ? 400 : 500;

    res.status(status).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
};
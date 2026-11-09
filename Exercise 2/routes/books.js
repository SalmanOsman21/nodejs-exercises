const express = require('express');
const router = express.Router();

const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
} = require('../controllers/booksController');

// CREATE
router.post('/', createBook);

// READ ALL
router.get('/', getBooks);

// READ ONE
router.get('/:id', getBook);

// UPDATE
router.put('/:id', updateBook);

// DELETE
router.delete('/:id', deleteBook);

module.exports = router;
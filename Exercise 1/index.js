const express = require ('express');

const app = express();

app.use(express.json());

let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport' }
];


// Get All books
app.get("/books", (req, res) => {


  res.json(books);
});


//Get a single book

app.get('/books/:id', (req, res) => {
  const id = Number(req.params.id);

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  res.json(book);
});

// Post
app.post('/books', (req, res) => {
  const bookData = req.body;

  const newBook = {
    id: books.length + 1,
    title: bookData.title,
    author: bookData.author
  };

  books.push(newBook);

  res.status(201).json(newBook);
});


// Put 
app.put('/books/:id', (req, res) => {
  const id = Number(req.params.id);

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  book.title = req.body.title;

  res.json(book);
});

//Delete
app.delete('/books/:id', (req, res) => {
  const id = Number(req.params.id);

  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }

  books.splice(bookIndex, 1);

  res.json({ message: 'Book deleted successfully' });
});

app.listen(3000, ()=>{
    console.log(`Server is running att http:localhost:3000`)
})
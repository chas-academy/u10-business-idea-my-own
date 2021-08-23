const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books');
const users = require('./routes/api/users');
const comments = require('./routes/api/comments');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);
app.use('/api/users', users);
app.use('/api/comments', comments);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
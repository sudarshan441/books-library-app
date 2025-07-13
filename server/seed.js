const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const fs = require('fs');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const data = JSON.parse(fs.readFileSync('./books.json', 'utf-8'));
Book.insertMany(data.books)
  .then(() => {
    console.log('Books inserted!');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));

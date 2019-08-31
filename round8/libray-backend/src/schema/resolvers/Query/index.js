const services = require("../../../services");

const bookCount = () => services.books.getAll().length;

const authorCount =  () => services.authors.getAll().length;

const allBooks = () => services.books.getAll();

const allAuthors = () => services.authors.getAll();

module.exports = {
  bookCount,
  authorCount,
  allBooks,
  allAuthors
};

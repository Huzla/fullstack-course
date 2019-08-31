const services = require("../../../services");

const bookCount = () => services.books.getAll().length;

const authorCount =  () => services.authors.getAll().length;

const allBooks = (root, args) => {
  const books = services.books.getAll();

  return (typeof args.author !== "undefined") ? books.filter(book => book.author === args.author) : books;
};

const allAuthors = () => services.authors.getAll();

module.exports = {
  bookCount,
  authorCount,
  allBooks,
  allAuthors
};

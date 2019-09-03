const services = require("../../../services");

const bookCount = () => services.books.getAll().length;

const authorCount = async () => {
  const authors = await services.authors.getAll();

  return authors.length;
};

const allBooks = (root, args) => {
  let books = services.books.getAll();
  books =  (typeof args.author !== "undefined") ? books.filter(book => book.author === args.author) : books;
  books =  (typeof args.genre !== "undefined") ? books.filter(book => book.genres.includes(args.genre)) : books;

  return books;
};

const allAuthors = () => services.authors.getAll();

module.exports = {
  bookCount,
  authorCount,
  allBooks,
  allAuthors
};

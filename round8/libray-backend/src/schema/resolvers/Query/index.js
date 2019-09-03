const services = require("../../../services");

const bookCount = async () => {
  const books = await services.books.getAll();

  return books.length;
};

const authorCount = async () => {
  const authors = await services.authors.getAll();

  return authors.length;
};

const allBooks = async (root, args) => {
  let books = await services.books.getAll();

  books = (typeof args.author !== "undefined") ? books.filter(book => book.author.name === args.author) : books;
  books = (typeof args.genre !== "undefined") ? books.filter(book => book.genres.includes(args.genre)) : books;

  return books;
};

const allAuthors = () => services.authors.getAll();

const me = (root, args, context) => {
  return context.currentUser;
};

module.exports = {
  bookCount,
  authorCount,
  allBooks,
  allAuthors,
  me
};

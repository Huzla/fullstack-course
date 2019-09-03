const services = require("../../../services");

const bookCount = async (root) => {
  const author = (await services.authors.findByField("name", root.name))[0];
  const books = await services.books.getByField("author", author._id);

  return books.length;
};

module.exports = {
  bookCount,
};

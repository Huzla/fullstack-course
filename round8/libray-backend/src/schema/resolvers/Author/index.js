const services = require("../../../services");

const bookCount = (root) => services.books.getByField("author", root.name).length;

module.exports = {
  bookCount,
};

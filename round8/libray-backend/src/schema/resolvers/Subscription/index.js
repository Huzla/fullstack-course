const pubsub = require("../pubsub.js");

const bookAdded = {
  subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
};

module.exports = {
  bookAdded
};

const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

const bookAdded = {
  subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
};

module.exports = {
  bookAdded
};

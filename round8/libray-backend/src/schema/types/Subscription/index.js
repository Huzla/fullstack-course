const { gql } = require("apollo-server");

const typeDefs = gql`
  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;

const { gql } = require("apollo-server");

const typeDefs = gql`
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }
`;

module.exports = typeDefs;

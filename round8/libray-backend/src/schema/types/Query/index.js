const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }
`;

module.exports = typeDefs;

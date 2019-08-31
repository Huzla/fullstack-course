const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
`;

module.exports = typeDefs;

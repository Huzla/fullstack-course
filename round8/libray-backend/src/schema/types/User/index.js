const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
`;

module.exports = typeDefs;

const { gql } = require("apollo-server");
const services = require("../../services");

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => { return services.books.getAll().length; },
    authorCount: () => { return services.authors.getAll().length; }
  }
};

module.exports = {
  typeDefs,
  resolvers
};

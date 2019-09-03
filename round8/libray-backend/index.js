require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./src/schema");
const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

console.log("connecting to",  process.env.MONGO_URI);

mongoose.connect( process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${ url }`);
});

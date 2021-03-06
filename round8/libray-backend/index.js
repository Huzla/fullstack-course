require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./src/schema");
const { findByField } = require("./src/services").users;
const jwt = require("jsonwebtoken");
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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
      const currentUser = (await findByField("_id", decodedToken.id))[0];
      return { currentUser };
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${ url }`);
  console.log(`Subscriptions ready at ${ subscriptionsUrl }`);
});

const { AuthenticationError, UserInputError } = require("apollo-server");
const pubsub = require("../pubsub.js");
const services = require("../../../services");
const jwt = require("jsonwebtoken");

//Validation should probably be done in a separate module.
const addBook = async (root, args, context) => {
  if (!context.currentUser) {
    throw new AuthenticationError("Authentication required");
  }

  let author = (await services.authors.findByField("name", args.author))[0];
  let newAuthor = false;

  if (!(author)) {
    author = await services.authors.addNew({ name: args.author });
    newAuthor = true;
  }

  const content = { ...args, author: author._id };

  try {
    const bookAdded = await services.books.addNew(content);

    pubsub.publish("BOOK_ADDED", { bookAdded });

    return bookAdded;
  }
  catch (err) {
    if (newAuthor)
      await author.remove();

    throw err;
  }
};

const createUser = async (root, args) => services.users.addNew(args);

const login = async (root, args) => {
  const user = (await services.users.findByField("username", args.username))[0];

  if ( !user || args.password !== "SalaisinSana" ) {
    throw new UserInputError("Incorrect credentials")
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
};

const editAuthor = (root, args, context) => {
  if (!context.currentUser) {
    throw new AuthenticationError("Authentication required");
  }

  services.authors.editField(args.name, "born", args.setBornTo)
};

module.exports = {
  addBook,
  editAuthor,
  createUser,
  login
};

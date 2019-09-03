const services = require("../../../services");

//Validation should probably be done in a separate module.
const addBook = async (root, args) => {
  let author = (await services.authors.findByField("name", args.author))[0];
  let newAuthor = false;

  if (!(author)) {
    author = await services.authors.addNew({ name: args.author });
    newAuthor = true;
  }

  const content = { ...args, author: author._id };

  try {
    return services.books.addNew(content);
  }
  catch (err) {
    if (newAuthor)
      await author.remove();

    throw err;
  }
};

const createUser = (root, args) => {
  return null;
};

const login = (root, args) => {
  return null;
};

const editAuthor = (root, args) => services.authors.editField(args.name, "born", args.setBornTo);

module.exports = {
  addBook,
  editAuthor,
  createUser,
  login
};

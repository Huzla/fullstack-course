const services = require("../../../services");

//Validation should probably be done in a separate module.
const addBook = async (root, args) => {
  let author = (await services.authors.findByField("name", args.author))[0];

  if (!(author))
    author = await services.authors.addNew({ name: args.author });

  const content = { ...args, author: author._id };

  return services.books.addNew(content);
};

const editAuthor = (root, args) => services.authors.editField(args.name, "born", args.setBornTo);

module.exports = {
  addBook,
  editAuthor
};

const services = require("../../../services");

//Validation should probably be done in a separate module.
const addBook = (root, args) => {

  if (!services.authors.findByField("name", args.author))
    services.authors.addNew({ name: args.author });

  return services.books.addNew(args);
};

const editAuthor = (root, args) => services.authors.editField(args.name, "born", args.setBornTo);

module.exports = {
  addBook,
  editAuthor
};

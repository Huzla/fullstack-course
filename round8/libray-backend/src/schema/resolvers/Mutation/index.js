const services = require("../../../services");

//Validation should probably be done in a separate module.
const addBook = (root, args) => {
  
  if (!services.authors.findByField("name", args.author))
    services.authors.addNew({ name: args.author });

  return services.books.addNew(args);
};

module.exports = {
  addBook
};

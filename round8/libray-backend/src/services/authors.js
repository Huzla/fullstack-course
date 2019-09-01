const uuidv1 = require("uuid/v1");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

const getAll = () => authors;

const findByField = (field, value) => authors.find(author => author[field] === value);

const addNew = (content) => {
  const newAuthor = { ...content, id: uuidv1() };

  authors = authors.concat(newAuthor);

  return newAuthor;
};

module.exports = {
  getAll,
  findByField,
  addNew
};

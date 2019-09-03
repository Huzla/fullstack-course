const { Author } = require("../models");
const { UserInputError } = require("apollo-server");

const getAll = () => Author.find({});

const findByField = async (field, value) => Author.find({ [field]: value });

const addNew = (content) => {
  const newAuthor = new Author(content);

  try {
    return newAuthor.save();
  }
  catch (err) {
    throw new UserInputError(err.message, {
      invalidArgs: content
    });
  }
};

const editField = async (name, field, newValue) => {
  const editMe = (await findByField("name", name))[0];

  if (!editMe)
    return null;

  editMe[field] = newValue;

  return editMe.save();
};

module.exports = {
  getAll,
  findByField,
  addNew,
  editField
};

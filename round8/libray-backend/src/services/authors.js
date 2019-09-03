const { Author } = require("../models");

const getAll = () => Author.find({});

const findByField = (field, value) => Author.find({ [field]: value });

const addNew = (content) => {
  const newAuthor = new Author(content);

  return newAuthor.save();
};

const editField = async (name, field, newValue) => {
  const editMe = await findByField("name", name);

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

const { Book } = require("../models");
const { UserInputError } = require("apollo-server");

const getAll = () => Book.find({}).populate("author");

const getByField = (field, value) => Book.find({ [field]: value });

const addNew = async (content) => {
  const someBook = await Book.findOne({ title: content.title });

  if ((await Book.findOne({ title: content.title })))
    throw new UserInputError("Title must be unique", {
      invalidArgs: content.title
    });

  let newBook = new Book(content);

  newBook = await newBook.save();

  return Book.populate(newBook, { path: "author" });
};

module.exports = {
  getAll,
  getByField,
  addNew
};

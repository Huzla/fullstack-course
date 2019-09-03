const { User } = require("../models");
const { UserInputError } = require("apollo-server");

const addNew = async (content) => {
  const user = new User(content);

  try {
    const saved = await user.save();
    return saved;
  }
  catch (err) {
    throw new UserInputError(err.message, {
      invalidArgs: content,
    });
  }
};

const findByField = async (field, value) => User.find({ [field]: value });

module.exports = {
  addNew,
  findByField
}

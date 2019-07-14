const { Blog, User } = require("../../models");

const allUsers = () => {
  return User.find({}).exec();
};

const newUser = (body) => {
  return null;
};

const removeUser = (userId) => {
  return null;
};

const changeUser = async (userId) => {
  return null;
};

module.exports = {
  allUsers,
  newUser,
  removeUser,
  changeUser
};

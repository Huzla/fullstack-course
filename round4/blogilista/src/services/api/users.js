const { Blog, User } = require("../../models");

const allUsers = () => {
  return User.find({}).exec();
};

const newUser = (body) => {
  return null;
};

const removeser = (userId) => {
  return null;
};

const changeser = async (userId) => {
  return null;
};

module.exports = {
  allUsers,
  newUser,
  removeUser,
  changeUser
};

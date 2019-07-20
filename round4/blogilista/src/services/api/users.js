const { Blog, User } = require("../../models");

const allUsers = () => User.find({}).exec();

const newUser = (body) => new User(body).save();

const getUser = async (userId) => User.findOne({ userId }).exec();

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
  changeUser,
  getUser
};

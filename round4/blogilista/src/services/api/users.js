const { Blog, User } = require("../../models");

const allUsers = () => {
  return User.find({})
    .populate("blogs", { url: 1, title: 1, author: 1, id: 1 })
    .exec();
}

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

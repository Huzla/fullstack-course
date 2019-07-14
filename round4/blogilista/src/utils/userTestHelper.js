const { Blog, User } = require("../models");
const bcrypt = require('bcrypt');

const initialBlogs = [
  {
      title: "Testi",
      author: "Teppo Testaaja",
      url: "testi.com",
      likes: 0,
  },
  {
      title: "Testini",
      author: "Teppo Testaaja",
      url: "testi.fi",
      likes: 1,
  },
  {
      title: "Testauksesta",
      author: "Teppo Testaaja",
      url: "testi.net",
      likes: 123,
  },
  {
      title: "Testaajan käsikirja",
      author: "Teppo Testaaja",
      url: "testi.ninja",
      likes: 999,
  }
];

const testUsers = [{
  name: "Teppo Testaaja",
  userId: "Teppo123",
  pass: "salasana"
}];

const initDb = async () => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const saltRounds = 10
    const usersWithHash = await Promise.all(testUsers.map(async user => { return { ...user, pass: await bcrypt.hash(user.pass, saltRounds) } }));

    await Promise.all(initialBlogs.map(blog => new Blog(blog).save()));
    await Promise.all(usersWithHash.map(user => User(user).save()));
  }
  catch (err) {
    throw err;
  }
};

const initialNumOfBlogs = () => {
  return initialBlogs.length;
};

const initialNumOfUsers = () => {
  return testUsers.length;
};

const blogsInDb = async () => {
  try {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
  }
  catch (err) {
    throw err;
  }
};

const usersInDb = async () => {
  try {
    const users = await User.find({});
    return users.map(user => user.toJSON());
  }
  catch (err) {
    throw err;
  };
};

module.exports = {
  initDb,
  blogsInDb,
  initialNumOfBlogs,
  initialNumOfUsers,
  usersInDb,
  testUsers
};

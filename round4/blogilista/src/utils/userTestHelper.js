const { Blog, User } = require("../models");

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

    await Promise.all(initialBlogs.map(blog => new Blog(blog).save()));
    new Promise.all(testUsers.map(user => User(user).save()));
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

const usersInDb = () => {
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

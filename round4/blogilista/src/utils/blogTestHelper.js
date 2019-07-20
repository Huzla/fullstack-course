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
  password: "salasana"
}];

const initDb = async () => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const saltRounds = 10
    const usersWithHash = await Promise.all(testUsers.map(async user => { return { ...user, password: await bcrypt.hash(user.password, saltRounds) } }));

    const users = usersWithHash.map(user => User(user));
    const blogs = initialBlogs.map(blog => new Blog({ ...blog, user: users[0]._id }));
    users[0].blogs = blogs.map(blog => blog._id);

    await Promise.all(users.map(user => user.save()));
    await Promise.all(blogs.map(blog => blog.save()));
  }
  catch (err) {
    throw err;
  }
};

const initialNumOfBlogs = () => {
  return initialBlogs.length;
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

module.exports = {
  initDb,
  blogsInDb,
  initialNumOfBlogs,
  initialBlogs,
  testUsers
}

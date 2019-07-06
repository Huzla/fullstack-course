const Blog = require("../../models").blog;

const allBlogs = () => {
  return Blog.find({}).exec();
};

const newBlog = (body) => {
  const blog = new Blog(body)

  return blog.save();
};

module.exports = {
  allBlogs,
  newBlog
};

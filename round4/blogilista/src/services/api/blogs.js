const Blog = require("../../models").blog;

const allBlogs = () => {
  return Blog.find({}).exec();
};

const newBlog = (body) => {
  const blog = new Blog(body)

  return blog.save();
};

const removeBlog = (_id) => {
  return Blog.deleteOne({ _id }).exec();
};

module.exports = {
  allBlogs,
  newBlog,
  removeBlog
};

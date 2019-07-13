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

const changeBlog = async (id, likes) => {
    const blog = await Blog.findById(id).exec();

    if (!blog)
      return null;

    blog.likes = likes;
    return blog.save();
};

module.exports = {
  allBlogs,
  newBlog,
  removeBlog,
  changeBlog
};

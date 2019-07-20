const { Blog, User } = require("../../models");
const { NotFoundError } = require("../../errors");
const allBlogs = () => {
  return Blog.find({})
    .populate("user", { name: 1, userId: 1, _id: 1 })
    .exec();
};

const newBlog = async (body, userId) => {
  try {

    const user = await User.findOne({ userId }).exec();

    if (!user)
      throw NotFoundError("user");

    const blog = new Blog({ ...body, user: user._id });

    user.blogs.push(blog._id);

    await user.save();
    return blog.save();
  }
  catch (err) {
    throw err;
  }
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

import PropTypes from "prop-types";
import React from "react";
import Blog from "./Blog.js";

const BlogList = ({ blogs, likeHandler, removeHandler, userId }) => {
  const copy = [...blogs];
  copy.sort((a, b) => b.likes - a.likes);

  let result = copy.map((blog) => <Blog
    key={ blog.id }
    blog={ blog }
    removable={ blog.user.userId === userId }
    handleLike={ (event) => {
      event.stopPropagation();
      likeHandler(blog);
    } }
    handleRemove={ (event) => {
      event.stopPropagation();
      removeHandler(blog);
    } } />);

  return (result);
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  likeHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default BlogList;

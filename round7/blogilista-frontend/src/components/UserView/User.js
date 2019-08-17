import PropTypes from "prop-types";
import React from "react";
//import "./css/Blog.css";

const Blog = ({ name, blogs }) => {
  return (
    <div className="user-list-item">
      <em>{ name }</em>
      <strong>{ blogs.length }</strong>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  removable: PropTypes.bool.isRequired
};

export default Blog;

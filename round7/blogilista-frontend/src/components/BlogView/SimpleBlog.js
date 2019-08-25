//Used for testing in 5.13 and 5.14
import React from "react";
import PropTypes from "prop-types";

const SimpleBlog = ({ blog, onClick }) => (
  <div className="blog-item">
    <div>
      { blog.title } { blog.author }
    </div>
    <div>
      blog has { blog.likes } likes
      <button onClick={ onClick } className="like-button">like</button>
    </div>
  </div>
);

SimpleBlog.propTypes = {
  blog: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default SimpleBlog;

//Used for testing in 5.13 and 5.14
import React from "react";

const SimpleBlog = ({ blog, onClick }) => (
  <div className="blog-item">
    <div>
      { blog.title } { blog.author }
    </div>
    <div>
      blog has { blog.likes } likes
      <button onClick={ onClick }>like</button>
    </div>
  </div>
);

export default SimpleBlog;

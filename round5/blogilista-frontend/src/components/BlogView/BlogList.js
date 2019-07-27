import React from 'react';
import Blog from './Blog.js';

const BlogList = ({ blogs, likeHandler }) => {

  let result = blogs.map((blog) => <Blog
    key={ blog.id }
    blog={ blog }
    handleLike={ (event) => {
      event.stopPropagation();
      likeHandler(blog)
    } } />);

  return (result);
}

export default BlogList

import React from 'react';
import Blog from './Blog.js';

const BlogList = ({ blogs, likeHandler }) => {
  const copy = [...blogs];
  copy.sort((a, b) => b.likes - a.likes); 

  let result = copy.map((blog) => <Blog
    key={ blog.id }
    blog={ blog }
    handleLike={ (event) => {
      event.stopPropagation();
      likeHandler(blog)
    } } />);

  return (result);
}

export default BlogList

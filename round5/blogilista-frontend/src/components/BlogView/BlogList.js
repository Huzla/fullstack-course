import React from 'react';
import Blog from './Blog.js';

const BlogList = ({ blogs }) => {

  let result = blogs.map((blog) => <Blog key={ blog.id } blog={ blog } />);

  return (result);
}

export default BlogList

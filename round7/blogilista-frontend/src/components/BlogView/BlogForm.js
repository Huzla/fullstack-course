import PropTypes from "prop-types";
import React from "react";

const BlogForm = ({ author, title, url, handleBlogSubmit }) => (
  <div>
    <h3>Create blog</h3>
    <form onSubmit={ handleBlogSubmit }>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          { ...title }
          name="title"
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          { ...author }
          name="author"
        />
      </div>
      <div>
        <label htmlFor="url">Url:</label>
        <input
          { ...url }
          name="url"
        />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
);

BlogForm.propTypes = {
  author: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  handleBlogSubmit: PropTypes.func.isRequired
};

export default BlogForm;

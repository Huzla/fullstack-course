import React from 'react';

const BlogForm = ({ values, setters, handleSubmit }) => (
  <div>
    <h3>Create blog</h3>
  <form onSubmit={ handleSubmit }>
    <div>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        value={ values.title }
        name="title"
        onChange={({ target }) => setters.setTitle(target.value)}
      />
    </div>
    <div>
      <label htmlFor="author">Author:</label>
      <input
        type="text"
        value={ values.author }
        name="author"
        onChange={({ target }) => setters.setAuthor(target.value)}
      />
    </div>
    <div>
      <label htmlFor="url">Url:</label>
      <input
        type="text"
        value={ values.url }
        name="url"
        onChange={({ target }) => setters.setUrl(target.value)}
      />
    </div>
    <button type="submit">Create</button>
  </form>
  </div>
)

export default BlogForm

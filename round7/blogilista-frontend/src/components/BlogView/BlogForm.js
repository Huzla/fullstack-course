import PropTypes from "prop-types";
import React from "react";
import { Button, Header, Form, Label } from "semantic-ui-react";

const BlogForm = ({ author, title, url, handleBlogSubmit }) => (
  <div>
    <Header as="h3">Create blog</Header>
    <Form onSubmit={ handleBlogSubmit }>
      <Form.Field>
        <input
          { ...title }
          name="title"
          data-test-input="title"
        />
        <Label pointing color="black">Title</Label>
      </Form.Field>

      <Form.Field>
        <input
          { ...author }
          name="author"
          data-test-input="author"
        />
        <Label pointing color="black">Author</Label>
      </Form.Field>

      <Form.Field>
        <input
          { ...url }
          name="url"
          data-test-input="url"
        />
        <Label pointing color="black">Url</Label>
      </Form.Field>

      <Button basic fluid positive type="submit" data-test-button="blog-form-submit">Create</Button>
    </Form>
  </div>
);

BlogForm.propTypes = {
  author: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  handleBlogSubmit: PropTypes.func.isRequired
};

export default BlogForm;

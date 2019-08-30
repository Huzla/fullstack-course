import PropTypes from "prop-types";
import React from "react";
import { Button, Header, Form, Container, Label } from "semantic-ui-react";

const LoginForm = ({ username, password, handleLogin }) => {
  return (
    <Container textAlign="justified">
      <Header as="h1" inverted block textAlign="center">Please login</Header>
      <Form onSubmit={ handleLogin }>
        <Form.Field>
          <input
            { ...username }
            name="Username"
            data-test-input="username"
          />
          <Label pointing color="black">username</Label>
        </Form.Field>
        <Form.Field>
          <input
            { ...password }
            name="Password"
            data-test-input="password"
          />
          <Label pointing color="black">password</Label>
        </Form.Field>
        <Button type="submit" basic positive fluid data-test-button="login">login</Button>
      </Form>
    </Container>
  );
};

LoginForm.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;

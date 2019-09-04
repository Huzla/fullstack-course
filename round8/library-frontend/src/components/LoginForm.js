import React, { useState } from "react";
import { Segment, Form, Button, Label, Header } from "semantic-ui-react";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    const result = await props.login({
      variables: { username, password }
    });

    if (result) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  };

  if (!props.show)
    return null;

  return (
    <Segment>
      <Header as="h1" textAlign="center">Please login</Header>
      <Form onSubmit={ submit }>
        <Form.Field>
          <Label htmlFor="username" color="black">username</Label>
          <input
            value={ username }
            onChange={ ({ target }) => setUsername(target.value) }
            name="username"
          />
        </Form.Field>

        <Form.Field>
          <Label htmlFor="password" color="black">password</Label>
          <input
            type="password"
            value={ password }
            name="password"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </Form.Field>

        <Button type="submit" fluid positive>Login</Button>
      </Form>
    </Segment>
  )
};

export default LoginForm;

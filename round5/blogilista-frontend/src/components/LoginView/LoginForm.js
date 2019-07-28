import PropTypes from "prop-types";
import React from "react";

const LoginForm = ({ username, password, handleLogin }) => {
  const excludeReset = ({ reset, ...otherFields }) => {
    return otherFields;
  };

  return (
    <div>
      <h2>Please login</h2>
      <form onSubmit={ handleLogin }>
        <div>
          username
          <input
            { ...excludeReset(username) }
            name="Username"
          />
        </div>
        <div>
          password
          <input
            { ...excludeReset(password) }
            name="Password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;

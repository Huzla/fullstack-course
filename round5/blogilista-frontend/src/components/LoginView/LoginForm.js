import React from 'react';

const LoginForm = ({ username, password, setPassword, setUsername, handleLogin }) => (
  <div>
    <h2>Please login</h2>
  <form onSubmit={ handleLogin }>
    <div>
      username
        <input
        type="text"
        value={ username }
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  </div>
)

export default LoginForm

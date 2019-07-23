import React, { useState, useEffect } from 'react';
import blogService from './services/blogs.js';
import loginService from "./services/login.js";
import LoginForm from './components/LoginView/LoginForm';

function App() {
  const [blogs, setblogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (err) {
      alert("Incorrect credentials!");
    }
  };

  if (user === null) {
    return (
      <div className="App">
        <h2>Please login</h2>
        <LoginForm username={ username } password={ password } setPassword={ setPassword } setUsername={ setUsername } handleLogin={ handleLogin }/>
      </div>
    );
  }

  return (
    <div className="App">

    </div>
  );
};

export default App;

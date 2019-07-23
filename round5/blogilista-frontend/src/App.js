import React, { useState, useEffect } from 'react';
import blogService from './services/blogs.js';
import loginService from "./services/login.js";
import LoginForm from './components/LoginView/LoginForm.js';
import BlogList from "./components/BlogView/BlogList.js";

function App() {
  const [blogs, setblogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
    }
  }, []);

  useEffect(async () => {
    const blogs = await blogService.getAll();
    setblogs(blogs);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        userId: username, password,
      });

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (err) {
      alert("Incorrect credentials!");
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    loginService.logout();
    setUser(null);
  };

    return (
      <div className="App">
      { (user) ?
          <div>
            <button onClick={ handleLogout }>Logout</button>
            <BlogList blogs={ blogs }/>
          </div> :
          <LoginForm username={ username } password={ password } setPassword={ setPassword } setUsername={ setUsername } handleLogin={ handleLogin }/>
      }
      </div>
    );
};

export default App;

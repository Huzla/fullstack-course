import React, { useState, useEffect } from 'react';
import blogService from './services/blogs.js';
import loginService from "./services/login.js";
import LoginForm from './components/LoginView/LoginForm.js';
import BlogList from "./components/BlogView/BlogList.js";
import BlogForm from "./components/BlogView/BlogForm.js";

function App() {
  const [blogs, setblogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (userJSON) {
      const user = JSON.parse(userJSON);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    (async function () {
      const blogs = await blogService.getAll();
      setblogs(blogs);
    })()
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        userId: username, password,
      });

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
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

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    console.log("todo");
  };

    return (
      <div className="App">
      { (user) ?
          <div>
            <h2>Blogs</h2>
            <div>
              <span>Logged in as <strong>{ user.name }</strong></span>
              <button onClick={ handleLogout }>Logout</button>
            </div>
            <BlogForm values={ { title, author, url } } setter={ { setTitle, setAuthor, setUrl } } handleSubmit={ handleBlogSubmit }/>
            <BlogList blogs={ blogs }/>
          </div> :
          <LoginForm username={ username } password={ password } setPassword={ setPassword } setUsername={ setUsername } handleLogin={ handleLogin }/>
      }
      </div>
    );
};

export default App;

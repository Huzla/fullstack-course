import React, { useState, useEffect } from 'react';
import blogService from './services/blogs.js';
import loginService from "./services/login.js";
import Togglable from "./components/Utils/Togglable.js"
import LoginForm from './components/LoginView/LoginForm.js';
import BlogList from "./components/BlogView/BlogList.js";
import BlogForm from "./components/BlogView/BlogForm.js";
import Notification from './components/Notification/Notification.js';

function App() {
  const [blogs, setblogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null);
  const [ notification, setNotification ] = useState({});
  const [ notificationTimer, setNotificationTimer ] = useState();

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (userJSON) {
      const user = JSON.parse(userJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    (async function () {
      const blogs = await blogService.getAll();
      setblogs(blogs);
    })()
  }, []);

  const showMessage = (type, message) => {
    setNotification({type, message});
    setNotificationTimer(setTimeout(clearMessage, 3000));
  };

  const clearMessage = () => {
    setNotificationTimer(clearTimeout(notificationTimer));
    setNotification({});
  };

  const handleError = (err) => {
    showMessage("error", err.message);
  };

  const handleSuccess = (message) => {
    showMessage("success", message);
  };

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
      handleSuccess("Logged in");
    }
    catch (err) {
      handleError({ message: "Incorrect password or username" });
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    loginService.logout();
    setUser(null);
    handleSuccess("Logged out");
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({ title, author, url });

      setblogs(blogs.concat(newBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
      handleSuccess(`New blog ${ newBlog.title } by ${ newBlog.author } added.`);
    }
    catch (err) {
      handleError(err.message);
    }
  };

  const likeHandler = async (blog) => {
    try {
      const copy = { ...blog };
      copy.likes += 1;
      await blogService.replace(copy);

      setblogs(blogs.map(b => b.id !== copy.id ? b : copy));
    }
    catch (err) {
      handleError(err.message);
    }
  };

  const removeHandler = async (blog) => {
    try {
      if (window.confirm(`Do you really want to remove ${ blog.title } by ${ blog.author }`)) {
        await blogService.remove(blog.id);
        setblogs(blogs.filter(b => b.id !== blog.id));
      }
    }
    catch (err) {
      handleError(err.message);
    }
  };

    return (
      <div className="App">
      <Notification { ...notification }/>
      { (user) ?
          <div>
            <h2>Blogs</h2>
            <div>
              <span>Logged in as <strong>{ user.name }</strong></span>
              <button onClick={ handleLogout }>Logout</button>
            </div>
            <Togglable buttonLabel="add blog">
              <BlogForm values={ { title, author, url } } setters={ { setTitle, setAuthor, setUrl } } handleSubmit={ handleBlogSubmit }/>
            </Togglable>
            <BlogList userId={ user.userId } blogs={ blogs } likeHandler={ likeHandler } removeHandler={ removeHandler }/>
          </div> :
          <LoginForm username={ username } password={ password } setPassword={ setPassword } setUsername={ setUsername } handleLogin={ handleLogin }/>
      }
      </div>
    );
};

export default App;

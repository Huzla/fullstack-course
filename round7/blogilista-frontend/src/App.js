import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setNotification } from "./reducers/notificationReducer.js";
import useField from "./hooks/useField.js";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import Togglable from "./components/Utils/Togglable.js";
import LoginForm from "./components/LoginView/LoginForm.js";
import BlogList from "./components/BlogView/BlogList.js";
import BlogForm from "./components/BlogView/BlogForm.js";
import Notification from "./components/Notification/Notification.js";

const App = (props) => {
  const [blogs, setblogs] = useState([]);
  const username = useField("text");
  const password = useField("password");
  const title = useField("text");
  const author = useField("text");
  const url = useField("url");
  const [user, setUser] = useState(null);

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
    })();

  }, []);

  const showMessage = (type, message) => {
    props.setNotification(type, message);
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
        userId: username.value,
        password: password.value,
      });

      blogService.setToken(user.token);
      setUser(user);
      username.reset();
      password.reset();
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
      const newBlog = await blogService.create({ title: title.value, author: author.value, url: url.value });

      setblogs(blogs.concat(newBlog));
      title.reset();
      author.reset();
      url.reset();
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

  const excludeReset = (field) => {
    const copy = { ...field };
    delete copy.reset;

    return copy;
  };

  return (
    <div className="App">
      <Notification/>
      { (user) ?
        <div>
          <h2>Blogs</h2>
          <div>
            <span>Logged in as <strong>{ user.name }</strong></span>
            <button onClick={ handleLogout }>Logout</button>
          </div>
          <Togglable buttonLabel="add blog">
            <BlogForm title={ excludeReset(title) } author={ excludeReset(author) } url={ excludeReset(url) } { ...{ handleBlogSubmit } }/>
          </Togglable>
          <BlogList userId={ user.userId } blogs={ blogs } likeHandler={ likeHandler } removeHandler={ removeHandler }/>
        </div> :
        <LoginForm password={ excludeReset(password) } username={ excludeReset(username) } { ...{ handleLogin } } />
      }
    </div>
  );
};

export default connect(null, { setNotification })(App)

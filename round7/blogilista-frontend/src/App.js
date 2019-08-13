import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setNotification } from "./reducers/notificationReducer.js";
import { likeBlog, createBlog, initBlogs } from "./reducers/blogReducer.js";
import { initUser, logout } from "./reducers/loginReducer.js";
import useField from "./hooks/useField.js";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import Togglable from "./components/Utils/Togglable.js";
import LoginForm from "./components/LoginView/LoginForm.js";
import BlogList from "./components/BlogView/BlogList.js";
import BlogForm from "./components/BlogView/BlogForm.js";
import Notification from "./components/Notification/Notification.js";

const App = (props) => {
  const username = useField("text");
  const password = useField("password");
  const title = useField("text");
  const author = useField("text");
  const url = useField("url");

  useEffect(() => {
    props.initUser()
  }, []);

  useEffect(() => {
    try {
      props.initBlogs();
    }
    catch (err) {
      handleError(err);
    }
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
      /*
      const user = await loginService.login({
        userId: username.value,
        password: password.value,
      });

      blogService.setToken(user.token);

      username.reset();
      password.reset();
      handleSuccess("Logged in");
      */
    }
    catch (err) {
      handleError({ message: "Incorrect password or username" });
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    props.logout();

    handleSuccess("Logged out");
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();

    try {
      props.createBlog({ title: title.value, author: author.value, url: url.value });

      handleSuccess(`New blog ${ title.value } by ${ author.value } added.`);
      title.reset();
      author.reset();
      url.reset();
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
      { (props.user) ?
        <div>
          <h2>Blogs</h2>
          <div>
            <span>Logged in as <strong>{ props.user.name }</strong></span>
            <button onClick={ handleLogout }>Logout</button>
          </div>
          <Togglable buttonLabel="add blog">
            <BlogForm title={ excludeReset(title) } author={ excludeReset(author) } url={ excludeReset(url) } { ...{ handleBlogSubmit } }/>
          </Togglable>
          <BlogList userId={ props.user.userId }/>
        </div> :
        <LoginForm password={ excludeReset(password) } username={ excludeReset(username) } { ...{ handleLogin } } />
      }
    </div>
  );
};

export default connect(({ user }) => { return { user } }, {
  likeBlog,
  createBlog,
  initBlogs,
  setNotification,
  initUser,
  logout })(App)

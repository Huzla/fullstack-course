import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setNotification } from "./reducers/notificationReducer.js";
import { likeBlog, createBlog, initBlogs } from "./reducers/blogReducer.js";
import { initUser, logout, login } from "./reducers/loginReducer.js";
import { initUsers } from "./reducers/userReducer.js";
import { initComments } from "./reducers/commentReducer.js";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import useField from "./hooks/useField.js";
import Togglable from "./components/Utils/Togglable.js";
import LoginForm from "./components/LoginView/LoginForm.js";
import BlogList from "./components/BlogView/BlogList.js";
import Blog from "./components/BlogView/Blog.js";
import BlogForm from "./components/BlogView/BlogForm.js";
import Notification from "./components/Notification/Notification.js";
import UserList from "./components/UserView/UserList.js";
import User from "./components/UserView/User.js";
import Navbar from "./components/Navbar/Navbar.js";
import { Container, Header, Grid } from "semantic-ui-react";

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
      props.initUsers();
      props.initComments();
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
      props.login({
        userId: username.value,
        password: password.value,
      });
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
    <Container>
      <Grid stackable columns={ 5 }>
        <Grid.Row>
          <Notification/>
        </Grid.Row>

        <Grid.Row>
        { (props.user) ?
          <Router>
            <Grid.Column width={ 1 }>
              <Navbar handleLogout={ handleLogout } name={ props.user.name }/>
            </Grid.Column>

            <Grid.Column width={ 15 }>
              <Route exact path="/" render={ () =>(
                <div>
                  <Header as="h2">Blogs</Header>
                  <Togglable buttonLabel="add blog">
                  <BlogForm title={ excludeReset(title) } author={ excludeReset(author) } url={ excludeReset(url) } { ...{ handleBlogSubmit } }/>
                  </Togglable>
                  <BlogList/>
                </div>
              ) }
              />
              <Route exact path="/blogs/:id" render={ ({ match }) => <Blog id={ match.params.id } full="true"/> } />

              <Route exact path="/users" render={() => <UserList /> } />
              <Route exact path="/users/:id" render={ ({ match }) => <User id={ match.params.id } full="true"/> } />
            </Grid.Column>

          </Router>
          :
          <LoginForm password={ excludeReset(password) } username={ excludeReset(username) } { ...{ handleLogin } } />
        }
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default connect(({ user }) => { return { user } }, {
  likeBlog,
  createBlog,
  initBlogs,
  setNotification,
  initUser,
  logout,
  login,
  initUsers,
  initComments
})(App)

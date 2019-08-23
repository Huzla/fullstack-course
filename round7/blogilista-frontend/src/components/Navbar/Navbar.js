import React, { createRef }  from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Button,
  Header,
  Icon,
  Segment,
  Sidebar,
  } from "semantic-ui-react";

const Navbar = ({ handleLogout, name, children }) => {
  const contextRef = createRef();

  return (
    <Sidebar.Pushable>
      <Sidebar as={ Segment } vertical visible width="thin">
        <Segment>
          <Header as="h1" icon>
            <Icon name="money bill alternate outline" />
            B10G$
            <Header.Subheader>Blog or Die</Header.Subheader>
          </Header>
        </Segment>

        <Segment inverted>
            <div>Logged in as:</div>
            <strong>{ name }</strong>
            <Button onClick={ handleLogout } basic color="blue" icon labelPosition="right" fluid>
              <Icon name="sign out" />
              Logout
            </Button>
        </Segment>

        <Segment color="blue">
          <Icon name="archive" />
          <Link to="/">Blogs</Link>
        </Segment>
        <Segment color="blue">
          <Icon name="address book outline" />
          <Link to="/users">Users</Link>
        </Segment>
      </Sidebar>

      <Sidebar.Pusher>
        <Segment>
        { children }
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default Navbar;

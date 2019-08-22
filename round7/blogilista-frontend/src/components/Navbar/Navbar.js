import React, { createRef }  from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Button,
  Header,
  Icon,
  Segment,
  Sidebar,
  Label
  } from "semantic-ui-react";

const Navbar = ({ handleLogout, name }) => {
  const contextRef = createRef();

  return (
      <nav>
        <Sidebar as={ Segment } icon="labeled" vertical visible width="thin">
          <Segment>
            <Header as="h1" icon>
              <Icon name="money bill alternate outline" />
              B10G$
              <Header.Subheader>Blog or Die</Header.Subheader>
            </Header>
          </Segment>

          <Segment inverted>
            <span>
              <span>Logged in as:</span>
              <br/>
              <strong>{ name }</strong>
              <Button onClick={ handleLogout } primary icon labelPosition="right">
                <Icon name="sign out" />
                Logout
              </Button>
            </span>
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
      </nav>
  );
};

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default Navbar;

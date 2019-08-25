import React  from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Button,
  Header,
  Icon,
  Segment,
  Sidebar
} from "semantic-ui-react";

const Navbar = ({ handleLogout, name, children }) => {

  return (
    <Sidebar.Pushable>
      <Sidebar as={ Segment } vertical visible>
        <Segment>
          <Header as="h1" icon textAlign="center">
            <Icon name="money bill alternate outline" />
            B10G$
            <Header.Subheader>Blog or Die</Header.Subheader>
          </Header>
        </Segment>

        <Segment inverted>
          <div>Logged in as:</div>
          <strong>{ name }</strong>
          <Button onClick={ handleLogout } basic inverted color="black" icon labelPosition="right" fluid>
            <Icon name="sign out" />
            Logout
          </Button>
        </Segment>

        <Segment size="large" color="black">
          <Icon name="archive" />
          <Link to="/">Blogs</Link>
        </Segment>

        <Segment size="large" color="black">
          <Icon name="address book outline" />
          <Link to="/users">Users</Link>
        </Segment>
      </Sidebar>

      <Sidebar.Pusher>
        { children }
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,

};

export default Navbar;

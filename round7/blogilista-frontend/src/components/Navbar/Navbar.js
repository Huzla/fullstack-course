import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ handleLogout, name }) => {
  return (
    <nav>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      <span>
        <span>Logged in as <strong>{ name }</strong></span>
        <button onClick={ handleLogout }>Logout</button>
      </span>
    </nav>
  );
};

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default Navbar;

import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import User from "./User.js";

const UserList = ({ users }) => {
  const copy = [...users];

  let result = copy.map((user) => <User
    key={ user.id }
    id={ user.id }
     />);

  return (
    <div>
      <h2>Users</h2>
      <div className="user-list-item user-list-header">
        <em>Name</em>
        <strong>Number of blogs</strong>
      </div>

      { result }
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  null
)(UserList);

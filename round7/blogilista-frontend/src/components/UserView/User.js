import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
//import "./css/Blog.css";

const User = ({ name, blogs, id, full }) => {

  const fullUserElement = () => (
    <div>
      <h2>{ name }</h2>
      <div>
        <h3>Added blogs</h3>
        <ul>
          {
            blogs.map(blogs => <li>{ blogs.title }</li>)
          }
        </ul>
      </div>
    </div>
  );

  const listUserElement = () => (
    <div className="user-list-item">
      <a href={ "/users/" + id }>{ name }</a>
      <strong>{ blogs.length }</strong>
    </div>
  );

  return (
    <> { (name) ? (full) ? fullUserElement() : listUserElement() : null } </>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return { ...(state.users.find(user => user.id === ownProps.id)) };
};

export default connect(
  mapStateToProps,
  null
)(User);

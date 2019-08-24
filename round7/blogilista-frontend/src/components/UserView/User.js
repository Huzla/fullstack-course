import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import { Table, Header } from "semantic-ui-react";

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
    <Table.Row>
      <Table.Cell>
        <a href={ "/users/" + id }>{ name }</a>
      </Table.Cell>

      <Table.Cell>
        { blogs.length }
      </Table.Cell>
    </Table.Row>
  );

  if (name) {
    if (full) {
      return fullUserElement();
    }
    else {
      return listUserElement();
    }
  }
  else {
    return null
  }

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

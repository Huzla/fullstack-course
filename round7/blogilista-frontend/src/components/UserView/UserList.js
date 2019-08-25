import { connect } from "react-redux";
import React, { useState } from "react";
import PropTypes from "prop-types";
import User from "./User.js";
import { Table, Pagination, Header } from "semantic-ui-react";

const UserList = ({ users }) => {
  const [visiblePage, setVisiblePage] = useState(1);
  const numOfItems = 10;

  const changePage = (event) => {
    setVisiblePage(Number(event.target.attributes.value.value));
  };

  const copy = [...users];

  let result = copy.map((user) => <User
    key={ user.id }
    id={ user.id }
  />);

  return (
    <div>
      <Header as="h1" block inverted textAlign="center">Users</Header>
      <Table celled inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Number of blogs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { result.slice(numOfItems*(visiblePage - 1), numOfItems*visiblePage) }
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Pagination onPageChange={ changePage } defaultActivePage={ visiblePage } totalPages={ Math.ceil(result.length/numOfItems) } inverted />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>

      </Table>

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

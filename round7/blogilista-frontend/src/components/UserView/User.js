import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Link
} from "react-router-dom";
import React, { useState } from "react";
import { Table, Header, Container, List, Segment, Grid, Pagination } from "semantic-ui-react";

const User = ({ name, blogs, id, full }) => {
  const [visiblePage, setVisiblePage] = useState(1);
  const numOfItems = 10;
  const changePage = (event) => {
    setVisiblePage(Number(event.target.attributes.value.value));
  };

  const fullUserElement = () => {
    const result = blogs.map(blog => <List.Item key={ blog.id }>{ blog.title }</List.Item>);

    return (
      <Container>
        <Header as="h1" block inverted textAlign="center">{ name }</Header>
        <div>
          <Header as="h2">Added blogs</Header>
          <Segment inverted>
            <List divided inverted relaxed>
              {
                result.slice(numOfItems*(visiblePage - 1), numOfItems*visiblePage)
              }
            </List>
            <Grid centered>
              <Pagination onPageChange={ changePage } defaultActivePage={ visiblePage } totalPages={ Math.ceil(result.length/numOfItems) } inverted />
            </Grid>
          </Segment>
        </div>
      </Container>
    );
  };

  const listUserElement = () => (
    <Table.Row>
      <Table.Cell>
        <Link to={ "/users/" + id }>{ name }</Link>
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
    return null;
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

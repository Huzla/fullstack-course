import { connect } from "react-redux";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Blog from "./Blog.js";
import { List, Segment, Grid, Pagination } from "semantic-ui-react";

const BlogList = ({ blogs }) => {
  const [visiblePage, setVisiblePage] = useState(1);

  const changePage = (event) => {
    setVisiblePage(Number(event.target.attributes.value.value));
  };

  const copy = [...blogs];
  copy.sort((a, b) => b.likes - a.likes);

  let result = copy.map((blog) => <Blog
    key={ blog.id }
    id={ blog.id }
  />);

  return (
    <Segment inverted size="big">
      <List divided inverted relaxed>
        { result.slice(10*(visiblePage - 1), 10*visiblePage) }
      </List>
      <Grid centered>
        <Pagination onPageChange={ changePage } defaultActivePage={ visiblePage } totalPages={ Math.ceil(result.length/10) } inverted />
      </Grid>
    </Segment>

  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  };
};

export default connect(
  mapStateToProps,
  null
)(BlogList);

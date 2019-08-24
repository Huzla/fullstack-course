import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import Blog from "./Blog.js";
import { List, Segment } from "semantic-ui-react";

const BlogList = ({ blogs }) => {
  const copy = [...blogs];
  copy.sort((a, b) => b.likes - a.likes);

  let result = copy.map((blog) =><Blog
    key={ blog.id }
    id={ blog.id }
    />);

  return (
    <Segment inverted size="big">
      <List divided inverted relaxed>
        { result }
      </List>
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

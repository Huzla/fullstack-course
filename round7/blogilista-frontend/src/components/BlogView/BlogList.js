import { connect } from "react-redux";
import { likeBlog, removeBlog } from "../../reducers/blogReducer.js";
import React from "react";
import PropTypes from "prop-types";
import Blog from "./Blog.js";

const BlogList = ({ blogs, likeBlog, removeBlog, userId }) => {
  const copy = [...blogs];
  copy.sort((a, b) => b.likes - a.likes);

  let result = copy.map((blog) => <Blog
    key={ blog.id }
    blog={ blog }
    removable={ blog.user.userId === userId }
    handleLike={ (event) => {
      event.stopPropagation();
      likeBlog(blog);
    } }
    handleRemove={ (event) => {
      event.stopPropagation();
      removeBlog(blog);
    } } />);

  return (result);
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  likeBlog: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likeBlog: (blog) => {
      dispatch(likeBlog(blog));
    },
    removeBlog: (blog) => {
      dispatch(removeBlog(blog));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);

import { connect } from "react-redux";
import { likeBlog, removeBlog } from "../../reducers/blogReducer.js";
import PropTypes from "prop-types";
import React from "react";
import "./css/Blog.css";

const Blog = ({ blog, likeBlog, removeBlog, userId, full }) => {

  const fullBlogElement = () => (
    <div>
      <h2>
        <strong>{ blog.title }</strong>
      </h2>

      <div>
        author: <em>{ blog.author }</em>
      </div>

      <div>
        <a href={ blog.url }>{ blog.url }</a>
      </div>

      <div>
        <span>{ blog.likes }</span> likes <button className="blog-item-button" onClick={ () => likeBlog(blog) }>Like</button>
      </div>

      <div>
        added by <em>{ blog.user.name }</em>
      </div>
      {
        (userId === blog.user.userId) ?
          <div>
            <button onClick={ () => removeBlog(blog) } className="blog-item-button" title="remove">&#9932;</button>
          </div>
          :
          <></>
      }
    </div>
  );

  const minimizedBlogElement = () => (
    <a className="blog-item" href={ "/blogs/" + blog.id }>
      <strong>{ blog.title }</strong> <em>{ blog.author }</em>
    </a>
  );

  return (
  <>
    { (blog) ? (full) ? fullBlogElement() : minimizedBlogElement() : null }
  </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  removable: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.user.userId,
    blog: state.blogs.find(blog => blog.id === ownProps.id)
  }
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
)(Blog);

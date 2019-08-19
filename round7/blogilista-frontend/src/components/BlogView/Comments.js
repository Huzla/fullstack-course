import { connect } from "react-redux";
import { createComment } from "../../reducers/commentReducer.js";
import PropTypes from "prop-types";
import React from "react";

const Comments = ({ comments, blog, createComment }) => {

  const handleSubmit = (event) => {
    event.preventDefault();

    const content = event.target.comment.value;
    event.target.comment.value = "";
    createComment(content, blog.id);
  };

  return (
    <div>
      <h3>Comments</h3>

      <form onSubmit={ handleSubmit }>
        <input type="text" name="comment" />
        <button>Add comment</button>
      </form>
      { (comments.length)
        ? <ul>
          { comments.map(comment => <li key={ comment.id }>{ comment.message }</li>) }
        </ul>
        : <div>No comments yet</div>
      }
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {

  return {
    comments: state.comments.filter(comment => comment.blog.toString() === ownProps.blog.id.toString()),
  }
};


const mapDispatchToProps = dispatch => {
  return {
    createComment: (content, blog) => {
      dispatch(createComment(content, blog))
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);

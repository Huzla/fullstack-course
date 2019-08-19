import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

const Comments = ({ comments }) => {

  return (
    <div>
      <button>Add comment</button>
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
  console.log(ownProps.blog, state.comments);

  return {
    comments: state.comments.filter(comment => comment.blog.toString() === ownProps.blog.toString()),
  }
};

export default connect(
  mapStateToProps,
  null
)(Comments);

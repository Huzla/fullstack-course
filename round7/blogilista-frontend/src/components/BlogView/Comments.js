import { connect } from "react-redux";
import { createComment } from "../../reducers/commentReducer.js";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  List,
  Header,
  Form,
  Button,
  Pagination,
  Segment,
  Grid
} from "semantic-ui-react";

const Comments = ({ comments, blog, createComment }) => {
  const [visiblePage, setVisiblePage] = useState(1);
  const numOfItems = 10;

  const changePage = (event) => {
    setVisiblePage(Number(event.target.attributes.value.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const content = event.target.comment.value;
    event.target.comment.value = "";
    createComment(content, blog.id);
  };

  const result = comments.map(comment => <List.Item key={ comment.id }>{ comment.message }</List.Item>)
  return (
    <div>
      <Header as="h2">Comments</Header>

      <Form onSubmit={ handleSubmit }>
        <Form.Field>
          <input placeholder="Leave a comment" type="text" name="comment" />
        </Form.Field>
        <Button basic color="black">Add comment</Button>
      </Form>
      { (comments.length)
        ? <Segment inverted size="big">
          <List divided inverted relaxed>
            { result.slice(numOfItems*(visiblePage - 1), numOfItems*visiblePage) }
          </List>
          <Grid centered>
              <Pagination onPageChange={ changePage } defaultActivePage={ visiblePage } totalPages={ Math.ceil(result.length/numOfItems) } inverted />
          </Grid>
        </Segment>
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

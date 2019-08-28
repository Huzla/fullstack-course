import { connect } from "react-redux";
import { likeBlog, removeBlog } from "../../reducers/blogReducer.js";
import {
  Link
} from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import Comments from "./Comments.js";
import {
  List,
  Icon,
  Label,
  Grid,
  Container,
  Header,
  Card,
  Button
} from "semantic-ui-react";

const Blog = ({ blog, likeBlog, removeBlog, userId, full }) => {

  const fullBlogElement = () => (
    <>
      <Header as="h1" block inverted textAlign="center">
        Blog Page
      </Header>
    <Container>
      <Grid stackable centered columns={ 2 }>
        <Grid.Column width={ 5 }>
          <Card>
            <Card.Content>
              {
                (userId === blog.user.userId) ?
                  <Button onClick={ () => removeBlog(blog) } basic icon size="small" floated="right" negative >
                    <Icon name="remove" />
                  </Button>
                  :
                <></>
              }
              <Card.Header>
                <Header as="h4">
                  { blog.title }
                </Header>
              </Card.Header>
              <Card.Meta>Title</Card.Meta>

              <Card.Description>
                <div>
                  Author: <strong>{ blog.title }</strong>
                </div>
                Added by <em>{ blog.user.name }</em>
                <div>
                  Visit site: <a href={ blog.url }>{ blog.url }</a>
                </div>

              </Card.Description>

            </Card.Content>

            <Card.Content extra>
              <Button as="div" onClick={ () => likeBlog(blog) } labelPosition="right">
                <Button basic positive>
                  <Icon name="like" />
                  Like
                </Button>
                <Label as="a" basic color="green" pointing="left">
                  { blog.likes }
                </Label>
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>

        <Grid.Column width={ 11 }>
          <Comments blog={ blog }/>
        </Grid.Column>
      </Grid>
    </Container>
    </>
  );

  const minimizedBlogElement = () => (
    <List.Item>
      <List.Header as="a">
        <Link to={ "/blogs/" + blog.id }>{ blog.title }</Link>
        <Icon name="chevron right" />
      </List.Header>
      <List.Description>{ blog.author }</List.Description>
    </List.Item>
  );

  return (
  <>
    { (blog) ? ((full) ? fullBlogElement() : minimizedBlogElement()) : null }
  </>
  );
};

Blog.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired,
  full: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.user.userId,
    blog: state.blogs.find(blog => blog.id === ownProps.id)
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);

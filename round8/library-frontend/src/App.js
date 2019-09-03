import React, { useState } from "react";
import { Container, Button, Message } from "semantic-ui-react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
    id
  }
}
`;

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author {
      name
    }
    published
    id
  }
}
`;

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    published
    id
  }
}
`

const EDIT_BIRTH = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, setBornTo: $born)  {
    name
    born
    id
  }
}
`


const App = () => {
  const [page, setPage] = useState("authors");
  const [notification, setNotification] = useState({});
  const [notificationTimer, setNotificationTimer] = useState(null);

  const showNotification = (error, message) => {
    setNotification({ error, message });

    setNotificationTimer(setTimeout(() => {
      setNotification({});
      setNotificationTimer(null);
    }, 5000));

  };

  const handleError = (err) => {
    showNotification(true, err.message);
  };

  return (
    <Container>
      <Message hidden={ notificationTimer === null } floating error={ notification.error } positive={ !notification.error }>
        { notification.message }
      </Message>

      <div>
        <Button color="violet" active={ (page === "authors") ? true : false } onClick={ () => setPage("authors") }>authors</Button>
        <Button color="violet" active={ (page === "books") ? true : false } onClick={ () => setPage("books") }>books</Button>
        <Button color="violet" active={ (page === "add") ? true : false } onClick={ () => setPage("add") }>add book</Button>
      </div>

      <Mutation mutation={ EDIT_BIRTH } refetchQueries={ [{ query: ALL_AUTHORS }] } onError={ handleError }>
        {
          (editAuthor) => (
            <Query query={ ALL_AUTHORS } onError={ handleError }>
            {
              (result) => (
                <Authors
                show={ page === "authors" }
                result={ result }
                editAuthor={ editAuthor }
                />
              )
            }
            </Query>
          )
        }
      </Mutation>

      <Query query={ ALL_BOOKS } onError={ handleError }>
        {
          (result) => (
            <Books
            show={ page === "books" }
            result={ result }
            />
          )
        }
      </Query>

      <Mutation mutation={ CREATE_BOOK } refetchQueries={ [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }] } onError={ handleError }>
        {
          (addBook) => (
            <NewBook
              show={ page === "add" }
              addBook={ addBook }
            />
          )
        }
      </Mutation>

    </Container>
  );
};

export default App;
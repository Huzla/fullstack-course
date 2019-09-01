import React, { useState } from "react";
import { Container, Button } from "semantic-ui-react";
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
    author
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
    author
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

  return (
    <Container>
      <div>
        <Button color="violet" active={ (page === "authors") ? true : false } onClick={ () => setPage("authors") }>authors</Button>
        <Button color="violet" active={ (page === "books") ? true : false } onClick={ () => setPage("books") }>books</Button>
        <Button color="violet" active={ (page === "add") ? true : false } onClick={ () => setPage("add") }>add book</Button>
      </div>

      <Mutation mutation={ EDIT_BIRTH } refetchQueries={[{ query: ALL_AUTHORS }]}>
        {
          (editAuthor) => (
            <Query query={ ALL_AUTHORS }>
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

      <Query query={ ALL_BOOKS }>
        {
          (result) => (
            <Books
            show={ page === "books" }
            result={ result }
            />
          )
        }
      </Query>

      <Mutation mutation={ CREATE_BOOK } refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
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

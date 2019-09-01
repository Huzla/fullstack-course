import React, { useState } from "react";
import { Container, Button } from "semantic-ui-react";
import { Query } from "react-apollo";
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


const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <Container>
      <div>
        <Button color="violet" active={ (page === "authors") ? true : false } onClick={ () => setPage("authors") }>authors</Button>
        <Button color="violet" active={ (page === "books") ? true : false } onClick={ () => setPage("books") }>books</Button>
        <Button color="violet" active={ (page === "add") ? true : false } onClick={ () => setPage("add") }>add book</Button>
      </div>

      <Query query={ ALL_AUTHORS }>
        {
          (result) => (
            <Authors
              show={ page === "authors" }
              result={ result }
            />
          )
        }
      </Query>

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

      <NewBook
        show={ page === "add" }
      />

    </Container>
  );
};

export default App;

import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <Container>
      <div>
        <button onClick={ () => setPage("authors") }>authors</button>
        <button onClick={ () => setPage("books") }>books</button>
        <button onClick={ () => setPage("add") }>add book</button>
      </div>

      <Authors
        show={ page === "authors" }
      />

      <Books
        show={ page === "books" }
      />

      <NewBook
        show={ page === "add" }
      />

    </Container>
  );
};

export default App;

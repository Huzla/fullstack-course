import React from "react";
import AnecdoteList from "./components/AnecdoteList.js";
import AnecdoteForm from "./components/AnecdoteForm.js";

const App = (props) => (
  <div>
    <h2>Anecdotes</h2>
    <AnecdoteList store={ props.store } />
    <h2>create new</h2>
    <AnecdoteForm store={ props.store }/>
  </div>
);

export default App;

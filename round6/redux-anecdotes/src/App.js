import React from "react";
import AnecdoteList from "./components/AnecdoteList.js";
import AnecdoteForm from "./components/AnecdoteForm.js";

const App = ({ store }) => {
  const anecdotes = [...store.getState()];

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList { ...{ anecdotes, store } } />
      <h2>create new</h2>
      <AnecdoteForm { ...{ store } }/>
    </div>
  );
};

export default App;

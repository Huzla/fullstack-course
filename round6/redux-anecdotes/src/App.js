import React from "react";
import AnecdoteList from "./components/AnecdoteList.js"

const App = ({ store }) => {
  const anecdotes = store.getState();

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList { ...{ anecdotes, store } } />
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;

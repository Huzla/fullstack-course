import React from "react";
import AnecdoteList from "./components/AnecdoteList.js"

const App = (props) => {
  const anecdotes = props.store.getState();

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList { ...{ anecdotes } } />
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;

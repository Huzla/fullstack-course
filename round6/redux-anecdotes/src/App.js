import React from "react";
import AnecdoteList from "./components/AnecdoteList.js";
import AnecdoteForm from "./components/AnecdoteForm.js";
import Notification from "./components/Notification.js";
import Filter from "./components/Filter.js";

const App = () => (
  //<Notification store={ props.store } />
  //<Filter store={ props.store } />
  //<AnecdoteForm store={ props.store }/>
  <div>
    <h2>Anecdotes</h2>
    <AnecdoteList />
    <h2>create new</h2>
  </div>
);

export default App;

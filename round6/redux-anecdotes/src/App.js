import React from "react";
import AnecdoteList from "./components/AnecdoteList.js";
import AnecdoteForm from "./components/AnecdoteForm.js";
import Notification from "./components/Notification.js";
import Filter from "./components/Filter.js";

const App = (props) => (
  <div>
    <Notification store={ props.store } />
    <h2>Anecdotes</h2>
    <Filter store={ props.store } />
    <AnecdoteList store={ props.store } />
    <h2>create new</h2>
    <AnecdoteForm store={ props.store }/>
  </div>
);

export default App;

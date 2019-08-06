import React from "react";
import AnecdoteList from "./components/AnecdoteList.js";
import AnecdoteForm from "./components/AnecdoteForm.js";
import Notification from "./components/Notification.js";
import Filter from "./components/Filter.js";

const App = () => (
  <div>
    <Notification />
    <h2>Anecdotes</h2>
    <Filter />
    <AnecdoteList />
    <h2>create new</h2>
    <AnecdoteForm />
  </div>
);

export default App;

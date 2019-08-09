import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initAnecdotes } from "./reducers/anecdoteReducer.js";
import { setNotification, clearNotification } from "./reducers/notificationReducer.js";
import AnecdoteList from "./components/AnecdoteList.js";
import AnecdoteForm from "./components/AnecdoteForm.js";
import Notification from "./components/Notification.js";
import Filter from "./components/Filter.js";
import anecdoteService from "./services/anecdotes.js";

const App = (props) => {
  useEffect(() => {
    anecdoteService.getAll()
      .then((anecdotes) => {
        props.initAnecdotes(anecdotes);
        props.setNotification("Welcome!");
        setTimeout(() => props.clearNotification(), 5000);
      })
      .catch(err => props.setNotification(err.message));
  },[]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default connect(null, { initAnecdotes, setNotification, clearNotification })(App)

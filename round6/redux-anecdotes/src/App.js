import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initAnecdotes } from "./reducers/anecdoteReducer.js";
import { setNotification } from "./reducers/notificationReducer.js";
import AnecdoteList from "./components/AnecdoteList.js";
import AnecdoteForm from "./components/AnecdoteForm.js";
import Notification from "./components/Notification.js";
import Filter from "./components/Filter.js";

const App = (props) => {
  useEffect(() => {
    try {
      props.initAnecdotes();
      props.setNotification("Welcome!", 5);
    }
    catch (err) {
      props.setNotification(err.message, 10);
    }
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

export default connect(null, { initAnecdotes, setNotification })(App)

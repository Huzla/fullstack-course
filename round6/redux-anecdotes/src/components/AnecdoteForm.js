import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer.js";
import { setNotification, clearNotification } from "../reducers/notificationReducer.js";

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.store.dispatch(
      createAnecdote(content)
    );
    props.store.dispatch(
      setNotification(`New anecdote '${ content }' added`)
    );
    setTimeout(() => props.store.dispatch(clearNotification()), 5000);
  };

  return (
    <form onSubmit={ addAnecdote }>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  );
};

export default AnecdoteForm;

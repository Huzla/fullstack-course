import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer.js";
import { setNotification, clearNotification } from "../reducers/notificationReducer.js";
import anecdoteService from "../services/anecdotes.js";

const AnecdoteForm = ({ createAnecdote }) => {
  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnec = await anecdoteService.postAnecdote(content);
    createAnecdote(newAnec);
  };

  return (
    <form onSubmit={ addAnecdote }>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createAnecdote: (value) => {
      dispatch(createAnecdote(value));
      dispatch(setNotification(`New anecdote '${ value.content }' added`));
      setTimeout(() => dispatch(clearNotification()), 5000);
    },
  }
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);

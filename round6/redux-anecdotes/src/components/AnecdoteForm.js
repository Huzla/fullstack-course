import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer.js";
import { setNotification } from "../reducers/notificationReducer.js";

const AnecdoteForm = ({ createAnecdote }) => {
  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    createAnecdote(content);
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
      dispatch(setNotification(`New anecdote '${ value }' added`, 5));
    },
  }
};

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm);

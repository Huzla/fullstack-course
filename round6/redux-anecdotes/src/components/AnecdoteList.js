import React from "react";
import Anecdote from "./Anecdote.js";
import { voteFor } from "../reducers/anecdoteReducer.js";
import { setNotification, clearNotification } from "../reducers/notificationReducer.js";

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes;

  return anecdotes.sort((a, b) => a.votes < b.votes).map(anecdote => <Anecdote key={ anecdote.id } { ...anecdote } handleVote={ () => {
    store.dispatch(voteFor(anecdote.id));
    store.dispatch(setNotification(`You voted for '${ anecdote.content }'`));
    setTimeout(() => store.dispatch(clearNotification()), 5000);
    } } />);
};

export default AnecdoteList;

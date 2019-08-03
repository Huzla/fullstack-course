import React from "react";
import Anecdote from "./Anecdote.js";

const AnecdoteList = ({ anecdotes }) => {
  const handleVote = (id) => {
    console.log("vote", id);
  };

  return anecdotes.map(anecdote => <Anecdote key={ anecdote.id } { ...{ ...anecdote, handleVote } } />);
};

export default AnecdoteList;

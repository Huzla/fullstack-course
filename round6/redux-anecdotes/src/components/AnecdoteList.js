import React from "react";
import Anecdote from "./Anecdote.js";
import { voteFor } from "../reducers/anecdoteReducer.js";

const AnecdoteList = ({ anecdotes, store }) => {

  return anecdotes.sort((a, b) => a.votes < b.votes).map(anecdote => <Anecdote key={ anecdote.id } { ...anecdote } handleVote={ () => store.dispatch(voteFor(anecdote.id)) } />);
};

export default AnecdoteList;

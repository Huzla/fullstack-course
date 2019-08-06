import React from "react";
import Anecdote from "./Anecdote.js";
import { connect } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer.js";
import { setNotification, clearNotification } from "../reducers/notificationReducer.js";

const AnecdoteList = ({ anecdotes, filter, voteFor }) => {

  return anecdotes.map(anecdote => <Anecdote key={ anecdote.id } { ...anecdote } handleVote={ () => voteFor(anecdote) } />);
};

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  return {
    anecdotes: state.anecdotes.sort((a, b) => a.votes < b.votes)
      .filter(anec => anec.content.toUpperCase()
      .includes(state.filter.toUpperCase())),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voteFor: ({ content, id }) => {
      dispatch(voteFor(id));
      dispatch(setNotification(`You voted for '${ content }'`));
      setTimeout(() => dispatch(clearNotification()), 5000);
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

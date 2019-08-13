import React from "react";

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{ anecdote.content }</h2>
    <div>
      <p>
        has { anecdote.votes } votes.
      </p>

      <p>
        For more information, see <a href={ anecdote.info }>{ anecdote.info }</a>
      </p>
    </div>
  </div>
);

export default Anecdote;

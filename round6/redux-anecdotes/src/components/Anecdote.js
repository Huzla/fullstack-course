import React from "react";

const Anecdote = ({ id, content, votes, handleVote }) => (
  <div>
    <div>
      { content }
    </div>
    <div>
      has { votes }
      <button onClick={ () => handleVote(id) }>vote</button>
    </div>
  </div>
);

export default Anecdote;

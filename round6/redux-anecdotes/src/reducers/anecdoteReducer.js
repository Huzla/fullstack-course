const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;

    case "CREATE_ANECDOTE":
      return [...state, action.data];

    case "VOTE":
      return state.map(anec => { return { ...anec, votes: (anec.id === action.data.id) ? anec.votes + 1 : anec.votes } });

    default: return state;
  }
};

export const initAnecdotes = (data) => {
  return {
    type: "INIT_ANECDOTES",
    data
  };
};

export const createAnecdote = (data) => {
  return {
    type: "CREATE_ANECDOTE",
    data
  };
};

export const voteFor = (id) => {
  return {
    type: "VOTE",
    data: { id }
  };
};

export default anecdoteReducer;

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

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

export const createAnecdote = (content) => {
  return {
    type: "CREATE_ANECDOTE",
    data: asObject(content)
  };
};

export const voteFor = (id) => {
  return {
    type: "VOTE",
    data: { id }
  };
};

export default anecdoteReducer;

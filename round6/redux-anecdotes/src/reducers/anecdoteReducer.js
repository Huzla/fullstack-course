import anecdoteService from "../services/anecdotes.js";

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

export const initAnecdotes = () => {
  return async (dispatch) => {
    try {
      const data = await anecdoteService.getAll();

      dispatch({
        type: "INIT_ANECDOTES",
        data
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const data = await anecdoteService.postAnecdote(content);

      dispatch({
        type: "CREATE_ANECDOTE",
        data
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export const voteFor = (id) => {
  return {
    type: "VOTE",
    data: { id }
  };
};

export default anecdoteReducer;

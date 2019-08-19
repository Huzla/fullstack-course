import commentService from "../services/comments.js";

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_COMMENTS":
      return action.data;

    case "CREATE_COMMENT":
      return [...state, action.data];

    default: return state;
  }
};

export const initComments = () => {
  return async (dispatch) => {
    try {
      const data = await commentService.getAll();

      dispatch({
        type: "INIT_COMMENTS",
        data
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export const createComment = (message, blog) => {
  return async (dispatch) => {
    try {
      const data = await commentService.create({ message, blog });

      dispatch({
        type: "CREATE_COMMENT",
        data
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export default commentReducer;

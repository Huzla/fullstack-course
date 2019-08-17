import userService from "../services/users.js";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_USERS":
      return action.data;

    default: return state;
  }
};

export const initUsers = () => {
  return async (dispatch) => {
    try {
      const data = await userService.getAll();

      dispatch({
        type: "INIT_USERS",
        data
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export default userReducer;

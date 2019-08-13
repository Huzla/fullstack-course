import loginService from "../services/login.js";
import blogService from "../services/blogs.js";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USER":
      return action.data;

    case "LOG_OUT":
      return null;

    default: return state;
  }
};

export const initUser = () => {
  return async (dispatch) => {
    try {
      const userJSON = window.localStorage.getItem("loggedBlogAppUser");

      if (userJSON) {
        const user = JSON.parse(userJSON);
        blogService.setToken(user.token);

        dispatch({
          type: "INIT_USER",
          data: user
        });
      }
    }
    catch (err) {
      throw err;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      loginService.logout();
      dispatch({
        type: "LOG_OUT"
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);

      blogService.setToken(user.token);

      dispatch({
        type: "INIT_USER",
        data: user
      });
    }
    catch (err) {
      throw err;
    }
  };
};

export default loginReducer;

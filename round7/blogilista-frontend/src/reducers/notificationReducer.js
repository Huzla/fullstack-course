const notificationReducer = (state = { type: "", message: "" }, action) => {
  switch (action.type) {
  case "SET_NOTIFICATION":
    return action.data;

  case "CLEAR_NOTIFICATION":
    return { type: "", message: "" };
  default: return state;
  }
};

let timer = null;

export const setNotification = (type, message, timeOutInSeconds = 5) => {
  return async (dispatch) => {
    try {
      timer = clearTimeout(timer);

      dispatch({
        type: "SET_NOTIFICATION",
        data: { type, message }
      });

      timer = setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION"
        });
      }, 1000*timeOutInSeconds);
    }
    catch (err) {
      throw err;
    }
  };
};


export default notificationReducer;

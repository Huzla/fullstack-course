const notificationReducer = (state = "Initial state", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;

    case "CLEAR_NOTIFICATION":
      return "";
    default: return state;
  }
};

export const setNotification = (message, timeOutInSeconds) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SET_NOTIFICATION",
        data: message
      });

      setTimeout(() => {
        dispatch({
          type: "CLEAR_NOTIFICATION"
        })
      }, 1000*timeOutInSeconds);
    }
    catch (err) {
      throw err;
    }
  };
};


export default notificationReducer;

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.data;

    default: return state;
  }
};

export const setFilter = (str) => {
  return {
    type: "SET_FILTER",
    data: str
  };
};

export default filterReducer;

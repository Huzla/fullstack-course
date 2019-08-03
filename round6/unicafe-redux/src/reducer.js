const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

const incrementField = (state, field) => {
  return { ...state, [field]: state[field] + 1 };
};

const counterReducer = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case "GOOD":
      return incrementField(state, "good");
    case "OK":
      return incrementField(state, "ok");
    case "BAD":
      return incrementField(state, "bad");
    case "ZERO":
      return state;
    default: return state;
  };

};

export default counterReducer;

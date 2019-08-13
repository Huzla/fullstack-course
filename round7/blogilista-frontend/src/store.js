import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import notificationReducer from "./reducers/notificationReducer.js";
import blogReducer from "./reducers/blogReducer.js";
import loginReducer from "./reducers/loginReducer.js";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: loginReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

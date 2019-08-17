import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import notificationReducer from "./reducers/notificationReducer.js";
import blogReducer from "./reducers/blogReducer.js";
import loginReducer from "./reducers/loginReducer.js";
import userReducer from "./reducers/userReducer.js";

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: loginReducer,
  users: userReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

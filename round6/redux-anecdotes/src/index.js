import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import App from "./App.js";
import anecdoteReducer from "./reducers/anecdoteReducer.js";
import notificationReducer from "./reducers/notificationReducer.js";
import filterReducer from "./reducers/filterReducer.js";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
});

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <Provider store={ store }>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

render();
store.subscribe(render);

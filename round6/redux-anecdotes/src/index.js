import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import App from "./App.js";
import anecdoteReducer from "./reducers/anecdoteReducer.js";
import notificationReducer from "./reducers/notificationReducer.js";

const reducer = combineReducers({  anecdotes: anecdoteReducer,  notification: notificationReducer});

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <App store={ store } />,
    document.getElementById("root")
  );
};

render();
store.subscribe(render);

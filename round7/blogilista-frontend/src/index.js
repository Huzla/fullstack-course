import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App.js";
import store from "./store.js";

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

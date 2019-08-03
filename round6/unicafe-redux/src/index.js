import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const simpleAction = (field) => {
    return () => {
      store.dispatch({
        type: field
      });
    };
  };

  const [ good, ok, bad, zero ] = ["GOOD", "OK", "BAD", "ZERO"].map(key => simpleAction(key));

  return (
    <div>
      <button onClick={ good }>hyvä</button>
      <button onClick={ ok }>neutraali</button>
      <button onClick={ bad }>huono</button>
      <button onClick={ zero }>nollaa tilastot</button>
      <div>hyvä { store.getState().good }</div>
      <div>neutraali { store.getState().ok }</div>
      <div>huono { store.getState().bad }</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);

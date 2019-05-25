import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {reducer} from "./reducer.js";

const init = () => {
  const store = createStore(reducer);
  ReactDOM.render(
      <Provider store = {store}>
        <App/>
      </Provider>,
      document.getElementById(`root`)
  );
};

init();

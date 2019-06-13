import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import combineReducers from "./reducers/index.js";
import {Operations} from "./reducers/data/data.js";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from './api.js';


const init = () => {
  const api = createAPI();
  const store = createStore(
      combineReducers,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );

  store.dispatch(Operations.loadOffers());

  ReactDOM.render(
      <Provider store = {store}>
        <App/>
      </Provider>,
      document.getElementById(`root`)
  );
};

init();

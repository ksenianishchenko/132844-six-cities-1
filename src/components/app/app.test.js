import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {createStore, applyMiddleware} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "../../api.js";

it(`app renders correctly`, () => {
  const api = createAPI();
  const store = createStore(combineReducers, compose(
      applyMiddleware(thunk.withExtraArgument(api))
  ));
  const tree = renderer.create(<BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});

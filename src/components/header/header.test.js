import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";
import {createStore, applyMiddleware} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {createAPI} from "../../api.js";


it(`Header renders correctly`, () => {
  const api = createAPI();
  const store = createStore(combineReducers, compose(
      applyMiddleware(thunk.withExtraArgument(api))
  ));
  const tree = renderer.create(<Provider store={store}>
    <BrowserRouter>
      <Header
        checkAuthorizationStatus = {jest.fn()}
      />
    </BrowserRouter>
  </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

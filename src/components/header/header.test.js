import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

it(`Header renders correctly`, () => {
  const store = createStore(combineReducers);
  const tree = renderer.create(<Provider store={store}>
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

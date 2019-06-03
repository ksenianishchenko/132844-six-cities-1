import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';

it(`Header renders correctly`, () => {
  const store = createStore(combineReducers);
  const tree = renderer.create(<Provider store={store}>
    <Header />
  </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

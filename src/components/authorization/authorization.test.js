import React from "react";
import renderer from "react-test-renderer";
import {Authorization} from "./authorization.jsx";
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';

it(`Authorization screen renders correctly`, () => {
  const store = createStore(combineReducers);
  const tree = renderer.create(<Provider store={store}>
    <Authorization />
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {createStore} from 'redux';
import {reducer} from '../../reducer.js';
import {Provider} from 'react-redux';

it(`app renders correctly`, () => {
  const store = createStore(reducer);
  const tree = renderer.create(<Provider store={store}>
    <App />
  </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

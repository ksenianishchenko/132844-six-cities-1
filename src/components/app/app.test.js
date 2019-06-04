import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

it(`app renders correctly`, () => {
  const store = createStore(combineReducers);
  const tree = renderer.create(<BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});

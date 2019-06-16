import React from "react";
import {Favorites} from "./favorites.jsx";
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";
import ShallowRenderer from 'react-test-renderer/shallow';

it(`Favorites page renders correctly`, () => {
  const store = createStore(combineReducers);
  const renderer = new ShallowRenderer();
  const tree = renderer
  .render(<Provider store={store}>
    <BrowserRouter>
      <Favorites/>
    </BrowserRouter>
  </Provider>);

  expect(tree).toMatchSnapshot();
});

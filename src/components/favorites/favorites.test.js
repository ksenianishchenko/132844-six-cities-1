import React from "react";
import renderer from "react-test-renderer";
import Favorites from "./favorites.jsx";
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

it(`Favorites page renders correctly`, () => {
  const store = createStore(combineReducers);
  const tree = renderer
  .create(<Provider store={store}>
    <BrowserRouter>
      <Favorites/>
    </BrowserRouter>
  </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

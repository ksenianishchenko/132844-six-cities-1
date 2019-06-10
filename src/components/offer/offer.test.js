import React from "react";
import renderer from "react-test-renderer";
import {Offer} from "./offer.jsx";
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

it(`Offer page renders correctly`, () => {
  const store = createStore(combineReducers);
  const tree = renderer
  .create(<Provider store={store}>
    <BrowserRouter>
      <Offer />
    </BrowserRouter>
  </Provider>).toJSON();
  expect(tree).toMatchSnapshot();
});

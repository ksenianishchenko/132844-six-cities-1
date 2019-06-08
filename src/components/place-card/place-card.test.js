import React from "react";
import renderer from "react-test-renderer";
import {PlaceCard} from "./place-card.jsx";
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

it(`Place card renders correctly`, () => {
  const place = {
    pic: `src`,
    title: `String`,
    price: 120,
    details: `Place`,
    rating: 3
  };

  const store = createStore(combineReducers);

  const tree = renderer
  .create(<Provider store={store}>
    <BrowserRouter>
      <PlaceCard
        place = {place}
      /></BrowserRouter>
  </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

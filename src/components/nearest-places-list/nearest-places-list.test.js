import React from "react";
import renderer from "react-test-renderer";
import NearestPlacesList from "./nearest-places-list.jsx";
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

it(`List of nearest places renders correctly`, () => {
  const nearestPlaces = [{
    "id": 1,
    "user": {
      "id": 4,
      "is_pro": false,
      "name": `Max`,
      "avatar_url": `img/1.png`
    },
    "rating": 4,
    "comment": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "date": `2019-05-08T14:13:56.569Z`
  }];

  const store = createStore(combineReducers);

  const tree = renderer
  .create(<Provider store={store}>
    <BrowserRouter>
      <NearestPlacesList
        nearestPlaces = {nearestPlaces}
      />
    </BrowserRouter>
  </Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

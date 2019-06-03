import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list.jsx";
import {createStore} from 'redux';
import combineReducers from "../../reducers/index.js";
import {Provider} from 'react-redux';

const places = [
  {
    city: {
      "location": {"latitude": 50.846557, "longitude": 4.351697, "zoom": 13},
      "name": `Brussels`},
    location: {"latitude": 50.846557, "longitude": 4.351697, "zoom": 13},
    cityCoordinates: [48.862824, 2.341914],
    offers: [{
      pic: `img/apartment-01.jpg`,
      title: `Beautiful & luxurious apartment at great location`,
      price: 120,
      details: `Apartment`,
      latLang: [48.861206, 2.132363],
      rating: 3
    }],
  },
];

const city = {"name": `Dusseldorf`,
  "location": {"latitude": 51.225402, "longitude": 6.776314, "zoom": 13},
};

it(`List of places renders correctly`, () => {
  const store = createStore(combineReducers);
  const tree = renderer
  .create(<Provider store={store}><PlacesList
    places = {places}
    activeCity = {city}
    cities = {[city]}
  /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list.jsx";

const places = [
  {
    city: `Paris`,
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

it(`List of places renders correctly`, () => {
  const tree = renderer
  .create(<PlacesList
    places = {places}
    activeCityIndex = {0}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});

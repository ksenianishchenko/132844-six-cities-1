import React from "react";
import renderer from "react-test-renderer";
import PlacesList from "./places-list.jsx";

const places = [
  {
    pic: `src`,
    title: `String`,
    price: 120,
    details: `Place`
  },
  {
    pic: `src`,
    title: `String`,
    price: 80,
    details: `Place`
  },
];

it(`List of places renders correctly`, () => {
  const tree = renderer
  .create(<PlacesList
    places = {places}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});

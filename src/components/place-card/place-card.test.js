import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

it(`Place card renders correctly`, () => {
  const place = {
    pic: `src`,
    title: `String`,
    price: 120,
    details: `Place`,
    rating: 3
  };

  const tree = renderer
  .create(<PlaceCard
    place = {place}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});

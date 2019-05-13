import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./place-card.jsx";

it(`Place card renders correctly`, () => {
  const place = {
    pic: `src`,
    title: `String`,
    price: 120,
    details: `Place`
  };

  const tree = renderer
  .create(<PlaceCard
    place = {place}
  />);

  expect(tree).toMatchSnapshot();
});

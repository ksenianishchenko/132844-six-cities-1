import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";

it(`Map renders correctly`, () => {
  const markers = [
    [52.3909553943512, 4.85309666406167],
    [52.3909553943512, 4.85309666406168]
  ];

  const tree = renderer.create(
      <Map places = {markers} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

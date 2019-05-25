import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";

it(`Map renders correctly`, () => {
  const markers = [
    [52.3909553943512, 4.85309666406167],
    [52.3909553943512, 4.85309666406168]
  ];

  const tree = renderer.create(
      <Map
        offers = {markers}
        cityCoordinates = {[48.862824, 2.341914]}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

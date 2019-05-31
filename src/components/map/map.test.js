import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";

it(`Map renders correctly`, () => {

  const city = [
    {
      "location": {"latitude": 50.846557, "longitude": 4.351697, "zoom": 13},
      "name": `Brussels`}
  ];

  const activeCity = {
    "name": `Dusseldorf`,
    "location": {"latitude": 51.225402, "longitude": 6.776314, "zoom": 13},
  };

  const tree = renderer.create(
      <Map
        offers = {city}
        activeCity = {activeCity}
        activeOffer = {{}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

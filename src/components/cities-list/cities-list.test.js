import React from "react";
import renderer from "react-test-renderer";
import CitiesList from "./cities-list.jsx";

it(`Cities list renders correctly`, () => {
  const city = {"name": `Dusseldorf`,
    "location": {"latitude": 51.225402, "longitude": 6.776314, "zoom": 13},
  };

  const tree = renderer
  .create(<CitiesList
    cities = {[city]}
    onclick = {() => {}}
    activeCity = {city}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});

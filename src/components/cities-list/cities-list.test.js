import React from "react";
import renderer from "react-test-renderer";
import CitiesList from "./cities-list.jsx";

it(`Cities list renders correctly`, () => {
  const cities = [{
    city: `Moscow`,
  }];

  const tree = renderer
  .create(<CitiesList
    cities = {cities}
    onclick = {() => {}}
  />);

  expect(tree).toMatchSnapshot();
});

import React from "react";
import renderer from "react-test-renderer";
import PlacesListEmpty from "./places-list-empty.jsx";

it(`Footer renders correctly`, () => {
  const tree = renderer.create(<PlacesListEmpty />).toJSON();

  expect(tree).toMatchSnapshot();
});

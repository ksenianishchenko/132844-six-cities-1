import React from "react";
import renderer from "react-test-renderer";
import App from './app.jsx';

it(`app renders correctly`, () => {
  const tree = renderer
  .create(<App
    rentPlaces = {[`place23`, `place2`, `place3`, `place4`, `place5`]}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});

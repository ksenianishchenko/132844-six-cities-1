import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

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

it(`app renders correctly`, () => {
  const tree = renderer
  .create(<App
    places = {places}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});

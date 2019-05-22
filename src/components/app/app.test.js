import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const places = [{
  city: `Paris`,
  offers: [{
    pic: `img/apartment-01.jpg`,
    title: `Beautiful & luxurious apartment at great location`,
    price: 120,
    details: `Apartment`,
    latLang: [52.3909553943508, 4.85309666406198]
  }]
}
];

it(`app renders correctly`, () => {
  const tree = renderer
  .create(<App
    places = {places}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});

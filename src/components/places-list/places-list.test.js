import React from "react";
import PlacesList from "./places-list.jsx";
import {BrowserRouter} from "react-router-dom";
import ShallowRenderer from 'react-test-renderer/shallow';

const places = [
  {
    "id": 1,
    "city": {
      "name": `Amsterdam`,
      "location": {
        "latitude": 52.370216,
        "longitude": 4.895168,
        "zoom": 10
      }
    },
    "preview_image": `img/1.png`,
    "images": [`img/1.png`, `img/2.png`],
    "title": `Beautiful & luxurious studio at great location`,
    "is_favorite": false,
    "is_premium": false,
    "rating": 4.8,
    "type": `apartment`,
    "bedrooms": 3,
    "max_adults": 4,
    "price": 120,
    "goods": [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    "host": {
      "id": 3,
      "is_pro": true,
      "name": `Angelina`,
      "avatar_url": `img/1.png`
    },
    "description": `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    "location": {
      "latitude": 52.35514938496378,
      "longitude": 4.673877537499948,
      "zoom": 8,
    }
  },
];

const city = {"name": `Dusseldorf`,
  "location": {"latitude": 51.225402, "longitude": 6.776314, "zoom": 13},
};

it(`List of places renders correctly`, () => {
  const renderer = new ShallowRenderer();
  const tree = renderer
  .render(
      <BrowserRouter>
        <PlacesList
          places = {places}
          activeCity = {city}
          cities = {[city]}
          activeElement = {`Popular`}
        />
      </BrowserRouter>);

  expect(tree).toMatchSnapshot();
});

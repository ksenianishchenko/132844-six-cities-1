import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlacesList from "./places-list.jsx";

Enzyme.configure({adapter: new Adapter()});

const mock = {
  places: [{
    pic: `img/apartment-01.jpg`,
    title: `Beautiful & luxurious apartment at great location`,
    price: 120,
    details: `Apartment`
  }]
};


it(`Save title of active card`, () => {
  const {places} = mock;
  const placesList = mount(<PlacesList
    places = {places}
  />);

  expect(placesList.state(`activeCardTitle`)).toEqual(``);
  const pic = placesList.find(`.place-card__image`);
  pic.simulate(`click`);
  expect(placesList.state(`activeCardTitle`)).toEqual(`Beautiful & luxurious apartment at great location`);
});

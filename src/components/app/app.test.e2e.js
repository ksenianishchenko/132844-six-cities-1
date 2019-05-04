import React from "react";
import App from "./app.jsx";
import Enzyme, {shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter()});

it(`click on title works correctly`, () => {
  const clickHandle = jest.fn();

  const app = shallow(<App
    rentPlaces = {[`place1`, `place2`, `place3`, `place4`]}
    onClick = {clickHandle}
  />);

  const placeTitle = app.find(`.place-card__name a`);
  placeTitle.simulate(`click`);
  expect(clickHandle).toHaveBeenCalledTimes(1);
});

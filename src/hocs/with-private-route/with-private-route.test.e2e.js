import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withPrivateRoute from "./with-active-offer.jsx";

Enzyme.configure({adapter: new Adapter()});

const mockFunc = jest.fn();

it(`Should call component`, () => {
  const wrapper = shallow(<withPrivateRoute
    component = {mockFunc}
    authed = {true}
  />);
  wrapper.props().authed(false);
  expect(mockFunc).toHaveBeenCalledTimes(1);
});

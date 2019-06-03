import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withAuthorizationForm from "./with-authorization-form.jsx";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapper = withAuthorizationForm(MockComponent);

it(`Should change users data when call handleGetInputValue`, () => {
  const wrapper = shallow(<MockComponentWrapper />);

  expect(wrapper.props().userData).toEqual({
    email: null,
    password: null
  });
  wrapper.props().handleGetInputValue(`email`, `kris`);
  expect(wrapper.props().userData).toEqual({
    email: `kris`,
    password: null});
});

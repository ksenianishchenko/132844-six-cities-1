import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withReviewForm from "./with-review-form.jsx";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapper = withReviewForm(MockComponent);

it(`Should change reviews data when call handleGetInputValue`, () => {
  const wrapper = shallow(<MockComponentWrapper />);

  expect(wrapper.props().review).toEqual({
    rating: 0,
    comment: ``
  });
  wrapper.props().onTextAreaClick(`text`);
  expect(wrapper.props().review).toEqual({
    rating: 0,
    comment: `text`});
  wrapper.props().onRadioClick(3);
  expect(wrapper.props().review).toEqual({
    rating: 3,
    comment: `text`});
});

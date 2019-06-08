import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withSort from "./with-sort.jsx";

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapper = withSort(MockComponent);

const mockPlaces = [
  {price: 100,
    rating: 3},
  {price: 120,
    rating: 1},
];

it(`Should change sortingPlaces when call onSortPlaces`, () => {
  const wrapper = shallow(<MockComponentWrapper />);

  expect(wrapper.props().sortingPlaces).toEqual(null);
  wrapper.props().onSortPlaces(mockPlaces, `Price: high to low`);
  expect(wrapper.props().sortingPlaces).toEqual([
    {price: 120,
      rating: 1},
    {price: 100,
      rating: 3},
  ]);
  wrapper.props().onSortPlaces(mockPlaces, `Price: low to high`);
  expect(wrapper.props().sortingPlaces).toEqual([
    {price: 100,
      rating: 3},
    {price: 120,
      rating: 1}
  ]);
});

it(`Should change activeElement when call onGetActiveElement`, () => {
  const wrapper = shallow(<MockComponentWrapper />);

  expect(wrapper.props().activeElement).toEqual(`Popular`);
  wrapper.props().onGetActiveElement(`Price: high to low`);
  expect(wrapper.props().activeElement).toEqual(`Price: high to low`);
});

it(`Should change sortListOpen when call onSortListToggle`, () => {
  const wrapper = shallow(<MockComponentWrapper />);

  expect(wrapper.props().sortListOpen).toEqual(false);
  wrapper.props().onSortListToggle();
  expect(wrapper.props().sortListOpen).toEqual(true);
});

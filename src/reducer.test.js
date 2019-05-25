import {ActionCreators, reducer} from "./reducer.js";
import offers from "./mocks/offers.js";

it(`Checks action creator`, () => {
  expect(ActionCreators.changeCity(3)).toEqual({
    type: `CHANGE_CITY`,
    payload: 3
  });
});

it(`Initial state of reducer`, () => {
  expect(reducer(undefined, {})).toEqual({
    activeCityIndex: 0,
    offers
  });
});

it(`Checks state of reducer`, () => {
  expect(reducer({
    activeCityIndex: 13,
    offers
  }, {
    type: `CHANGE_CITY`,
    payload: 3
  })).toEqual({
    activeCityIndex: 3,
    offers
  });
});

import {reducer} from "./reducer.js";

it(`Initial state of reducer`, () => {
  expect(reducer(undefined, {})).toEqual({
    activeCityIndex: 0
  });
});

it(`Checks state of reducer`, () => {
  expect(reducer({
    activeCityIndex: 13
  }, {
    type: `CHANGE_CITY`,
    payload: 3
  })).toEqual({
    activeCityIndex: 3
  });
});

import {reducer} from "./user.js";

it(`checks initialstate of user reducer`, () => {
  expect(reducer(undefined, {})).toEqual({
    isAuthorizationRequired: false
  });
});

it(`checks state of user reducer`, () => {
  expect(reducer({
    isAuthorizationRequired: true
  }, {
    type: `REQUIRED_AUTHORIZATION`,
    payload: false
  })).toEqual({
    isAuthorizationRequired: false
  });
});

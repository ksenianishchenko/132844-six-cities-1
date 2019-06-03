import {reducer} from "./user.js";

it(`checks initialstate of user reducer`, () => {
  expect(reducer(undefined, {})).toEqual({
    isAuthorizationRequired: true,
    authorizationPostResponse: null,
    authorizationError: null
  });
});

it(`checks authorization status of user reducer`, () => {
  expect(reducer({
    isAuthorizationRequired: true,
    authorizationPostResponse: null,
    authorizationError: null
  }, {
    type: `REQUIRED_AUTHORIZATION`,
    payload: false
  })).toEqual({
    isAuthorizationRequired: false,
    authorizationPostResponse: null,
    authorizationError: null
  });
});

it(`checks authorization post request status`, () => {
  expect(reducer({
    isAuthorizationRequired: true,
    authorizationPostResponse: null,
    authorizationError: null
  }, {
    type: `AUTHORIZATION_POST_RESPONSE`,
    payload: {text: `user`}
  })).toEqual({
    isAuthorizationRequired: true,
    authorizationPostResponse: {text: `user`},
    authorizationError: null
  });
});

import {reducer} from "./comments.js";

it(`checks initialstate of comments reducer`, () => {
  expect(reducer(undefined, {})).toEqual({
    reviewsArray: [],
    userComment: {},
    errorPostComment: null
  });
});

it(`checks loading comments`, () => {
  expect(reducer({
    reviewsArray: [],
    userComment: {},
    errorPostComment: null
  }, {
    type: `GET_REVIEWS`,
    payload: [{
      id: 5,
      name: `Max`
    }]
  })).toEqual({
    reviewsArray: [{
      id: 5,
      name: `Max`
    }],
    userComment: {},
    errorPostComment: null
  });
});

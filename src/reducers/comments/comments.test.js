import {reducer} from "./comments.js";

it(`checks initialstate of comments reducer`, () => {
  expect(reducer(undefined, {})).toEqual({
    reviewsArray: []
  });
});

it(`checks loading comments`, () => {
  expect(reducer({
    reviewsArray: []
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
    }]
  });
});

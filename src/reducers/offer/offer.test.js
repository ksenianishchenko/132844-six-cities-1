import {reducer} from "./offer.js";

it(`checks initialstate of offer reducer`, () => {
  expect(reducer(undefined, {})).toEqual({
    activeOffer: null,
    nearestPlaces: []
  });
});

it(`checks activeOffer`, () => {
  expect(reducer({
    activeOffer: null,
    nearestPlaces: []
  }, {
    type: `GET_ACTIVE_OFFER`,
    payload: {
      "name": `Paris`,
      "location": {"latitude": 50.846557, "longitude": 4.351697, "zoom": 13}
    }
  })).toEqual({
    activeOffer: {
      "name": `Paris`,
      "location": {"latitude": 50.846557, "longitude": 4.351697, "zoom": 13}
    },
    nearestPlaces: []
  });
});

it(`checks nearestPlaces`, () => {
  expect(reducer({
    activeOffer: null,
    nearestPlaces: []
  }, {
    type: `GET_NEAREST_PLACES`,
    payload: [{
      "name": `City2`
    },
    {
      "name": `City1`
    }]
  })).toEqual({
    activeOffer: null,
    nearestPlaces: [{
      "name": `City2`
    },
    {
      "name": `City1`
    }]
  });
});

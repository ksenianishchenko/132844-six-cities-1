import {reducer} from "./favorites.js";

describe(`Checks reducer`, () => {
  it(`checks initialstate`, () => {
    expect(reducer(undefined, {})).toEqual({
      favoritesList: [],
      error: null
    });
  });

  it(`checks favorites list`, () => {
    expect(reducer({
      favoritesList: [],
      error: null
    }, {
      type: `LOAD_FAVORITES`,
      payload: [{
        "name": `Paris`,
        "location": {"latitude": 50.846557, "longitude": 4.351697, "zoom": 13}
      }]
    })).toEqual({
      favoritesList: [
        {
          "name": `Paris`,
          "location": {"latitude": 50.846557, "longitude": 4.351697, "zoom": 13}
        }],
      error: null
    });
  });
});

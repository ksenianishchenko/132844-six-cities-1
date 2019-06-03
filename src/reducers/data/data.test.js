import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {actionsType, Operations} from "./data.js";


describe(`Reducer works correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const offersLoader = Operations.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: actionsType.LOAD_OFFERS,
          payload: [{fake: true}],
        });
      });
  });
});

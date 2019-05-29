import offers from "./mocks/offers.js";

const initialState = {
  activeCityIndex: 0,
  offers
};

const actionsType = {
  CHANGE_CITY: `CHANGE_CITY`
};

const ActionCreators = {
  changeCity: (index) => ({
    type: `CHANGE_CITY`,
    payload: index,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.CHANGE_CITY: return Object.assign({}, state, {
      activeCityIndex: action.payload
    });
  }

  return state;
};

export {reducer, ActionCreators};

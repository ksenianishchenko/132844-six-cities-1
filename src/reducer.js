import offers from "./mocks/offers.js";

const initialState = {
  activeCityIndex: 0,
  activeOffer: {},
  offers
};

const actionsType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_ACTIVE_OFFER: `GET_ACTIVE_OFFER`
};

const ActionCreators = {
  changeCity: (index) => ({
    type: `CHANGE_CITY`,
    payload: index,
  }),
  getActiveOffer: (offer) => ({
    type: `GET_ACTIVE_OFFER`,
    payload: offer,
  })
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.CHANGE_CITY: return Object.assign({}, state, {
      activeCityIndex: action.payload
    });
    case actionsType.GET_ACTIVE_OFFER: return Object.assign({}, state, {
      activeOffer: action.payload
    });
  }

  return state;
};

export {reducer, ActionCreators};

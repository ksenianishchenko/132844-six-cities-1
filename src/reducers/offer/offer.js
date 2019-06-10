const initialState = {
  activeOffer: {},
  nearestPlaces: []
};

const ActionsType = {
  GET_ACTIVE_OFFER: `GET_ACTIVE_OFFER`,
  GET_NEAREST_PLACES: `GET_NEAREST_PLACES`
};

const ActionCreators = {
  getActiveOffer: (offer) => {
    return {
      type: `GET_ACTIVE_OFFER`,
      payload: offer,
    };
  },
  getNearestPlaces: (places) => {
    return {
      type: `GET_NEAREST_PLACES`,
      payload: places,
    };
  }
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.GET_ACTIVE_OFFER: return Object.assign({}, state, {
      activeOffer: action.payload
    });
    case ActionsType.GET_NEAREST_PLACES: return Object.assign({}, state, {
      nearestPlaces: action.payload
    });
  }

  return state;
};

export {reducer, ActionCreators, ActionsType};

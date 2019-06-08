const initialState = {
  loadedOffers: []
};

const ActionsType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreators = {
  loadOffers: (offers) => {
    return {
      type: `LOAD_OFFERS`,
      payload: offers
    };
  },
};

const Operations = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`).
    then((response) => {
      dispatch(ActionCreators.loadOffers(response.data));
    });
  }
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.LOAD_OFFERS: return Object.assign({}, state, {
      loadedOffers: action.payload
    });
  }

  return state;
};

export {reducer, ActionCreators, Operations, ActionsType};

const initialState = {
  activeOffer: {}
};

const ActionsType = {
  GET_ACTIVE_OFFER: `GET_ACTIVE_OFFER`
};

const ActionCreators = {
  getActiveOffer: (offer) => {
    return {
      type: `GET_ACTIVE_OFFER`,
      payload: offer,
    };
  }
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.GET_ACTIVE_OFFER: return Object.assign({}, state, {
      activeOffer: action.payload
    });
  }

  return state;
};

export {reducer, ActionCreators, ActionsType};

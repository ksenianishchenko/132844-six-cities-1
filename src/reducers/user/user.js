const initialState = {
  isAuthorizationRequired: false
};

const actionsType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`
};

const ActionCreators = {
  requireAuthorization: (status) => {
    return {
      type: actionsType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.REQUIRED_AUTHORIZATION: return Object.assign({}, state, {
      isAuthorizationRequired: action.payload,
    });
  }
  return state;
};

export {reducer, ActionCreators, actionsType};

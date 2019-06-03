const initialState = {
  isAuthorizationRequired: true,
  authorizationPostResponse: null,
  authorizationError: null
};

const actionsType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  AUTHORIZATION_POST_RESPONSE: `AUTHORIZATION_POST_RESPONSE`,
  AUTHORIZATION_ERROR: `AUTHORIZATION_ERROR`,
};

const ActionCreators = {
  requireAuthorization: (status) => {
    return {
      type: actionsType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  authorizationPostResponse: (status) => {
    return {
      type: actionsType.AUTHORIZATION_POST_RESPONSE,
      payload: status
    };
  },
  getAuthorizationError: (error) => {
    return {
      type: actionsType.AUTHORIZATION_ERROR,
      payload: error
    };
  }
};

const onAuthorizationRequest = (email, password) => (dispatch, getState, api) => {
  return api.post(`/login`, {
    email,
    password
  })
  .then((response) => {
    dispatch(ActionCreators.authorizationPostResponse(response.data));
    dispatch(ActionCreators.requireAuthorization());
  })
  .catch((err) => {
    return ActionCreators.getAuthorizationError(err.response.data);
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.REQUIRED_AUTHORIZATION: return Object.assign({}, state, {
      isAuthorizationRequired: !state.isAuthorizationRequired,
    });
    case actionsType.AUTHORIZATION_POST_RESPONSE: return Object.assign({}, state, {
      authorizationPostResponse: action.payload,
    });
    case actionsType.AUTHORIZATION_ERROR: return Object.assign({}, state, {
      authorizationError: action.payload,
    });
  }
  return state;
};

export {reducer, ActionCreators, actionsType, onAuthorizationRequest};

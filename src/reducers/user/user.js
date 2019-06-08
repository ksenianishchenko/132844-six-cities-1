const initialState = {
  isAuthorizationRequired: true,
  authorizationPostResponse: null,
  authorizationError: null
};

const ActionsType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  AUTHORIZATION_POST_RESPONSE: `AUTHORIZATION_POST_RESPONSE`,
  AUTHORIZATION_ERROR: `AUTHORIZATION_ERROR`,
};

const ActionCreators = {
  requireAuthorization: (status) => {
    return {
      type: ActionsType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  authorizationPostResponse: (status) => {
    return {
      type: ActionsType.AUTHORIZATION_POST_RESPONSE,
      payload: status
    };
  },
  getAuthorizationError: (error) => {
    return {
      type: ActionsType.AUTHORIZATION_ERROR,
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
    if (response.isAxiosError) {
      dispatch(ActionCreators.getAuthorizationError(true));
      return;
    }

    dispatch(ActionCreators.authorizationPostResponse(response.data));
    dispatch(ActionCreators.requireAuthorization());
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.REQUIRED_AUTHORIZATION: return Object.assign({}, state, {
      isAuthorizationRequired: !state.isAuthorizationRequired,
    });
    case ActionsType.AUTHORIZATION_POST_RESPONSE: return Object.assign({}, state, {
      authorizationPostResponse: action.payload,
    });
    case ActionsType.AUTHORIZATION_ERROR: return Object.assign({}, state, {
      authorizationError: action.payload,
    });
  }
  return state;
};

export {reducer, ActionCreators, ActionsType, onAuthorizationRequest};

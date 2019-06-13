const initialState = {
  favoritesList: []
};

const ActionsType = {
  LOAD_FAVORITES: `LOAD_FAVORITES`,
};

const ActionCreators = {
  loadFavorites: (offers) => {
    return {
      type: `LOAD_FAVORITES`,
      payload: offers
    };
  },
};

const loadFavorites = () => (dispatch, getState, api) => {
  return api.get(`/favorites`).
  then((response) => {
    dispatch(ActionCreators.loadFavorites(response.data));
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.LOAD_FAVORITES: return Object.assign({}, state, {
      favoritesList: action.payload
    });
  }

  return state;
};

export {reducer, ActionCreators, ActionsType, loadFavorites};

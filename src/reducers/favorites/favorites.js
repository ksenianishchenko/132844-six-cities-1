import {Operations} from "../data/data.js";
import {ActionCreators as ActionCreatorsOffers} from "../offer/offer.js";

const initialState = {
  favoritesList: [],
  error: null
};

const ActionsType = {
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  GET_ERROR: `GET_ERROR`,
  PUSH_TO_FAVORITE: `PUSH_TO_FAVORITE`
};

const ActionCreators = {
  loadFavorites: (offers) => {
    return {
      type: `LOAD_FAVORITES`,
      payload: offers
    };
  },
  getSendFavoriteError: (error) => {
    return {
      type: `GET_ERROR`,
      payload: error
    };
  },
};

const loadFavorites = () => (dispatch, getState, api) => {
  return api.get(`/favorite`).
  then((response) => {
    dispatch(ActionCreators.loadFavorites(response.data));
  }).catch(() => {
  });
};

const sendFavorite = (id, favoriteStatus) => (dispatch, getState, api) => {
  const status = favoriteStatus ? `0` : `1`;
  return api.post(`/favorite/${id}/${status}`).
  then(() => {
    dispatch(loadFavorites());
    dispatch(Operations.loadOffers());
  }).catch((error) => {
    if (error.response && error.response.data) {
      dispatch(ActionCreators.getSendFavoriteError(error.response.data));
    }
  });
};

const removeFavorite = (id) => (dispatch, getState, api) => {
  return api.post(`/favorite/${id}/0`).
  then(() => {
    dispatch(loadFavorites());

  })
  .catch((error) => {
    if (error.response && error.response.data) {
      dispatch(ActionCreators.getSendFavoriteError(error.response.data));
    }
  });
};

const changeActiveOffer = (id, isFavorite) => (dispatch, _getState, api) => {
  const status = isFavorite ? `0` : `1`;
  return api.post(`/favorite/${id}/${status}`)
    .then((response) => {
      dispatch(ActionCreatorsOffers.getActiveOffer(response.data));
    }).catch(() => {
    });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.LOAD_FAVORITES: return Object.assign({}, state, {
      favoritesList: action.payload
    });
    case ActionsType.GET_ERROR: return Object.assign({}, state, {
      error: action.payload
    });
  }

  return state;
};

export {reducer, ActionCreators, ActionsType, loadFavorites, sendFavorite, removeFavorite, changeActiveOffer};

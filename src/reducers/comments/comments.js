const initialState = {
  reviewsArray: []
};

const ActionsType = {
  GET_REVIEWS: `GET_REVIEWS`
};

const ActionCreators = {
  getReviews: (reviews) => {
    return {
      type: `GET_REVIEWS`,
      payload: reviews
    };
  }
};

const getUsersReviews = (id) => (dispatch, getState, api) => {
  return api.get(`/comments/${id}`)
  .then((response) => {
    dispatch(ActionCreators.getReviews(response.data));
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.GET_REVIEWS: return Object.assign({}, state, {
      reviewsArray: action.payload,
    });
  }
  return state;
};

export {reducer, ActionCreators, getUsersReviews};

const initialState = {
  reviewsArray: [],
  userComment: {},
  errorPostComment: null
};

const ActionsType = {
  GET_REVIEWS: `GET_REVIEWS`,
  POST_REVIEW: `POST_REVIEW`,
  GET_ERROR: `GET_ERROR`
};

const ActionCreators = {
  getReviews: (reviews) => {
    return {
      type: `GET_REVIEWS`,
      payload: reviews
    };
  },
  postReview: (review) => {
    return {
      type: `POST_REVIEW`,
      payload: review
    };
  },
  getError: (error) => {
    return {
      type: `GET_ERROR`,
      payload: error
    };
  }
};

const getUsersReviews = (id) => (dispatch, getState, api) => {
  return api.get(`/comments/${id}`)
  .then((response) => {
    dispatch(ActionCreators.getReviews(response.data));
  }).catch(() => {
  });
};

const postUserReview = (id, rating, comment) => (dispatch, getState, api) => {
  return api.post(`/comments/${id}`, {
    rating,
    comment
  })
  .then((response) => {
    dispatch(ActionCreators.postReview(response.data));
    dispatch(ActionCreators.getReviews(response.data));
  }).catch((error) => {
    if (error.response && error.response.data) {
      dispatch(ActionCreators.getError(error.response.data));
    }
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.GET_REVIEWS: return Object.assign({}, state, {
      reviewsArray: action.payload,
    });
    case ActionsType.POST_REVIEW: return Object.assign({}, state, {
      userComment: action.payload,
    });
    case ActionsType.GET_ERROR: return Object.assign({}, state, {
      errorPostComment: action.payload,
    });
  }
  return state;
};

export {reducer, ActionCreators, getUsersReviews, postUserReview};

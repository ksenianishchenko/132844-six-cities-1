const initialState = {
  activeCityIndex: 0
};

const actionsType = {
  CHANGE_CITY: `CHANGE_CITY`
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.CHANGE_CITY: return Object.assign({}, state, {
      activeCityIndex: action.payload
    });
  }

  return state;
};

export {reducer};

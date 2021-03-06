import NameSpace from "../name-spaces.js";

const NAME_SPACE = NameSpace.OFFER;


export const getActiveOffer = (state) => {
  return state[NAME_SPACE].activeOffer;
};

export const getNearestPlaces = (state) => {
  return state[NAME_SPACE].nearestPlaces;
};

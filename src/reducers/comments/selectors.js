import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.COMMENTS;


export const getReviews = (state) => {
  return state[NAME_SPACE].reviewsArray;
};

import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.FAVORITES;


export const getFavoritesList = (state) => {
  return state[NAME_SPACE].favoritesList;
};

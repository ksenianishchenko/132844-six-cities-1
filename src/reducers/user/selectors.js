import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.USER;


export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export const getAuthorizationPostResponse = (state) => {
  return state[NAME_SPACE].authorizationPostResponse;
};

export const getAuthorizationError = (state) => {
  return state[NAME_SPACE].authorizationError;
};

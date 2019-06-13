import {combineReducers} from "redux";
import {reducer as game} from "./game/game";
import {reducer as data} from "./data/data";
import {reducer as user} from "./user/user";
import {reducer as offer} from "./offer/offer";
import {reducer as comments} from "./comments/comments";
import {reducer as favorites} from "./favorites/favorites";
import NameSpace from "./name-spaces";

export default combineReducers({
  [NameSpace.GAME]: game,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
  [NameSpace.OFFER]: offer,
  [NameSpace.COMMENTS]: comments,
  [NameSpace.FAVORITES]: favorites,
});

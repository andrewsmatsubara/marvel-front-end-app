import { combineReducers } from "redux";
import { characterReducer } from './characterReducer';
import { accessReducer } from "./accessReducer";

export const reducers = combineReducers({
  characterState: characterReducer,
  accessState: accessReducer
});

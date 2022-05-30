import { combineReducers } from "redux";
import { characterReducer } from './characterReducer';

export const reducers = combineReducers({
  state: characterReducer,
});

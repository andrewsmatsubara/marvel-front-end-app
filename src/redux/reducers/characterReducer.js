import { getCharacter } from "../../util/util";

const initialState = {
  newValue: getCharacter(),
}

export const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHARACTER_VALUE':
      return {
        ...state,
        newValue: action.newValue
      };
    default:
      return state;
  }
}

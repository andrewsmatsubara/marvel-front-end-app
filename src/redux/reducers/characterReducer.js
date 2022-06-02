const initialState = {
  newCharacterValue: '',
}

export const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHARACTER_VALUE':
      return {
        ...state,
        newCharacterValue: action.characterValue
      };
    default:
      return state;
  }
}

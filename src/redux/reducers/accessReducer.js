const initialState = {
  newPrivateValue: '',
  newPublicValue: ''
}

export const accessReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACCESS_VALUE':
      return {
        ...state,
        newPrivateValue: action.newPrivateValue,
        newPublicValue: action.newPublicValue
      };
    default:
      return state;
  }
}

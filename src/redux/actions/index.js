export const characterAction = value => ({
  type: 'CHARACTER_VALUE',
  characterValue: value
});

export const accessAction = (privateValue, publicValue) => ({
  type: 'ACCESS_VALUE',
  newPrivateValue: privateValue,
  newPublicValue: publicValue
});

export const authReducer = (state = '', action) => {
  switch (action.type) {
    case 'FETCH_AUTH_DATA':
      return action.payload;
    default:
      return state;
  }
};

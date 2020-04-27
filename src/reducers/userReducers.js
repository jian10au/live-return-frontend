export const userReducer = (state = '', action) => {
  switch (action.type) {
    case 'FETCH_USER_TOKEN':
      return action.payload;
    default:
      return state;
  }
};

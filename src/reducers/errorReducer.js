import { GET_ERRORS, CLEAR_ERRORS } from './types';

const initialState = {
  msg: {},
  //why do we have {} instead of empty string or null? and what is the benefit at all?
  status: null,
  id: null,
  //what is the use of the status and id?
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
};

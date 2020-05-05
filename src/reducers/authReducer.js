import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  //LOAD_TOKEN,
} from './types';

const initialState = {
  authToken: localStorage.getItem('authToken'),
  // authToken: null

  isAuthenticated: null,
  isLoading: false,
  user: null,
};

//

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    //case TOKEN_LOADED,
    // return {
    //...state,
    //authToken: localStorage.getItem('authToken')
    // }

    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('authToken', action.payload.authToken);
      console.log(action.payload, 'what is the payload to be used?');
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      console.log('why register_fail can run in here?');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

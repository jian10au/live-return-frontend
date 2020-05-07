import { httpRequest, setAuthorizationToken } from '../utils/axios';

// do two things at the same time fetch the user information and the user token at the same time?

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_ERRORS,
  AUTHTOKEN_LOADED,
} from '../reducers/types';

//check token and load user

// helper function for attach Header to load user get request

export const tokenConfig = (getState) => {
  // Get token from localstorage
  const authToken = getState().auth.authToken;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers

  if (authToken) {
    config.headers['x-auth-token'] = authToken;
  }

  return config;
};

//

export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });
  dispatch({ type: AUTHTOKEN_LOADED });
  console.log(tokenConfig(getState), 'what is return by tokenConfig');

  try {
    const response = await httpRequest.get(
      '/credentialUser',
      tokenConfig(getState)
    );
    const user = response.data;

    dispatch({
      type: USER_LOADED,
      payload: user,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: AUTH_ERROR });
    dispatch({
      type: GET_ERRORS,
      payload: {
        msg: err.response.data,
        status: err.response.status,
        id: 'loadUser_fail',
      },
    });
  }
};

export const register = ({ username, email, password }) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ username, email, password });
  console.log(body, 'what is the body submitted?');

  try {
    const response = await httpRequest.post('/register', body, config);
    const authData = response.data;
    await dispatch({
      type: REGISTER_SUCCESS,
      payload: authData,
    });

    //for example, I can set the default axios in here
  } catch (err) {
    //dispatch authReducer related action to update the auth key in globalState
    // authStructure is:
    // {isAuthenticated:true,isLoading:true,user:{},authToken}

    dispatch({
      type: REGISTER_FAIL,
    });

    //dispatch errorReducer related action to update the error key in globalState
    //traversy way is to wrapp the below further into another function ie. dispatch(returnError(err.response.data, err.response.status, err.response.id))
    dispatch({
      type: GET_ERRORS,
      payload: {
        msg: err.response.data,
        status: err.response.status,
        id: 'register_fail',
      },
    });
  }
};

export const signIn = ({ email, password }) => async (dispatch) => {
  // generate basic auth string for credential
  // send the basic auth string in header
  const basicAuthStr = returnBasicAuthStr(email, password);
  console.log(basicAuthStr);
  const config = {
    headers: {
      Authorization: basicAuthStr,
    },
  };

  try {
    const response = await httpRequest.get('/signin', config);
    const authData = response.data;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: authData,
    });

    //set the axios defaultHeader in here
    // each httpRequest made after this point will have the authToken in there
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    console.log('within Login Fail');
    dispatch({
      type: GET_ERRORS,
      payload: {
        msg: err.response.data,
        status: err.response.status,
        id: 'signin_fail',
      },
    });
  }
};

export const signOut = () => {
  console.log('Sign Out Action Triggered?');
  return {
    type: LOGOUT_SUCCESS,
  };
};

const returnBasicAuthStr = (username, password) => {
  const basicAuthStr = 'Basic' + ' ' + btoa(username + ':' + password);
  return basicAuthStr;
};

// export const fetchAuthData = ({ username, password }) => async (dispatch) => {
//   const basicAuth = genBasicAuth(username, password);
//   console.log(basicAuth, 'What is basicAuth in fetchAuthData');

//   try {
//     const response = await httpRequest.post(
//       '/login',
//       {},
//       {
//         headers: { Authorization: basicAuth },
//       }
//     );
//     const authData = response.data;
//     console.log(authData, `what is response`);
//     localStorage.setItem('userAuthToken', authData.authToken);
//     setAuthorizationToken(authData.authToken);
//     dispatch({
//       type: 'FETCH_AUTH_DATA',
//       payload: authData,
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// };

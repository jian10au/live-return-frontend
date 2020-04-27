import { httpRequest, setAuthorizationToken } from '../utils/axios';

// do two things at the same time fetch the user information and the user token at the same time?

export const fetchUserAndJWT = (authorization) => async (dispatch) => {
  //shall I write code to let the storage to store the token in here
  // this way the action will become not pure.

  const username = authorization.username;
  var password = authorization.password;
  var basicAuth = 'Basic ' + btoa(username + ':' + password);

  try {
    const response = await httpRequest.post(
      '/login',
      {},
      {
        headers: { Authorization: basicAuth },
      }
    );
    localStorage.setItem('userJwtToken', response.data);
    setAuthorizationToken(response.data);
    dispatch({
      type: 'FETCH_USER_TOKEN',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

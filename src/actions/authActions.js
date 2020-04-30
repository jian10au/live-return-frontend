import { httpRequest, setAuthorizationToken } from '../utils/axios';

// do two things at the same time fetch the user information and the user token at the same time?

export const fetchAuthData = (authorization) => async (dispatch) => {
  //shall I write code to let the storage to store the token in here
  // this way the action will become not pure.

  const username = authorization.username;
  const password = authorization.password;
  const basicAuth = 'Basic ' + btoa(username + ':' + password);

  try {
    const response = await httpRequest.post(
      '/login',
      {},
      {
        headers: { Authorization: basicAuth },
      }
    );

    const authData = response.data;
    console.log('what is the authdata here', authData);

    localStorage.setItem('userAuthToken', authData.authToken);
    setAuthorizationToken(authData.authToken);
    // a better approach is to specifically specify the structure of the action
    // and this is what I will do later by using TypeScript
    dispatch({
      type: 'FETCH_AUTH_DATA',
      payload: authData,
    });
  } catch (err) {
    console.log(err);
  }
};

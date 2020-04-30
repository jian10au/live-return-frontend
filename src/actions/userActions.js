import { httpRequest, setAuthorizationToken } from '../utils/axios';

export const fetchUserProfile = async (dispatch) => {
  const userAuthToken = localStorage.getItem('userAuthToken');
  console.log(userAuthToken);
  if (userAuthToken) {
    try {
      setAuthorizationToken(userAuthToken);
      const response = await httpRequest.get('/userprofile');
      const userprofile = response.data;
      dispatch({
        type: 'FETCH_AUTH_DATA',
        payload: { username: userprofile.username },
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('there is no user auth token yet');
  }
};

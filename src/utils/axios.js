import axios from 'axios';

export const httpRequest = axios.create({
  baseURL: `http://localhost:5502`,
});

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

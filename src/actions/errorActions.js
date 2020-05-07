import { GET_ERRORS, CLEAR_ERRORS } from '../reducers/types';

const clearError = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

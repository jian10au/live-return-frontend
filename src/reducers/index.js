import { combineReducers } from 'redux';
import { authReducer } from '../reducers/authReducers';

export const rootReducer = combineReducers({
  auth: authReducer,
});

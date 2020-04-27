import { combineReducers } from 'redux';
import { userReducer } from '../reducers/userReducers';

export const rootReducer = combineReducers({
  user: userReducer,
});

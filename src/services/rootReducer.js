import { combineReducers } from 'redux';

import { auth } from './users/reducers/auth';
import { signup } from './users/reducers/signup';

const rootReducer = combineReducers({
  auth,
  signup
});

export default rootReducer;

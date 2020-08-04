import { combineReducers } from 'redux';

import { auth } from './users/reducers/auth';
import { signup } from './users/reducers/signup';
import { createChallenge, getChallenges, getMyChallenges } from './challenges/reducer';
import uploadsReducer from './uploads/reducers';

const rootReducer = combineReducers({
  auth,
  signup,
  createChallenge,
  getChallenges,
  getMyChallenges,
  uploads: uploadsReducer
});

export default rootReducer;

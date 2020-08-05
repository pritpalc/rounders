import { combineReducers } from 'redux';

import { auth } from './users/reducers/auth';
import { signup } from './users/reducers/signup';
import { searchUsers } from './users/reducers/searchUsers';
import { createChallenge, getChallenges, getMyChallenges } from './challenges/reducer';

const rootReducer = combineReducers({
  auth,
  signup,
  createChallenge,
  getChallenges,
  getMyChallenges,
  searchUsers
});

export default rootReducer;

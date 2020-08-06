import { combineReducers } from 'redux';

import { auth } from './users/reducers/auth';
import { signup } from './users/reducers/signup';
import { searchUsers } from './users/reducers/searchUsers';
import { createChallenge, getChallenges, getMyChallenges, getChallenge } from './challenges/reducer';

const rootReducer = combineReducers({
  auth,
  signup,
  createChallenge,
  getChallenges,
  getMyChallenges,
  getChallenge,
  searchUsers
});

export default rootReducer;

import { combineReducers } from 'redux';

import { auth } from './users/reducers/auth';
import { signup } from './users/reducers/signup';
import { createChallenge, getChallenges, getChallengesForUser } from './challenges/reducer';

const rootReducer = combineReducers({
  auth,
  signup,
  createChallenge,
  getChallenges,
  getChallengesForUser
});

export default rootReducer;

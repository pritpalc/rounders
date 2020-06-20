import { combineReducers } from 'redux';

import { auth } from './users/reducers/auth';
import { signup } from './users/reducers/signup';
import { createChallenge } from './challenges/reducers/createChallenge';
import { getChallenges } from './challenges/reducers/getChallenges';

const rootReducer = combineReducers({
  auth,
  signup,
  createChallenge,
  getChallenges
});

export default rootReducer;

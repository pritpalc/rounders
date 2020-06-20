import { constants } from './constants';

function createChallenge(songs) {
  return (dispatch) => {
    dispatch(success({ songs }));
  };

  function request() { return { type: constants.CREATE_CHALLENGE_REQUEST } }
  function success(songs) { return { type: constants.CREATE_CHALLENGE_SUCCESS, songs } }
  function failure(error) { return { type: constants.CREATE_CHALLENGE_FAILURE, error } }
}

// TODO: change when calling API
function getChallenges(songs) {
  return (dispatch) => {
    dispatch(success(songs));
  };

  function request() { return { type: constants.CHALLENGES_REQUEST } }
  function success(songs) { return { type: constants.CHALLENGES_SUCCESS, songs } }
  function failure(error) { return { type: constants.CHALLENGES_FAILURE, error } }
}

export const challengeActions = {
  createChallenge,
  getChallenges
};

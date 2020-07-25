import { constants } from './constants';
import { challengeServices } from './api';

function createChallenge(songs, id) {
  return (dispatch) => {
    dispatch(request());

    challengeServices.createChallenge({ songs, challenger: id })
      .then(
        res => {
          dispatch(success(res));
          dispatch(getChallenges());
        },
        err => dispatch(failure(err))
      );
  };

  function request() { return { type: constants.CREATE_CHALLENGE_REQUEST } }
  function success(res) { return { type: constants.CREATE_CHALLENGE_SUCCESS, res } }
  function failure(error) { return { type: constants.CREATE_CHALLENGE_FAILURE, error } }
}

function getChallenges() {
  return (dispatch) => {
    dispatch(request());

    challengeServices.getChallenges()
      .then(
        res => dispatch(success(res)),
        err => dispatch(failure(err))
      );
  };

  function request() { return { type: constants.CHALLENGES_REQUEST } }
  function success(res) { return { type: constants.CHALLENGES_SUCCESS, res } }
  function failure(error) { return { type: constants.CHALLENGES_FAILURE, error } }
}

function acceptChallenge() {
  return (dispatch) => {
    dispatch(request());

    challengeServices.acceptChallenge()
      .then(
        () => dispatch(success()),
        err => dispatch(failure(err))
      );
  };

  function request() { return { type: constants.ACCEPT_CHALLENGE_REQUEST } }
  function success() { return { type: constants.ACCPET_CHALLENGE_SUCCESS } }
  function failure(error) { return { type: constants.ACCPET_CHALLENGE_FAILURE, error } }
}

export const challengeActions = {
  createChallenge,
  getChallenges,
  acceptChallenge
};

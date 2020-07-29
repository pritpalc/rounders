import { constants } from './constants';
import { challengeServices } from './api';

function getChallenges(token) {
  return (dispatch) => {
    dispatch({ type: constants.CHALLENGES_REQUEST });

    challengeServices.getChallenges(token)
      .then(response => {
        dispatch({ type: constants.CHALLENGES_SUCCESS, response });
      })
      .catch(error => {
        dispatch({ type: constants.CHALLENGES_FAILURE, error });
      });
  };
}

function createChallenge(songs, id) {
  return (dispatch) => {
    dispatch(request());

    const trackOptions = [
      {
        "artistName": songs[0].split(" - ")[0],
        "trackName": songs[0].split(" - ")[1]
      },
      {
        "artistName": songs[1].split(" - ")[0],
        "trackName": songs[1].split(" - ")[1]
      }
    ]

    challengeServices.createChallenge({ trackOptions: trackOptions, challengedTo: id })
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


function getChallengesForUser(id) {
  return (dispatch) => {
    dispatch(request());

    challengeServices.getChallengesForUser()
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
  getChallengesForUser,
  acceptChallenge
};

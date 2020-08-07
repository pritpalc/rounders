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

function createChallenge(songs, id, token) {
  return (dispatch) => {
    dispatch(request());

    const trackOptions = [];
    songs.forEach(song => {
      const tokens = song.split("-");
      trackOptions.push({
        artistName: tokens[0],
        trackName: tokens[1]
      })
    });

    challengeServices.createChallenge({ trackOptions, challengedTo: id }, token)
      .then(
        res => {
          dispatch(success(res));
          dispatch(getChallenges(token));
        },
        err => dispatch(failure(err))
      );
  };

  function request() { return { type: constants.CREATE_CHALLENGE_REQUEST } }
  function success(res) { return { type: constants.CREATE_CHALLENGE_SUCCESS, res } }
  function failure(error) { return { type: constants.CREATE_CHALLENGE_FAILURE, error } }
}


function getMyChallenges(token) {
  return (dispatch) => {
    dispatch(request());

    challengeServices.getMyChallenges(token)
      .then(
        res => dispatch(success(res)),
        err => dispatch(failure(err))
      );
  };

  function request() { return { type: constants.CHALLENGES_REQUEST } }
  function success(res) { return { type: constants.CHALLENGES_SUCCESS, res } }
  function failure(error) { return { type: constants.CHALLENGES_FAILURE, error } }
}

function getChallenge(id, token) {
  return (dispatch) => {
    dispatch(request());

    challengeServices.getChallenge(id, token)
      .then(
        res => dispatch(success(res)),
        err => dispatch(failure(err))
      );
  };

  function request() { return { type: constants.GET_CHALLENGE_REQUEST } }
  function success(res) { return { type: constants.GET_CHALLENGE_SUCCESS, res } }
  function failure(error) { return { type: constants.GET_CHALLENGE_FAILURE, error } }
}

function acceptChallenge(id, track, token) {
  return (dispatch) => {
    dispatch(request());

    challengeServices.acceptChallenge(id, track, token)
      .then(
        () => dispatch(success()),
        err => dispatch(failure(err))
      );
  };

  function request() { return { type: constants.ACCEPT_CHALLENGE_REQUEST } }
  function success() { return { type: constants.ACCPET_CHALLENGE_SUCCESS } }
  function failure(error) { return { type: constants.ACCPET_CHALLENGE_FAILURE, error } }
}

function submitChallenge(id, submissionUri, token) {
  return (dispatch) => {
    dispatch(request());

    challengeServices.submitChallenge(id, submissionUri, token)
      .then(
        response => dispatch(success(response)),
        err => dispatch(failure(err))
      );
  };

  function request() { return { type: constants.SUBMIT_CHALLENGE_REQUEST } }
  function success(response) { return { type: constants.SUBMIT_CHALLENGE_SUCCESS, response } }
  function failure(error) { return { type: constants.SUBMIT_CHALLENGE_FAILURE, error } }
}

function voteChallenge(challengeId, userId, token) {
  return (dispatch) => {
    dispatch(request());

    challengeServices.voteChallenge(challengeId, userId, token)
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
  getMyChallenges,
  acceptChallenge,
  submitChallenge,
  getChallenge,
  voteChallenge
};

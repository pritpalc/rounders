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
  getMyChallenges,
  acceptChallenge
};

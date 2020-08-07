import { constants } from './constants';
import { STATUS } from '../utils/reducers';


export const getChallenges = (state = {}, action) => {
  switch (action.type) {
    case constants.CHALLENGES_REQUEST:
      return {
        status: STATUS.request
      };
    case constants.CHALLENGES_SUCCESS:
      return {
        data: action.response,
        status: STATUS.success
      };
    case constants.CHALLENGES_FAILURE:
      return {
        status: STATUS.failed
      };
    default:
      return state;
  }
};

export const getMyChallenges = (state = {}, action) => {
  switch (action.type) {
    case constants.CHALLENGES_REQUEST:
      return {
        status: STATUS.request
      };
    case constants.CHALLENGES_SUCCESS:
      return {
        data: action.res,
        status: STATUS.success
      };
    case constants.CHALLENGES_FAILURE:
      return {
        status: STATUS.failed
      };
    default:
      return state;
  }
};

export const getChallenge = (state = {}, action) => {
  switch (action.type) {
    case constants.GET_CHALLENGE_REQUEST:
      console.log("setting staustus to request");
      return {
        status: STATUS.request
      };
    case constants.GET_CHALLENGE_SUCCESS:
      return {
        data: action.res,
        status: STATUS.success
      };
    case constants.GET_CHALLENGE_FAILURE:
      return {
        status: STATUS.failed
      };
    default:
      return state;
  }
};

export const createChallenge = (state = {}, action) => {
  switch (action.type) {
    case constants.CREATE_CHALLENGE_REQUEST:
      return {
        status: STATUS.request
      };
    case constants.CREATE_CHALLENGE_SUCCESS:
      return {
        data: action.res,
        status: STATUS.success
      };
    case constants.CREATE_CHALLENGE_FAILURE:
      return {
        status: STATUS.failed
      };
    default:
      return state;
  }
};

export const acceptChallenge = (state = {}, action) => {
  switch (action.type) {
    case constants.ACCEPT_CHALLENGE_REQUEST:
      return {
        status: STATUS.request
      };
    case constants.ACCPET_CHALLENGE_SUCCESS:
      return {
        data: action.res,
        status: STATUS.success
      };
    case constants.ACCPET_CHALLENGE_FAILURE:
      return {
        status: STATUS.failed
      };
    default:
      return state;
  }
};

export const voteChallenge = (state = {}, action) => {
  switch (action.type) {
    case constants.VOTE_CHALLENGE_REQUEST:
      return {
        status: STATUS.request
      };
    case constants.VOTE_CHALLENGE_SUCCESS:
      return {
        data: action.res,
        status: STATUS.success
      };
    case constants.VOTE_CHALLENGE_FAILURE:
      return {
        status: STATUS.failed
      };
    default:
      return state;
  }
};
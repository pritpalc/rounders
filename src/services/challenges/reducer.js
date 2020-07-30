import { constants } from './constants';

export const STATUS = {
  request: 'requesting',
  success: 'success',
  failed: 'failed'
};

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
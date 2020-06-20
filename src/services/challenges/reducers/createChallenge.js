import { constants } from '../constants';

export const createChallenge = (state = {}, action) => {
  switch (action.type) {
    case constants.CREATE_CHALLENGE_REQUEST:
      return {
        requesting: true
      };
    case constants.CREATE_CHALLENGE_SUCCESS:
      return {
        succeeded: true
      };
    case constants.CREATE_CHALLENGE_FAILURE:
      return {
        failed: true
      };
    default:
      return state;
  }
};

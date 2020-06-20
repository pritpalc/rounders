import { constants } from '../constants';

export const signup = (state = {}, action) => {
  switch (action.type) {
    case constants.SIGNUP_REQUEST:
      return {
        requesting: true
      };
    case constants.SIGNUP_SUCCESS:
      return {
        succeeded: true
      };
    case constants.SIGNUP_FAILURE:
      return {
        failed: true
      };
    default:
      return state;
  }
};

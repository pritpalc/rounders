import { constants } from '../constants';
import { SESSION_LS_KEY } from '../../utils/api';

let user = localStorage.getItem(SESSION_LS_KEY);
user = user ? JSON.parse(user) : {};
const initialState = Object.keys(user).length > 0 && user.token ? { ...user } : {};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        requesting: true,
      };
    case constants.LOGIN_SUCCESS:
      return {
        succeeded: true,
        ...action.user,
      };
    case constants.LOGIN_FAILURE:
      return {
        failed: true
      };
    case constants.LOGOUT:
      return {};
    default:
      return state;
  }
};

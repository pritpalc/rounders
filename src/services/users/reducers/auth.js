import { constants } from '../constants';

let user = localStorage.getItem("user");
user = user ? JSON.parse(user) : {};
const initialState = Object.keys(user).length > 0 && user.token ? { loggedIn: true, ...user } : {};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGIN_REQUEST:
      return {
        requesting: true,
      };
    case constants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        succeeded: true,
        ...action.user,
      };
    case constants.LOGIN_FAILURE:
      return {
        failed: true
      };
    case constants.LOGOUT:
      return {
        loggedIn: false
      };
    default:
      return state;
  }
};

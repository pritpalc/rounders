import { userServices } from './api';
import { constants } from './constants';

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));

    userServices.login(email, password)
      .then(
        (user) => {
          dispatch(success(user));
        },
        (error) => {
          dispatch(failure(error.toString()));
        }
      );
  };

  function request(user) { return { type: constants.LOGIN_REQUEST, user } }
  function success(user) { return { type: constants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: constants.LOGIN_FAILURE, error } }
}

function signup(user) {
  return (dispatch) => {
    user.email = user.email.toLowerCase();
    dispatch(request(user));

    userServices.signup(user)
      .then(
        (user) => {
          dispatch(success(user));
          dispatch({ type: constants.SIGNUP_SUCCESS });
        },
        (error) => {
          dispatch(failure(error.toString()));
        }
      );
  };

  function request(user) { return { type: constants.SIGNUP_REQUEST, user: user } }
  function success(user) { return { type: constants.LOGIN_SUCCESS, user: user } }
  function failure(error) { return { type: constants.SIGNUP_FAILURE, error } }
}

function logout() {
  userServices.logout();

  return { type: constants.LOGOUT };
}

export const userActions = {
  login,
  signup,
  logout
};

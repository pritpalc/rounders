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

function getUsers(user, token) {
  return (dispatch) => {
    dispatch(request());

    userServices.getUsers(user, token)
      .then(
        res => dispatch(success(res)),
        err => dispatch(failure(err))
      );
  };

  function request() { return { type: constants.SEARCH_REQUEST } }
  function success(res) { return { type: constants.SEARCH_SUCCESS, res } }
  function failure(error) { return { type: constants.SEARCH_FAILURE, error } }
}

export const userActions = {
  login,
  signup,
  logout,
  getUsers
};

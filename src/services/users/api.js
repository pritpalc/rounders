import {
  BASE_API,
  handleResponse,
  SESSION_LS_KEY
} from '../utils/api';

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${BASE_API}/users/auth`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem(SESSION_LS_KEY, JSON.stringify(user));
      return user;
    });
}

function signup(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${BASE_API}/users`, requestOptions)
    .then(handleResponse);
}

function logout() {
  localStorage.removeItem(SESSION_LS_KEY);
}

function getUsers(user, token) {
  const requestOptions = {
    method: "GET",
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     },
  };

  const query = user

  return fetch(`${BASE_API}/users/search/${query}`, requestOptions)
    .then(handleResponse);
}

export const userServices = {
  login,
  signup,
  logout,
  getUsers
};

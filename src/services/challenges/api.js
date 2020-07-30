import { BASE_API, handleResponse } from '../utils/api';

// Get challenges; token provided is for providing authentication in the backend
function getChallenges(token) {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  };

  return fetch(`${BASE_API}/challenges`, options)
    .then(handleResponse);
}

export function getMyChallenges(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  };

  return fetch(`${BASE_API}/challenges/me`, requestOptions)
    .then(handleResponse);
}

export function createChallenge(challenge, token) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(challenge)
  };

  return fetch(`${BASE_API}/challenges`, requestOptions)
    .then(handleResponse);
}

export function acceptChallenge(id) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  };

  return fetch(`${BASE_API}/challenges/${id}/accept`, requestOptions)
    .then(handleResponse);
}

export const challengeServices = {
  getChallenges,
  getMyChallenges,
  createChallenge,
};
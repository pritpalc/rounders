import { BASE_API, handleResponse } from '../utils/api';

export function getChallenges() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  return fetch(`${BASE_API}challenges`, requestOptions)
    .then(handleResponse);
}

export function createChallenge(body) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  };

  return fetch(`${BASE_API}challenges`, requestOptions)
    .then(handleResponse);
}

export const challengeServices = {
  getChallenges,
  createChallenge,
};
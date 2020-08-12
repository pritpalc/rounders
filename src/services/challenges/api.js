import { BASE_API, handleResponse } from '../utils/api';

export function getChallenges() {
  console.log("getting challenges")
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  return fetch(`${BASE_API}challenges`, requestOptions)
    .then(handleResponse);
}

export function getChallengesForUser(user) {
  console.log("getting challenges for user")
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    user: user
  };

  return fetch(`${BASE_API}/challenges/me`, requestOptions)
    .then(handleResponse);
}

export function createChallenge(body, user) {
  console.log("CREATING CHALLENGE")
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: 'include'
  };

  console.log("HERES THE REQUEST OPTIONS")
  console.log(requestOptions)

  return fetch(`${BASE_API}/challenges`, requestOptions)
    .then(handleResponse)
    .then((challenge) => {
      return challenge
    });
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
  getChallengesForUser,
  createChallenge,
};
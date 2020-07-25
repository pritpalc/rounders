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

  return fetch(`${BASE_API}challenges/me`, requestOptions)
    .then(handleResponse);
}

export function createChallenge(body) {
  console.log("CREATING CHALLENGE")
  console.log(body)
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

export function acceptChallenge(id) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  };

  return fetch(`${BASE_API}challenges/${id}/accept`, requestOptions)
    .then(handleResponse);
}

export const challengeServices = {
  getChallenges,
  getChallengesForUser,
  createChallenge,
};
const BASE_API = "http://localhost:9000/"

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

function handleResponse(res) {
  return res.text()
    .then(text => text && JSON.parse(text))
    .catch(err => console.log(err));
}

export const challengeServices = {
  getChallenges,
  createChallenge,
};
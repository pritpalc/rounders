import { BASE_API, handleResponse } from '../utils/api';

function postUploads(video, token) {
  const data = new FormData();
  data.append("file", video.file, video.name);
  const options = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: data
  };

  return fetch(`${BASE_API}/uploads`, options)
    .then(handleResponse);
}

export const uploadsServices = {
  postUploads
}
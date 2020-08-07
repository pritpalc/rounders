export const BASE_API = process.env.REACT_APP_BASE_API;
export const SESSION_LS_KEY = "user";

export function handleResponse(response) {
  return response.text().then((text) => {
    let data;
    if (!response.ok) {
      data = text && JSON.parse(text);
      const error = (data && data.message) || (data && data.meta && data.meta.message) || response.statusText;

      return Promise.reject(error);
    } else {
      data = text && JSON.parse(text);
    }

    return data;
  });
}
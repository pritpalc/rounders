function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  return fetch(`#`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function signup(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`#`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function handleResponse(response) {
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

export const userServices = {
  login,
  signup,
  logout
};

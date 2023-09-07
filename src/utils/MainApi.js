export const BASE_URL = 'https://api.movie-hunter.nomoreparties.sbs';

const request = (url, options) => {
  return fetch(`${BASE_URL}/${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://movie-hunter.nomoreparties.sbs',
    },
  }).then(getResponse);
};

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export const register = ({ email, password, name }) => {
  return request('signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
};

export const login = ({ email, password }) => {
  return request('signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const checkTokenValidity = () => {
  return request('users/me', {
    method: 'GET',
  });
};

export const signout = () => {
  return request('signout', {
    method: 'GET',
  });
};

export const updateProfileData = ({ email, name }) => {
  return request('users/me', {
    method: 'PATCH',
    body: JSON.stringify({ email, name }),
  });
};

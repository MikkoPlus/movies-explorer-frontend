const DATA_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const BASE_URL = 'https://api.movie-hunter.nomoreparties.sbs/movies';

const request = (url, options) => {
  return fetch(`${url}`, {
    ...options,
  }).then(getResponse);
};

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export const getMovies = () => {
  return request(DATA_BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getUserMovies = () => {
  return request(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://movie-hunter.nomoreparties.sbs/',
    },
    credentials: 'include',
  });
};

export const createMovie = (body) => {
  return request(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://movie-hunter.nomoreparties.sbs/',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });
};

export const deleteMovie = (id) => {
  return request(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://movie-hunter.nomoreparties.sbs/',
    },
    credentials: 'include',
  });
};

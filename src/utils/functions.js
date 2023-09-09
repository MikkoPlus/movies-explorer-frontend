import { shortFilmDuration, devicesWidth } from './constants';

function filterMovieByQuery(movieList, query) {
  const moviesArr = [];
  let req = query?.toLowerCase();

  movieList?.map((movie) => {
    const { nameRU, nameEN } = movie;

    if (
      nameRU.toLowerCase().includes(req) ||
      nameEN.toLowerCase().includes(req)
    ) {
      moviesArr.push(movie);
    }
    return moviesArr;
  });
  return moviesArr;
}

function filterMovieByDuration(movieList) {
  const moviesArr = [];

  movieList?.map((movie) => {
    const { duration } = movie;
    if (Number(duration) <= shortFilmDuration) {
      moviesArr.push(movie);
    }
    return moviesArr;
  });
  return moviesArr;
}

function filterMovieListByQuery(movieList, query, isShortFilm) {
  let filtredMovies = [];

  filtredMovies = filterMovieByQuery(movieList, query);
  if (isShortFilm) {
    filtredMovies = filterMovieByDuration(filtredMovies);
  }

  return filtredMovies;
}

function filterMoviesAfterDelete(movieList, id) {
  return movieList.filter((movie) => movie.movieId !== id);
}

function screenWidthQualifer(deviceState) {
  if (window.innerWidth < devicesWidth.mobile) {
    deviceState('mobile');
  } else if (
    window.innerWidth > devicesWidth.mobile &&
    window.innerWidth < devicesWidth.tabet
  ) {
    deviceState('tablet');
  } else {
    deviceState('desktop');
  }
}

const filteredFilmsFunctions = {
  filterMovieByDuration,
  filterMovieByQuery,
  filterMovieListByQuery,
  filterMoviesAfterDelete,
};

const appFunctions = {
  filteredFilmsFunctions,
  screenWidthQualifer,
};

export default appFunctions;

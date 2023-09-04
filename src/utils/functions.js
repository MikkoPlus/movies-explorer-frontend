function filterMovieByQuery(movieList, query) {
  const moviesArr = [];
  let req = query.toLowerCase();

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
    if (Number(duration) <= 40) {
      moviesArr.push(movie);
    }
    return moviesArr;
  });
  return moviesArr;
}

const filteredFilmsFunctions = {
  filterMovieByDuration,
  filterMovieByQuery,
};

export default filteredFilmsFunctions;

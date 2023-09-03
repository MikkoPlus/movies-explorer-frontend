import { useContext, useState, useEffect } from 'react';
import { ApiSubmitFormContext } from '../../contexts/ApiSubmitFormContext';

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import Delimeter from '../../components/singleComponents/Delimeter/Delimeter';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';

import './SavedMovies.css';

function SavedMovies({
  movies,
  isFilmNotFound,
  handleDeleteMovie,
  isFilmAdded,
  changeDurationSearchQuery,
  isShortFilm,
  handleSearchMovies,
}) {
  const { isLoading } = useContext(ApiSubmitFormContext);
  const [moviesInView, setMoviesInView] = useState([]);
  const [previousQueryText, setPreviousQueryText] = useState('');

  useEffect(() => {
    setMoviesInView(movies);
  }, [movies, isFilmAdded]);

  useEffect(() => {
    const previousQuery = JSON.parse(
      localStorage.getItem('savedMovieQueryData')
    );
    if (previousQuery) {
      setPreviousQueryText(previousQuery.query);
    }
  }, []);

  return (
    <div className='saved-movies'>
      <Header />
      <main className='main'>
        <SearchForm
          searchMovieHandler={handleSearchMovies}
          changeDurationSearchQuery={changeDurationSearchQuery}
          isShortFilm={isShortFilm}
          previousQueryText={previousQueryText}
        />
        <Delimeter />
        <MoviesCardList
          movieList={moviesInView}
          isLoading={isLoading}
          isFilmNotFound={isFilmNotFound}
          handleCardButtonClick={handleDeleteMovie}
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;

import { useContext, useState, useEffect } from 'react';
import { ApiSubmitFormContext } from '../../contexts/ApiSubmitFormContext';

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import Delimeter from '../../components/singleComponents/Delimeter/Delimeter';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';

import './Movies.css';

function Movies({
  movies,
  handleSearchMovies,
  changeDurationSearchQuery,
  isShortFilm,
  isFilmNotFound,
  handleSaveFilm,
  filmServiceAreNotAvalible,
}) {
  const { isLoading } = useContext(ApiSubmitFormContext);
  const [moviesInView, setMoviesInView] = useState([]);
  const [previousQueryText, setPreviousQueryText] = useState('');
  const [movieIndex, setMovieIndex] = useState(Number);
  const [isButtonVisible, setIsButtonVisible] = useState(Boolean);

  function createInitialMoviesInView(movieList, count) {
    const moviesArr = [];
    for (let i = 0; i < count; i++) {
      if (i > movieList.length) {
        return;
      }
      moviesArr.push(movieList[i]);
    }
    return moviesArr;
  }

  function onButtonClick() {
    switch (movies.length - movieIndex) {
      case 2:
        setMovieIndex(movieIndex + 2);
        setIsButtonVisible(false);
        return;
      case 1:
        setMovieIndex(movieIndex + 1);
        setIsButtonVisible(false);
        return;
      case 0: {
        setIsButtonVisible(false);
        return;
      }
      default:
        setMovieIndex(movieIndex + 3);
    }
  }

  useEffect(() => {
    if (movies.length > 0) {
      if (movies.length > 12) {
        setMovieIndex(12);
        setIsButtonVisible(true);
      } else {
        setMovieIndex(movies.length);
        setIsButtonVisible(false);
      }
      const initialMovies = createInitialMoviesInView(movies, movieIndex);
      setMoviesInView(initialMovies);
    } else {
      setMoviesInView([]);
    }
  }, [movies]);

  useEffect(() => {
    const additionalMovies = createInitialMoviesInView(movies, movieIndex);
    setMoviesInView(additionalMovies);
  }, [movieIndex]);

  useEffect(() => {
    const previousQuery = JSON.parse(localStorage.getItem('movieQueryData'));
    if (previousQuery) {
      setPreviousQueryText(previousQuery.query);
    }
  }, []);

  return (
    <div className='movies'>
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
          isButtonVisible={isButtonVisible}
          isLoading={isLoading}
          handleAddButtonClick={onButtonClick}
          isFilmNotFound={isFilmNotFound}
          handleCardButtonClick={handleSaveFilm}
          filmServiceAreNotAvalible={filmServiceAreNotAvalible}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;

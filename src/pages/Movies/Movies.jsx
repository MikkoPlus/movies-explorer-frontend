import { useState, useEffect } from 'react';

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import Delimeter from '../../components/singleComponents/Delimeter/Delimeter';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import { useWindowWidthEventListener } from '../../hooks/useWindowWidthEventListener';
import { widthIndexes } from '../../utils/constants';
import appFunctions from '../../utils/functions';

import './Movies.css';

function Movies({
  movies,
  handleSearchMovies,
  changeDurationSearchQuery,
  isShortFilm,
  isFilmNotFound,
  handleSaveFilm,
  filmServiceAreNotAvalible,
  isSearchFormEmpty,
  onLikedButtonClick,
  isLoading,
  checkIsFavoriteMovie,
}) {
  const [moviesInView, setMoviesInView] = useState([]);
  const [previousQueryText, setPreviousQueryText] = useState('');
  const [movieIndex, setMovieIndex] = useState(Number);
  const [isButtonVisible, setIsButtonVisible] = useState(Boolean);
  const [device, setDevice] = useState('');
  const { mobile, tablet, desktop } = widthIndexes;

  function createInitialMoviesInView(movieList, count) {
    if (!movieList || movieList === null) {
      return;
    }
    const moviesArr = [];
    for (let i = 0; i < count; i++) {
      if (i > movieList?.length) {
        return;
      }
      moviesArr.push(movieList[i]);
    }
    return moviesArr;
  }

  function onButtonClick() {
    if (device === 'desktop') {
      switch (movies?.length - movieIndex) {
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
          if (movieIndex + 3 === movies.length) {
            setIsButtonVisible(false);
          }
      }
    } else {
      switch (movies?.length - movieIndex) {
        case 1:
          setMovieIndex(movieIndex + 1);
          setIsButtonVisible(false);
          return;
        case 0: {
          setIsButtonVisible(false);
          return;
        }
        default:
          setMovieIndex(movieIndex + 2);
      }
    }
  }

  useEffect(() => {
    if (movies?.length > desktop) {
      setIsButtonVisible(true);
      whatDeviceUsed();
    } else {
      setMovieIndex(movies?.length);
      setIsButtonVisible(false);
    }
    const initialMovies = createInitialMoviesInView(movies, movieIndex);
    setMoviesInView(initialMovies);
  }, [movies, isShortFilm]);

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

  function whatDeviceUsed() {
    if (device === 'mobile') {
      setMovieIndex(mobile);
    } else if (device === 'tablet') {
      setMovieIndex(tablet);
    } else if (device === 'desktop') {
      setMovieIndex(desktop);
    }
  }

  useEffect(() => {
    whatDeviceUsed();
  }, [device]);

  useEffect(() => {
    appFunctions.screenWidthQualifer(setDevice);
  }, []);

  useWindowWidthEventListener(setDevice);

  return (
    <div className='movies'>
      <Header />
      <main className='main'>
        <SearchForm
          searchMovieHandler={handleSearchMovies}
          changeDurationSearchQuery={changeDurationSearchQuery}
          isShortFilm={isShortFilm}
          previousQueryText={previousQueryText}
          isFormValueEmpty={isSearchFormEmpty}
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
          onLikedButtonClick={onLikedButtonClick}
          checkIsFavoriteMovie={checkIsFavoriteMovie}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Movies;

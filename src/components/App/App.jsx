/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ApiSubmitFormContext } from '../../contexts/ApiSubmitFormContext';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import { useSkipFirstRender } from '../../hooks/useSkipFirstRender';

import './App.css';

import Main from '../../pages/Main/Main';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import Profile from '../../pages/Profile/Profile';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ProtectedRouteElement from '../../components/singleComponents/ProtectedRouteElement/ProtectedRouteElement';
import UnsignedRouteElement from '../../components/singleComponents/UnsignedRouteElement/UnsignedRouteElement';
import Popup from '../singleComponents/Popup/Popup';

import * as MainApi from '../../utils/MainApi.js';
import * as MoviesApi from '../../utils/MoviesApi.js';

import { errorHandler } from '../../utils/ErrorHandler.js';
import { successMessages } from '../../utils/constants';

import appFunctions from '../../utils/functions';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean);
  const [formSubmitStateData, setFormSubmitStateData] = useState({
    isLoading: false,
    isSuccess: false,
    isDenied: false,
    successMsg: '',
    errorMsg: '',
  });
  const [currentUser, setCurrentUser] = useState({});
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFilmNotFound, setIsFilmNotFound] = useState(false);
  const [filmServiceAreNotAvalible, setFilmServiceAreNotAvalible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchFormEmpty, setIsSearchFormEmpty] = useState(false);
  const [moviesInView, setMoviesInView] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
  const [isShortFilm, setIsShortFilm] = useState(Boolean);
  const [isShortFilmInSavedMovies, setIsShortFilmInSavedMovies] =
    useState(Boolean);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    successRegistered,
    successLogin,
    successLogout,
    successProfileChange,
  } = successMessages;

  const {
    filterMovieByDuration,
    filterMovieByQuery,
    filterMovieListByQuery,
    filterMoviesAfterDelete,
  } = appFunctions.filteredFilmsFunctions;

  function closePopupHandler() {
    setIsPopupOpen(false);
  }

  function resetSubmitFormStateData() {
    setFormSubmitStateData({
      isLoading: false,
      isSuccess: false,
      isDenied: false,
      successMsg: '',
      errorMsg: '',
    });
  }

  //Regiter, login, logout and check token functions

  function switchPopupVisabilityAfterSubmit() {
    setTimeout(() => {
      setIsPopupOpen(true);
    }, 300);
    setTimeout(() => {
      setIsPopupOpen(false);
    }, 1300);
  }

  function handleRegister(formValues) {
    const { email, password } = formValues;
    setFormSubmitStateData({ ...formSubmitStateData, isLoading: true });
    MainApi.register(formValues)
      .then(() => {
        setFormSubmitStateData({
          ...formSubmitStateData,
          isSuccess: true,
          successMsg: successRegistered,
        });

        setTimeout(() => {
          setIsPopupOpen(true);
        }, 300);
        setTimeout(() => {
          setIsPopupOpen(false);

          MainApi.login({ email, password })
            .then((data) => {
              if (data) {
                checkToken();
                setIsLoggedIn(true);
                navigate('/movies');
              }
            })
            .catch((err) => {
              errorHandler(err);
            });
        }, 1300);
      })
      .catch((err) => {
        errorHandler(err);
        setFormSubmitStateData({
          ...formSubmitStateData,
          isDenied: true,
          errorMsg: err.message,
        });
        switchPopupVisabilityAfterSubmit();
      })
      .finally(() => {
        setTimeout(() => {
          resetSubmitFormStateData();
        }, 2300);
      });
  }

  function handleLogin(formValues) {
    setFormSubmitStateData({ ...formSubmitStateData, isLoading: true });
    MainApi.login(formValues)
      .then((data) => {
        if (data) {
          checkToken();
          setIsLoggedIn(true);
          setFormSubmitStateData({
            ...formSubmitStateData,
            isSuccess: true,
            successMsg: successLogin,
          });
          setTimeout(() => {
            setIsPopupOpen(true);
          }, 300);
          setTimeout(() => {
            setIsPopupOpen(false);
            navigate('/movies');
          }, 1300);
        }
      })
      .catch((err) => {
        errorHandler(err);
        setFormSubmitStateData({
          ...formSubmitStateData,
          isDenied: true,
          errorMsg: err.message,
        });
        switchPopupVisabilityAfterSubmit();
      })
      .finally(() => {
        setTimeout(() => {
          resetSubmitFormStateData();
        }, 2300);
      });
  }

  function handleChangeProfileData(formValues) {
    setFormSubmitStateData({ ...formSubmitStateData, isLoading: true });
    MainApi.updateProfileData({ ...formValues, name: formValues.username })
      .then((user) => {
        setCurrentUser({ name: user.name, email: user.email });
        setFormSubmitStateData({
          ...formSubmitStateData,
          isSuccess: true,
          successMsg: successProfileChange,
        });
        setIsEditModeOn(false);
      })
      .catch((err) => {
        errorHandler(err);
        setFormSubmitStateData({
          ...formSubmitStateData,
          isDenied: true,
          errorMsg: err.message,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setIsPopupOpen(true);
        }, 300);
        setTimeout(() => {
          setIsPopupOpen(false);
          setTimeout(() => {
            resetSubmitFormStateData();
          }, 300);
        }, 2000);
      });
  }

  function handleLogOut() {
    setFormSubmitStateData({ ...formSubmitStateData, isLoading: true });
    MainApi.signout()
      .then(() => {
        localStorage.removeItem('jwt');
        setFormSubmitStateData({
          ...formSubmitStateData,
          isSuccess: true,
          successMsg: successLogout,
        });
        setTimeout(() => {
          setIsPopupOpen(true);
        }, 300);
        setTimeout(() => {
          setIsPopupOpen(false);
          setIsLoggedIn(false);
          setCurrentUser({});
          navigate('/');
          localStorage.removeItem('movieQueryData');
          localStorage.removeItem('moviesDB');
          localStorage.removeItem('lastVisit');
          setMoviesInView([]);
          setIsShortFilm(false);
        }, 1300);
      })
      .catch((err) => {
        errorHandler(err);
        setFormSubmitStateData({
          ...formSubmitStateData,
          isDenied: true,
          errorMsg: err.message,
        });
        setTimeout(() => {
          setIsPopupOpen(true);
        }, 300);
        setTimeout(() => {
          setIsPopupOpen(false);
          setTimeout(() => {
            resetSubmitFormStateData();
          }, 300);
        }, 1300);
      })
      .finally(() => {
        setTimeout(() => {
          resetSubmitFormStateData();
        }, 2300);
      });
  }

  function checkToken() {
    MainApi.checkTokenValidity()
      .then((data) => {
        setCurrentUser({
          name: data.name,
          email: data.email,
        });
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }

  // Movies api
  function searchMoviesAndSetToState(
    movieList,
    query,
    isShortFilm,
    setFilmsState
  ) {
    setIsFilmNotFound(false);

    const filtredMovies = filterMovieListByQuery(movieList, query, isShortFilm);

    if (filtredMovies.every((item) => item === false)) {
      setIsFilmNotFound(true);
    } else {
      localStorage.setItem(
        'movieQueryData',
        JSON.stringify({
          isInputChecked: isShortFilm,
          query: query,
          films: filterMovieByQuery(movieList, query),
        })
      );
      setFilmsState(filtredMovies);
    }
  }
  function getFavoriteMovies() {
    MoviesApi.getUserMovies()
      .then((movies) => {
        const savedMovies = [];

        movies.forEach((movie) => {
          const imagePath = movie.image.split(
            'https://api.nomoreparties.co/beatfilm-movies/' ||
              'https://api.nomoreparties.co/'
          );
          savedMovies.push({
            ...movie,
            id: movie.movieId,
            image: imagePath[1],
          });
        });

        setFavoriteMoviesList(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCheckIsFilmFavorite(filmId) {
    return favoriteMoviesList.some((film) => film.movieId === filmId);
  }

  function searchInFavoriteMovies(query) {
    const { text } = query;
    setIsSearchFormEmpty(false);
    if (text === '') {
      setIsSearchFormEmpty(true);
      return;
    }

    setIsFilmNotFound(false);
    const filtredMovies = filterMovieListByQuery(
      favoriteMoviesList,
      text,
      isShortFilmInSavedMovies
    );
    if (filtredMovies.every((item) => item === false)) {
      setIsFilmNotFound(true);
    }
    setFavoriteMovies(filtredMovies);
  }

  function searchFilmHandler(query) {
    setFilmServiceAreNotAvalible(false);
    setIsSearchFormEmpty(false);
    const { text } = query;
    if (text === '') {
      setIsSearchFormEmpty(true);
      return;
    }

    const moviesDataBase = localStorage.getItem('moviesDB');
    if (!moviesDataBase) {
      setIsLoading(true);
      MoviesApi.getMovies()
        .then((data) => {
          localStorage.setItem('moviesDB', JSON.stringify(data));
          searchMoviesAndSetToState(data, text, isShortFilm, setMoviesInView);
        })
        .catch((err) => {
          errorHandler(err);
          setFilmServiceAreNotAvalible(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      searchMoviesAndSetToState(
        JSON.parse(moviesDataBase),
        text,
        isShortFilm,
        setMoviesInView
      );
    }
  }

  function handleSaveMove(id) {
    const currentMovie = moviesInView?.find((movie) => movie.id === id);
    if (handleCheckIsFilmFavorite(id) || currentMovie === undefined) {
      return;
    }

    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
    } = currentMovie;

    MoviesApi.createMovie({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: `https://api.nomoreparties.co/${image.url}`,
      trailerLink: trailerLink,
      thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
      movieId: id,
      nameEN: nameEN,
      nameRU: nameRU,
    })
      .then((movie) => {
        setFavoriteMoviesList([...favoriteMoviesList, movie]);
      })
      .catch((err) => {
        errorHandler(err);
      });
  }

  function handleDeleteMovie(id) {
    if (!id) {
      return;
    }
    const movieId = favoriteMoviesList.filter(
      (movie) => movie.movieId === id
    )[0];

    setTimeout(() => {
      MoviesApi.deleteMovie(movieId?._id)
        .then(() => {
          setFavoriteMoviesList(
            filterMoviesAfterDelete(favoriteMoviesList, id)
          );
          setFavoriteMovies(filterMoviesAfterDelete(favoriteMovies, id));
        })
        .catch((err) => {
          errorHandler(err);
        });
    }, 100);
  }

  useSkipFirstRender(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getFavoriteMovies();
      setIsFilmNotFound(false);
      setIsSearchFormEmpty(false);
      if (location.pathname === '/movies') {
        const searchQueryData = JSON.parse(
          localStorage.getItem('movieQueryData')
        );
        setIsShortFilmInSavedMovies(false);
        if (searchQueryData) {
          setIsShortFilm(searchQueryData.isInputChecked);
          if (searchQueryData.isInputChecked) {
            setMoviesInView(filterMovieByDuration(searchQueryData.films));
          } else {
            setMoviesInView(searchQueryData.films);
          }
        }
      }
    }
  }, [location.pathname, isLoggedIn]);

  useSkipFirstRender(() => {
    const movieQueryData = JSON.parse(localStorage.getItem('movieQueryData'));

    if (isShortFilm) {
      localStorage.setItem(
        'movieQueryData',
        JSON.stringify({
          ...movieQueryData,
          isInputChecked: true,
        })
      );
      const sortedMovies = filterMovieByDuration(moviesInView);
      if (sortedMovies.length !== 0) {
        setIsFilmNotFound(false);
        setMoviesInView(sortedMovies);
      } else {
        setIsFilmNotFound(true);
      }
    } else {
      localStorage.setItem(
        'movieQueryData',
        JSON.stringify({
          ...movieQueryData,
          isInputChecked: false,
        })
      );
      setIsFilmNotFound(false);
      setMoviesInView(movieQueryData?.films);
    }

    if (isShortFilmInSavedMovies) {
      const sortedMovies = filterMovieByDuration(favoriteMoviesList);
      if (sortedMovies.length !== 0) {
        setIsFilmNotFound(false);
        setFavoriteMovies(sortedMovies);
      } else {
        setIsFilmNotFound(true);
      }
    } else {
      if (favoriteMoviesList.length !== 0) {
        setIsFilmNotFound(false);
        setFavoriteMovies(favoriteMoviesList);
      } else {
        setIsFilmNotFound(true);
        setFavoriteMovies(favoriteMoviesList);
      }
    }
  }, [isShortFilm, isShortFilmInSavedMovies]);

  useEffect(() => {
    checkToken();
  }, [isLoggedIn]);

  useEffect(() => {
    checkToken();

    const { pathname } = location;
    if (isLoggedIn) {
      if (pathname === '/movies') {
        localStorage.setItem('lastVisit', '/movies');
      }
      if (pathname === '/saved-movies') {
        localStorage.setItem('lastVisit', '/saved-movies');
      }
      if (pathname === '/profile') {
        localStorage.setItem('lastVisit', '/profile');
      }
      MoviesApi.getUserMovies().then((data) => {
        setFavoriteMovies(data);
      });
    }
  }, [location.pathname, isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ApiSubmitFormContext.Provider value={formSubmitStateData}>
        <LoggedInContext.Provider value={isLoggedIn}>
          <div className='app'>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route
                path='/movies'
                element={
                  <ProtectedRouteElement
                    element={Movies}
                    movies={moviesInView}
                    handleSearchMovies={searchFilmHandler}
                    changeDurationSearchQuery={setIsShortFilm}
                    isShortFilm={isShortFilm}
                    isFilmNotFound={isFilmNotFound}
                    handleSaveFilm={handleSaveMove}
                    filmServiceAreNotAvalible={filmServiceAreNotAvalible}
                    isSearchFormEmpty={isSearchFormEmpty}
                    onLikedButtonClick={handleDeleteMovie}
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    checkIsFavoriteMovie={handleCheckIsFilmFavorite}
                  />
                }
              />
              <Route
                path='/saved-movies'
                element={
                  <ProtectedRouteElement
                    element={SavedMovies}
                    movies={favoriteMovies}
                    handleSearchMovies={searchInFavoriteMovies}
                    handleDeleteMovie={handleDeleteMovie}
                    changeDurationSearchQuery={setIsShortFilmInSavedMovies}
                    isShortFilm={isShortFilmInSavedMovies}
                    filmServiceAreNotAvalible={filmServiceAreNotAvalible}
                    isSearchFormEmpty={isSearchFormEmpty}
                    isFilmNotFound={isFilmNotFound}
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path='/sign-in'
                element={
                  <UnsignedRouteElement
                    element={Login}
                    onLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path='/sign-up'
                element={
                  <UnsignedRouteElement
                    element={Register}
                    onRegister={handleRegister}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path='/profile'
                element={
                  <ProtectedRouteElement
                    element={Profile}
                    handleChangeProfile={handleChangeProfileData}
                    handleLogOut={handleLogOut}
                    switchEditMode={setIsEditModeOn}
                    isEditModeOn={isEditModeOn}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route path='/*' element={<NotFoundPage />} />
            </Routes>
            <Popup isOpen={isPopupOpen} onClose={closePopupHandler} />
          </div>
        </LoggedInContext.Provider>
      </ApiSubmitFormContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

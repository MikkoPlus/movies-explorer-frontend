/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import Popup from '../singleComponents/Popup/Popup';

import * as MainApi from '../../utils/MainApi.js';
import * as MoviesApi from '../../utils/MoviesApi.js';

import { errorHandler } from '../../utils/ErrorHandler.js';
import { successMessages } from '../../utils/constants';

import filteredFilmsFunctions from '../../utils/functions';

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
  const [isSearchFormEmpty, setIsSearchFormEmpty] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [moviesInView, setMoviesInView] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
  const [isControlBtnUsed, setIsControlBtnUsed] = useState(false);
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

  const { filterMovieByDuration, filterMovieByQuery } = filteredFilmsFunctions;

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
          setIsTokenValid(false);
          navigate('/');
          localStorage.removeItem('movieQueryData');
          localStorage.removeItem('moviesDB');
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
        setIsTokenValid(true);
      })
      .catch(() => {
        setIsTokenValid(false);
      });
  }

  // Movies api
  function checkIsFavoriteMoviesIn(movieList) {
    if (movieList === null) {
      setFilmServiceAreNotAvalible(true);
    }
    setFilmServiceAreNotAvalible(false);
    movieList?.forEach((movie) => {
      if (handleCheckIsFilmFavorite(movie.id)) {
        movie['isFavoriteMovie'] = true;
      } else {
        movie['isFavoriteMovie'] = false;
      }
      return movie;
    });
    return movieList;
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
        setFavoriteMovies(movies);
        setFavoriteMoviesList(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCheckIsFilmFavorite(filmId) {
    return favoriteMovies.some((film) => film.movieId === filmId);
  }

  function searchInFavoriteMovies(query) {
    const { text } = query;
    setIsSearchFormEmpty(false);
    if (text === '') {
      setIsSearchFormEmpty(true);
      return;
    }

    let filtredMovies = [];
    setIsFilmNotFound(false);
    setFormSubmitStateData({
      ...formSubmitStateData,
      isLoading: true,
    });
    MoviesApi.getUserMovies()
      .then((data) => {
        filtredMovies = filterMovieByQuery(data, text);
        if (isShortFilmInSavedMovies) {
          filtredMovies = filterMovieByDuration(filtredMovies);
        }

        if (filtredMovies.every((item) => item === false)) {
          setIsFilmNotFound(true);
        }
        setFavoriteMovies(filtredMovies);
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setFormSubmitStateData({
          ...formSubmitStateData,
          isLoading: false,
        });
      });
  }

  function searchFilmHandler(query) {
    setIsSearchFormEmpty(false);
    const { text } = query;
    if (text === '') {
      setIsSearchFormEmpty(true);
      return;
    }
    setMoviesInView([]);
    let filtredMovies = [];
    setIsFilmNotFound(false);
    setFormSubmitStateData({
      ...formSubmitStateData,
      isLoading: true,
    });

    const moviesDB = JSON.parse(localStorage.getItem('moviesDB'));

    filtredMovies = filterMovieByQuery(moviesDB, text);

    checkIsFavoriteMoviesIn(filtredMovies);

    localStorage.setItem(
      'movieQueryData',
      JSON.stringify({
        isInputChecked: isShortFilm,
        query: text,
        films: filtredMovies,
      })
    );

    if (isShortFilm) {
      filtredMovies = filterMovieByDuration(filtredMovies);
    }
    if (filtredMovies.every((item) => item === false)) {
      setIsFilmNotFound(true);
    } else {
      setMoviesInView(filtredMovies);
    }
    setFormSubmitStateData({
      ...formSubmitStateData,
      isLoading: false,
    });
  }

  function handleSaveMove(id) {
    setIsControlBtnUsed(true);
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
        setFavoriteMovies([...favoriteMovies, movie]);
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setIsControlBtnUsed(false);
      });
  }

  function handleDeleteMovie(id) {
    if (!id) {
      return;
    }
    const movieId = favoriteMovies.filter((movie) => movie.movieId === id)[0];

    setIsControlBtnUsed(true);

    setTimeout(() => {
      MoviesApi.deleteMovie(movieId?._id)
        .then(() => {
          const listOfFavoriteMovies = favoriteMovies.filter(
            (movie) => movie.movieId !== id
          );
          setFavoriteMovies(listOfFavoriteMovies);
        })
        .catch((err) => {
          errorHandler(err);
        })
        .finally(() => {
          setIsControlBtnUsed(false);
        });
    }, 100);
  }

  useEffect(() => {
    setMoviesInView(checkIsFavoriteMoviesIn(moviesInView));
  }, [favoriteMovies, moviesInView]);

  useEffect(() => {
    if (isLoggedIn) {
      getFavoriteMovies();
    }
  }, [isControlBtnUsed]);

  useEffect(() => {
    if (isLoggedIn) {
      getFavoriteMovies();
      setIsFilmNotFound(false);
      setIsSearchFormEmpty(false);
      if (location.pathname === '/movies') {
        const searchQueryData = JSON.parse(
          localStorage.getItem('movieQueryData')
        );
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

  useEffect(() => {
    if (isLoggedIn) {
      const moviesDataBase = localStorage.getItem('moviesDB');
      if (!moviesDataBase) {
        MoviesApi.getMovies()
          .then((data) => {
            localStorage.setItem('moviesDB', JSON.stringify(data));
          })
          .catch((err) => {
            errorHandler(err);
          });
      }
    }
  }, [isLoggedIn]);

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
      setMoviesInView(filterMovieByDuration(moviesInView));
    } else {
      localStorage.setItem(
        'movieQueryData',
        JSON.stringify({
          ...movieQueryData,
          isInputChecked: false,
        })
      );
      setMoviesInView(movieQueryData?.films);
    }

    if (isShortFilmInSavedMovies) {
      setFavoriteMovies(filterMovieByDuration(favoriteMovies));
    } else {
      setFavoriteMovies(favoriteMoviesList);
    }
  }, [isShortFilm, isShortFilmInSavedMovies]);

  useSkipFirstRender(() => {
    const { pathname } = location;

    if (!isLoggedIn) {
      if (pathname === '/sign-in' || pathname === '/sign-up') {
        navigate(pathname);
      } else if (
        pathname === '/movies' ||
        pathname === '/saved-movies' ||
        pathname === '/profile'
      ) {
        navigate('/sign-in');
      }
    } else {
      if (isTokenValid && isLoggedIn) {
        if (pathname === '/sign-in' || pathname === '/sign-up') {
          navigate('/movies');
        } else {
          navigate(pathname);
        }
      }
    }
  }, [isLoggedIn, isTokenValid]);

  useEffect(() => {
    checkToken();
    if (isTokenValid) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTokenValid, location]);

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
                  />
                }
              />
              <Route
                path='/sign-in'
                element={<Login onLogin={handleLogin} />}
              />
              <Route
                path='/sign-up'
                element={<Register onRegister={handleRegister} />}
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

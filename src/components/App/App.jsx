import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ApiSubmitFormContext } from '../../contexts/ApiSubmitFormContext';
import { LoggedInContext } from '../../contexts/LoggedInContext';

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
import NotFoundError from '../../utils/NotFoundError.js';

import * as MainApi from '../../utils/MainApi.js';
import * as MoviesApi from '../../utils/MoviesApi.js';

import { errorHandler } from '../../utils/ErrorHandler.js';
import { successMessages } from '../../utils/constants';

import filteredFilmsFunctions from '../../utils/functions';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const [isFilmNotFound, SetIsFilmNotFound] = useState(false);

  const [moviesInView, setMoviesInView] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isControlBtnUsed, setIsControlBtnUsed] = useState(false);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isShortFilmInSavedMovies, setIsShortFilmInSavedMovies] =
    useState(false);

  const navigate = useNavigate();

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
          navigate('/sign-in');
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
          localStorage.removeItem('savedMovieQueryData');
          localStorage.removeItem('savedMovies');
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
        localStorage.setItem('jwt', data.jwt);
      })
      .catch((err) => {
        errorHandler(err);
        setFormSubmitStateData({
          ...formSubmitStateData,
          isDenied: true,
          errorMsg: err.message,
        });
        switchPopupVisabilityAfterSubmit();
      });
  }

  // Movies api
  function checkIsListOfMovies(movieList) {
    let storageData = JSON.parse(localStorage.getItem('movieQueryData'));
    movieList.forEach((movie) => {
      if (handleCheckIsFilmFavorite(movie.id)) {
        movie['isFavoriteMovie'] = true;
      } else {
        movie['isFavoriteMovie'] = false;
      }
      return movie;
    });
    storageData = {
      ...storageData,
      films: moviesInView,
    };
    localStorage.setItem('movieQueryData', JSON.stringify(storageData));
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
        if (moviesInView.length > 0) {
          setMoviesInView(checkIsListOfMovies(moviesInView));
        }
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCheckIsFilmFavorite(filmId) {
    const favoriteFilms = JSON.parse(localStorage.getItem('savedMovies'));

    return favoriteFilms.some((film) => film.movieId === filmId);
  }

  function searchInFavoriteMovies(query) {
    const { text } = query;

    let filtredMovies = [];

    SetIsFilmNotFound(false);

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

        if (filtredMovies.some((movie) => movie === undefined)) {
          throw new NotFoundError();
        }

        setFavoriteMovies(filtredMovies);
        localStorage.setItem(
          'savedMovieQueryData',
          JSON.stringify({
            query: text,
            isInputChecked: isShortFilm,
            films: filtredMovies,
          })
        );
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          SetIsFilmNotFound(true);
        } else {
          errorHandler(err);
        }
      })
      .finally(() => {
        setFormSubmitStateData({
          ...formSubmitStateData,
          isLoading: false,
        });
      });
  }

  function searchFilmHandler(query) {
    const { text } = query;

    setMoviesInView([]);

    let filtredMovies = [];
    SetIsFilmNotFound(false);
    setFormSubmitStateData({
      ...formSubmitStateData,
      isLoading: true,
    });
    MoviesApi.getMovies()
      .then((data) => {
        filtredMovies = filterMovieByQuery(data, text);

        if (isShortFilm) {
          filtredMovies = filterMovieByDuration(filtredMovies);
        }

        filtredMovies.forEach((movie) => {
          if (handleCheckIsFilmFavorite(movie.id)) {
            movie['isFavoriteMovie'] = true;
          } else {
            movie['isFavoriteMovie'] = false;
          }
        });

        if (filtredMovies.length === 0) {
          throw new NotFoundError();
        }

        setMoviesInView(filtredMovies);
        localStorage.setItem(
          'movieQueryData',
          JSON.stringify({
            query: text,
            isInputChecked: isShortFilm,
            films: filtredMovies,
          })
        );
      })
      .catch((err) => {
        if (err.statusCode === 404) {
          SetIsFilmNotFound(true);
        } else {
          errorHandler(err);
        }
      })
      .finally(() => {
        setFormSubmitStateData({
          ...formSubmitStateData,
          isLoading: false,
        });
      });
  }

  function handleSaveMove(id) {
    setIsControlBtnUsed(true);
    const currentMovie = moviesInView.find((movie) => movie.id === id);
    if (
      favoriteMovies &&
      favoriteMovies.length > 0 &&
      handleCheckIsFilmFavorite(id)
    ) {
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
      .then((movies) => {
        setFavoriteMovies([...favoriteMovies, movies]);
        if (moviesInView.some((item) => item !== false)) {
          setMoviesInView(checkIsListOfMovies(moviesInView));
        }
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setIsControlBtnUsed(false);
      });
  }

  function handleDeleteMovie(id) {
    const movieId = favoriteMovies.filter((movie) => movie.movieId === id)[0];

    setIsControlBtnUsed(true);

    MoviesApi.deleteMovie(movieId._id)
      .then(() => {
        const listOfFavoriteMovies = favoriteMovies.filter(
          (movie) => movie.movieId !== id
        );
        setFavoriteMovies(listOfFavoriteMovies);

        if (moviesInView.some((item) => item !== false)) {
          setMoviesInView(checkIsListOfMovies(moviesInView));
        }
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setIsControlBtnUsed(false);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      const queryData = JSON.parse(localStorage.getItem('movieQueryData'));
      const savedMoviesQueryData = JSON.parse(
        localStorage.getItem('savedMovieQueryData')
      );
      if (queryData) {
        setIsShortFilm(queryData.isInputChecked);
        setMoviesInView(queryData.films);
      }
      if (savedMoviesQueryData) {
        setIsShortFilm(queryData.isInputChecked);
        setMoviesInView(queryData.films);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    getFavoriteMovies();
    let storageData = JSON.parse(localStorage.getItem('movieQueryData'));

    if (storageData) {
      checkIsListOfMovies(moviesInView);
      localStorage.setItem('movieQueryData', JSON.stringify(storageData));
      setMoviesInView(moviesInView);
    }
  }, [isControlBtnUsed]);

  useEffect(() => {
    const jwt = document.cookie.split('=');

    if (jwt[1]) {
      checkToken();
      setIsLoggedIn(true);
      navigate('/movies');
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    handleSearchMovies={searchFilmHandler}
                    movies={moviesInView}
                    changeDurationSearchQuery={setIsShortFilm}
                    isShortFilm={isShortFilm}
                    isFilmNotFound={isFilmNotFound}
                    handleSaveFilm={handleSaveMove}
                    isMovieAdd={isControlBtnUsed}
                    checkIsFavoriteFilm={handleCheckIsFilmFavorite}
                  />
                }
              />
              <Route
                path='/saved-movies'
                element={
                  <ProtectedRouteElement
                    element={SavedMovies}
                    movies={favoriteMovies}
                    isFilmAdded={isControlBtnUsed}
                    handleDeleteMovie={handleDeleteMovie}
                    changeDurationSearchQuery={setIsShortFilmInSavedMovies}
                    isShortFilm={isShortFilmInSavedMovies}
                    handleSearchMovies={searchInFavoriteMovies}
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

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

import * as MainApi from '../../utils/MainApi.js';
import { errorHandler } from '../../utils/ErrorHandler.js';
import { successMessages } from '../../utils/constants';

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
  const navigate = useNavigate();

  const {
    successRegistered,
    successLogin,
    successLogout,
    successProfileChange,
  } = successMessages;

  function closePopupHandler() {
    setIsPopupOpen(false);
  }

  function returnSubmitFormStateData() {
    setFormSubmitStateData({
      isLoading: false,
      isSuccess: false,
      isDenied: false,
      successMsg: '',
      errorMsg: '',
    });
  }

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
          returnSubmitFormStateData();
        }, 2300);
      });
  }

  function handleLogin(formValues) {
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
          returnSubmitFormStateData();
        }, 2300);
      });
  }

  function handleChangeProfileData(formValues) {
    MainApi.updateProfileData({ ...formValues, name: formValues.username })
      .then((user) => {
        console.log(user);
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
            returnSubmitFormStateData();
          }, 300);
        }, 2000);
      });
  }

  function handleLogOut() {
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
            returnSubmitFormStateData();
          }, 300);
        }, 1300);
      })
      .finally(() => {
        setTimeout(() => {
          returnSubmitFormStateData();
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

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
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
                element={<ProtectedRouteElement element={Movies} />}
              />
              <Route
                path='/saved-movies'
                element={<ProtectedRouteElement element={SavedMovies} />}
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

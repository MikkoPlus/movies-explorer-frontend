import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import Main from '../../pages/Main/Main';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import Profile from '../../pages/Profile/Profile';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ApiRequestLoadingContext } from '../../contexts/ApiRequestLoadingContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  function handleLogin(e) {
    console.log(1);
  }

  function handleRegister(e) {
    console.log(2);
  }

  function handleChangeProfileData(e) {
    console.log(21);
  }

  function handleLogOut(e) {
    console.log(22);
  }

  useEffect(() => {
    setCurrentUser({
      name: 'Виталий',
      email: 'pochta@yandex.ru',
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ApiRequestLoadingContext.Provider value={isLoading}>
        <div className='app'>
          <Routes>
            <Route path='/' element={<Main isLoggedIn={isLoggedIn} />} />
            <Route
              path='/movies'
              element={<Movies isLoggedIn={isLoggedIn} />}
            />
            <Route
              path='/saved-movies'
              element={<SavedMovies isLoggedIn={isLoggedIn} />}
            />
            <Route path='/signin' element={<Login onLogin={handleLogin} />} />
            <Route
              path='/signup'
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path='/profile'
              element={
                <Profile
                  handleChangeProfile={handleChangeProfileData}
                  handleLogOut={handleLogOut}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </ApiRequestLoadingContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/ico/logo.svg';
import Burger from '../singleComponents/Burger/Burger';

import './Header.css';

function Header({ isLoggedIn, isOnlyLogo }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  function switchMenuVisability() {
    setIsMenuVisible(!isMenuVisible);
  }

  return (
    <header className='header'>
      <div
        className={`header__wrapper ${
          !isOnlyLogo ? 'header__wrapper_flex' : ''
        }`}
      >
        <Link to='/'>
          <img src={logo} alt='logo' className='header__logo' />
        </Link>
        {!isOnlyLogo && (
          <Navigation isLoggedIn={isLoggedIn} isMenuVisible={isMenuVisible} />
        )}
        {isLoggedIn && (
          <Burger
            handleBurgerClick={switchMenuVisability}
            isMenuVisible={isMenuVisible}
          />
        )}
      </div>
    </header>
  );
}

export default Header;

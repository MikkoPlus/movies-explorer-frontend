import { Link } from 'react-router-dom';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import { useContext } from 'react';
import ListItem from '../singleComponents/ListItem/ListItem';
import profileIco from '../../images/ico/profile-ico.svg';

import './Navigation.css';

function Navigation({ isMenuVisible }) {
  const isLoggedIn = useContext(LoggedInContext);
  const navClassName = `navigation${isLoggedIn ? ' navigation_logged-in' : ''}`;

  return (
    <nav
      className={`${navClassName} ${isMenuVisible ? ' navigation_active' : ''}`}
    >
      <div className='navigation__wrapper'>
        {!isLoggedIn && (
          <ul className='navigation__list'>
            <ListItem
              isRedirectLink={true}
              link='/sign-up'
              text='Регистрация'
              additionalClass='navigation__sign'
              additionalLinkClass='navigation__link'
            />
            <ListItem
              isRedirectLink={true}
              link='/sign-in'
              text='Войти'
              additionalClass='navigation__sign'
              additionalLinkClass='navigation__link_button'
            />
          </ul>
        )}
        {isLoggedIn && (
          <>
            <div className='navigation__links'>
              <ul className='navigation__list'>
                <ListItem
                  isRedirectLink={true}
                  link='/'
                  text='Главная'
                  additionalClass='list-item_logged-in navigation__home'
                />
                <ListItem
                  isRedirectLink={true}
                  link='/movies'
                  text='Фильмы'
                  additionalClass='list-item_logged-in navigation__films'
                />
                <ListItem
                  isRedirectLink={true}
                  link='/saved-movies'
                  text='Сохранённые фильмы'
                  additionalClass='list-item_logged-in navigation__saved-films'
                />
              </ul>
              <Link to='/profile' className='navigation__profile'>
                <span className='navigation__profile-link'>Аккаунт</span>
                <img
                  src={profileIco}
                  alt='Профиль'
                  className='navigation__profile-ico'
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

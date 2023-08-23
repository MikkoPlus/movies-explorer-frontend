import { Link } from 'react-router-dom';

import ListItem from '../singleComponents/ListItem/ListItem';
import profileIco from '../../images/ico/profile-ico.svg';

import './Navigation.css';

function Navigation({ isLoggedIn, isMenuVisible }) {
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
              link='/signup'
              text='Регистрация'
              additionalClass='list-item__sign'
            />
            <ListItem
              isRedirectLink={true}
              link='/signin'
              text='Войти'
              additionalClass='list-item__sign list-item__sign_button'
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
                  additionalClass='list-item_logged-in list-item__home'
                />
                <ListItem
                  isRedirectLink={true}
                  link='/movies'
                  text='Фильмы'
                  additionalClass='list-item_logged-in list-item__films'
                />
                <ListItem
                  isRedirectLink={true}
                  link='/saved-movies'
                  text='Сохранённые фильмы'
                  additionalClass='list-item_logged-in list-item__saved-films'
                />
              </ul>
              <div className='navigation__profile'>
                <Link to='/profile' className='navigation__profile-link'>
                  Аккаунт
                </Link>
                <img
                  src={profileIco}
                  alt='Профиль'
                  className='navigation__profile-ico'
                />
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;

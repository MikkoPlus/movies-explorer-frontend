import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

function MoviesCard({
  isFavoriteMovie,
  title,
  duration,
  youtubeLink,
  filmId,
  imagePath,
  onCardButtonClick,
}) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  function filmDuration(min) {
    const hours = Math.floor(min / 60);
    const minutes = Math.floor(min % 60);

    return `${hours}ч ${minutes}м`;
  }

  const imgPath =
    location.pathname === '/movies'
      ? `https://api.nomoreparties.co/${imagePath}`
      : imagePath;

  return (
    <li className='movie-card'>
      <div className='movie-card__top'>
        <a
          href={youtubeLink}
          target='_blank'
          rel='noreferrer'
          className='movie-card__trailer-link'
        >
          <img src={imgPath} alt='Фильм' className='movie-card__img' />
        </a>
        <div className='movie-card__controls'>
          {!isFavoriteMovie && !isSavedMoviesPage && (
            <button
              onClick={() => onCardButtonClick(filmId)}
              className='movie-card__control movie-card__control_save'
            >
              Сохранить
            </button>
          )}
          {isFavoriteMovie && (
            <>
              {!isSavedMoviesPage && (
                <button className='movie-card__control movie-card__control_saved'>
                  &#10003;
                </button>
              )}
              {isSavedMoviesPage && (
                <button
                  onClick={() => onCardButtonClick(filmId)}
                  className='movie-card__control movie-card__control_delete'
                >
                  &times;
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className='movie-card__footer'>
        <h4 className='movie-card__title'>{title}</h4>
        <p className='movie-card__duration'>{filmDuration(duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;

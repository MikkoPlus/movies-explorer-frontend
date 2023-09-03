import { useLocation } from 'react-router-dom';
import MoviesCard from '../../components/MoviesCard/MoviesCard';
import Preloader from '../../components/Preloader/Preloader';

import './MoviesCardList.css';

function MoviesCardList({
  isButtonVisible,
  isLoading,
  movieList,
  handleAddButtonClick,
  isFilmNotFound,
  handleCardButtonClick,
}) {
  const location = useLocation();

  return (
    <section className='movies-cards'>
      {!isLoading && movieList ? (
        <>
          {!isFilmNotFound ? (
            location.pathname === '/movies' ? (
              <ul className='movies-cards__list'>
                {movieList.map((movie) => {
                  const {
                    id,
                    trailerLink,
                    image,
                    nameRU,
                    duration,
                    isFavoriteMovie,
                  } = movie;
                  return (
                    <MoviesCard
                      isFavoriteMovie={isFavoriteMovie}
                      youtubeLink={trailerLink}
                      imagePath={image.url}
                      title={nameRU}
                      duration={duration}
                      key={id}
                      filmId={id}
                      onCardButtonClick={handleCardButtonClick}
                    />
                  );
                })}
              </ul>
            ) : (
              <ul className='movies-cards__list'>
                {movieList.map((movie) => {
                  const { movieId, trailerLink, image, nameRU, duration } =
                    movie;

                  return (
                    <MoviesCard
                      isFavoriteMovie={true}
                      youtubeLink={trailerLink}
                      imagePath={image}
                      title={nameRU}
                      duration={duration}
                      key={movieId}
                      filmId={movieId}
                      onCardButtonClick={handleCardButtonClick}
                    />
                  );
                })}
              </ul>
            )
          ) : (
            <p className='movies__error'>Ничего не найдено</p>
          )}

          {location.pathname === '/movies' && isButtonVisible && (
            <button onClick={handleAddButtonClick} className='movies__add-btn'>
              Ещё
            </button>
          )}
        </>
      ) : (
        <Preloader isLoading={isLoading} onlyLoader={true} />
      )}
    </section>
  );
}

export default MoviesCardList;

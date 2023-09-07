import { useLocation } from 'react-router-dom';
import MoviesCard from '../../components/MoviesCard/MoviesCard';
import Preloader from '../../components/Preloader/Preloader';
import { errorMessages } from '../../utils/constants.js';

import './MoviesCardList.css';

function MoviesCardList({
  filmServiceAreNotAvalible,
  isButtonVisible,
  isLoading,
  movieList,
  handleAddButtonClick,
  isFilmNotFound,
  handleCardButtonClick,
  onLikedButtonClick,
}) {
  const { filmsNotFoundMsg, filmServiceAreNotAvalibleMsg } = errorMessages;
  const location = useLocation();

  return (
    <section className='movies-cards'>
      {!filmServiceAreNotAvalible ? (
        <>
          {!isLoading ? (
            <>
              {!isFilmNotFound ? (
                location.pathname === '/movies' ? (
                  <ul className='movies-cards__list'>
                    {movieList?.map((movie) => {
                      if (movie === undefined) {
                        return;
                      }
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
                          onLikedButtonClick={onLikedButtonClick}
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
                <p className='movies__error'>{filmsNotFoundMsg}</p>
              )}

              {location.pathname === '/movies' &&
                isButtonVisible &&
                !isFilmNotFound && (
                  <button
                    onClick={handleAddButtonClick}
                    className='movies__add-btn'
                  >
                    Ещё
                  </button>
                )}
            </>
          ) : (
            <Preloader isLoading={isLoading} onlyLoader={true} />
          )}
        </>
      ) : (
        <p className='movies__error'>{filmServiceAreNotAvalibleMsg}</p>
      )}
    </section>
  );
}

export default MoviesCardList;

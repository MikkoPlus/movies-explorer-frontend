import { useContext } from 'react';
import { ApiSubmitFormContext } from '../../contexts/ApiSubmitFormContext';

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import Delimeter from '../../components/singleComponents/Delimeter/Delimeter';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';

import './SavedMovies.css';

function SavedMovies({
  movies,
  isFilmNotFound,
  handleDeleteMovie,
  changeDurationSearchQuery,
  isShortFilm,
  handleSearchMovies,
  filmServiceAreNotAvalible,
  isSearchFormEmpty,
}) {
  const { isLoading } = useContext(ApiSubmitFormContext);

  return (
    <div className='saved-movies'>
      <Header />
      <main className='main'>
        <SearchForm
          searchMovieHandler={handleSearchMovies}
          changeDurationSearchQuery={changeDurationSearchQuery}
          isShortFilm={isShortFilm}
          isFormValueEmpty={isSearchFormEmpty}
        />
        <Delimeter />
        <MoviesCardList
          movieList={movies}
          isLoading={isLoading}
          isFilmNotFound={isFilmNotFound}
          handleCardButtonClick={handleDeleteMovie}
          filmServiceAreNotAvalible={filmServiceAreNotAvalible}
        />
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;

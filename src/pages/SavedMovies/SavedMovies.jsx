import { useContext } from 'react';
import { ApiSubmitFormContext } from '../../contexts/ApiSubmitFormContext';

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import Delimeter from '../../components/singleComponents/Delimeter/Delimeter';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import MoviesCard from '../../components/MoviesCard/MoviesCard';
import Footer from '../../components/Footer/Footer';
import Preloader from '../../components/Preloader/Preloader';

import './SavedMovies.css';

function SavedMovies() {
  const { isLoading } = useContext(ApiSubmitFormContext);

  return (
    <div className='saved-movies'>
      <Header />
      <main className='main'>
        <SearchForm />
        <Delimeter />
        <MoviesCardList>
          {isLoading && <Preloader />}
          {!isLoading && (
            <>
              <MoviesCard isFavoriteMovie={true} />
              <MoviesCard isFavoriteMovie={true} />
              <MoviesCard isFavoriteMovie={true} />
            </>
          )}
        </MoviesCardList>
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;

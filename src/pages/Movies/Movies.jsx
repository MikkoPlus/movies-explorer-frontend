import { useContext } from 'react';
import { ApiRequestLoadingContext } from '../../contexts/ApiRequestLoadingContext';

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import Delimeter from '../../components/singleComponents/Delimeter/Delimeter';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import MoviesCard from '../../components/MoviesCard/MoviesCard';
import Footer from '../../components/Footer/Footer';
import Preloader from '../../components/Preloader/Preloader';

import './Movies.css';

function Movies({ isLoggedIn }) {
  const { isLoading } = useContext(ApiRequestLoadingContext);
  return (
    <div className='movies'>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm />
      <Delimeter />
      <MoviesCardList>
        {isLoading && <Preloader />}
        {!isLoading && (
          <>
            <MoviesCard />
            <MoviesCard isFavoriteMovie={true} />
            <MoviesCard isFavoriteMovie={true} />
            <MoviesCard />
            <MoviesCard isFavoriteMovie={true} />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard isFavoriteMovie={true} />
          </>
        )}
      </MoviesCardList>
      <Footer />
    </div>
  );
}

export default Movies;

import './MoviesCardList.css';

function MoviesCardList({ children }) {
  return (
    <section className='movies-cards'>
      <ul className='movies-cards__list'>{children}</ul>
      <button className='movies-cards__add-btn'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;

import './Portfolio.css';
import Title from '../singleComponents/Title/Title';
import ListItem from '../singleComponents/ListItem/ListItem';

function Portfolio(props) {
  return (
    <section className='portfolio'>
      <Title text='Портфолио' additionalClass='protfolio__title' />
      <ul className='portfolio__list'>
        <ListItem
          text='Статичный сайт'
          link='https://mikkoplus.github.io/how-to-learn'
          additionalClass='portfolio__list-item'
        />
        <ListItem
          text='Адаптивный сайт'
          link='https://mikkoplus.github.io/russian-travel'
          additionalClass='portfolio__list-item'
        />
        <ListItem
          text='Одностраничное приложение'
          link='https://mikkoplus.github.io/react-mesto-auth/'
          additionalClass='portfolio__list-item'
        />
      </ul>
    </section>
  );
}

export default Portfolio;

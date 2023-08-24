import './NavTab.css';
import ListItem from '../singleComponents/ListItem/ListItem';

function NavTab(props) {
  return (
    <nav className='nav-tab'>
      <ul className='nav-tab__menu'>
        <ListItem
          isAnchorLink={true}
          text='О проекте'
          link='about-project'
          additionalClass='nav-tab__item'
        />
        <ListItem
          isAnchorLink={true}
          text='Технологии'
          link='techs'
          additionalClass='nav-tab__item'
        />
        <ListItem
          isAnchorLink={true}
          text='Студент'
          link='about-me'
          additionalClass='nav-tab__item'
        />
      </ul>
    </nav>
  );
}

export default NavTab;

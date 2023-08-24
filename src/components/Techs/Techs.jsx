import SectionTitle from '../singleComponents/SectionTitle/SectionTitle';
import BigTitle from '../singleComponents/BigTitle/BigTitle';

import './Techs.css';

function Techs(props) {
  return (
    <section id='techs' className='techs'>
      <div className='techs__wrapper'>
        <SectionTitle text='Технологии' />
        <BigTitle text='7 технологий' sectionClassName='techs__title' />
        <p className='techs__subtitle'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className='techs__list'>
          <li className='techs__list-item'>HTML</li>
          <li className='techs__list-item'>CSS</li>
          <li className='techs__list-item'>JS</li>
          <li className='techs__list-item'>React</li>
          <li className='techs__list-item'>Git</li>
          <li className='techs__list-item'>Express.js</li>
          <li className='techs__list-item'>mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;

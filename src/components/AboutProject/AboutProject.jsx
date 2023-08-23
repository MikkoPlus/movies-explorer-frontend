import Title from '../singleComponents/Title/Title';
import SectionTitle from '../singleComponents/SectionTitle/SectionTitle';

import './AboutProject.css';

function AboutProject(props) {
  return (
    <section id='about-project' className='about-project'>
      <SectionTitle text='О проекте' />
      <div className='about-project__info'>
        <div className='about-project__info-item'>
          <Title
            additionalClass={'about-project__title'}
            text='Дипломный проект включал 5 этапов'
          />
          <p className='about-project__description'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__info-item'>
          <Title
            additionalClass={'about-project__title'}
            text='На выполнение диплома ушло 5 недель'
          />
          <p className='about-project__description'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__timeline'>
        <div className='about-project__timeline-week about-project__timeline-week_short'>
          1 неделя
        </div>
        <div className='about-project__timeline-week'>4 недели</div>
      </div>
    </section>
  );
}

export default AboutProject;

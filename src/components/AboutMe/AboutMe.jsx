import SectionTitle from '../singleComponents/SectionTitle/SectionTitle';
import BigTitle from '../singleComponents/BigTitle/BigTitle';
import studentPhoto from '../../images/student.png';

import './AboutMe.css';

function AboutMe(props) {
  return (
    <section id='about-me' className='about-me'>
      <SectionTitle text='Студент' />
      <div className='about-me__wrapper'>
        <div className='about-me__content'>
          <div className='about-me__text-content'>
            <BigTitle text='Виталий' sectionClassName='about-me__title' />
            <p className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</p>
            <p className='about-me__text'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-&nbsp;разработке,
              начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </div>
          <a href='https://github.com/MikkoPlus' className='about-me__link'>
            Github
          </a>
        </div>
        <img src={studentPhoto} alt='Студент' className='about-me__photo' />
      </div>
    </section>
  );
}

export default AboutMe;

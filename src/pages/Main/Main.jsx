import Header from '../../components/Header/Header';
import Promo from '../../components/Promo/Promo';
import NavTab from '../../components/NavTab/NavTab';
import AboutProject from '../../components/AboutProject/AboutProject';
import Techs from '../../components/Techs/Techs';
import AboutMe from '../../components/AboutMe/AboutMe';
import Portfolio from '../../components/Portfolio/Portfolio';
import Footer from '../../components/Footer/Footer';

import './Main.css';

function Main({ isLoggedIn }) {
  return (
    <div className='main'>
      <div className='main__promo-seсtion'>
        <Header isLoggedIn={isLoggedIn} />
        <Promo />
      </div>
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </div>
  );
}

export default Main;

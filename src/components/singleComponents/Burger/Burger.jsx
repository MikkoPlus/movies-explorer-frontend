import './Burger.css';

function Burger({ handleBurgerClick, isMenuVisible }) {
  return (
    <div
      onClick={handleBurgerClick}
      className={`burger${isMenuVisible ? ' burger_active' : ''}`}
    >
      <span className='burger__line burger__line_first'></span>
      <span className='burger__line burger__line_second'></span>
      <span className='burger__line burger__line_third'></span>
    </div>
  );
}

export default Burger;

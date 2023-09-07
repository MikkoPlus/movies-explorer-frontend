import { Link, useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage(props) {
  const navigate = useNavigate();

  function redirectToPreviousPage(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <main className='not-found'>
      <h1 className='not-found__title'>
        <span>404</span> <br /> Страница не найдена
      </h1>
      <Link className='not-found__link' onClick={redirectToPreviousPage}>
        назад
      </Link>
    </main>
  );
}

export default NotFoundPage;

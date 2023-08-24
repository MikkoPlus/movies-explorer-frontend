import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Header from '../../Header/Header';

import './Sign.css';

function Sign({
  title,
  handleSubmit,
  btnText,
  replaceText,
  replaceLinkText,
  isFormValid,
  replaceLink,
  children,
}) {
  function handleSubmitForm(evt) {
    evt.preventDefault();

    handleSubmit();
  }

  return (
    <div className='sign'>
      <main className='sign__wrapper'>
        <Header isOnlyLogo={true} />
        <h3 className='sign__title'>{title}</h3>
        <Form
          handleSubmitForm={handleSubmitForm}
          btnText={btnText}
          isFormValid={isFormValid}
          additionalFormClass='sign__form'
          additionalBtnClass='sign__button'
        >
          {children}
        </Form>
        <div className='sign__replace-wrapper'>
          <p className='sign__replace-text'>{replaceText} </p>
          <Link
            to={`/${replaceLink}`}
            className='sign__replace-text sign__replace-link'
          >
            {replaceLinkText}
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Sign;

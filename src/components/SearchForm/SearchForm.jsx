import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Form from '../singleComponents/Form/Form';
import Input from '../singleComponents/Input/Input';
import { errorMessages } from '../../utils/constants';

import './SearchForm.css';

function SearchForm({
  searchMovieHandler,
  changeDurationSearchQuery,
  isShortFilm,
  isFormValueEmpty,
}) {
  const { searchRequestIsEmptyMsg } = errorMessages;

  const [inputValue, setInputValue] = useState('');

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/movies') {
      const previousQueryText = JSON.parse(
        localStorage?.getItem('movieQueryData')
      )?.query;

      if (previousQueryText) {
        setInputValue(previousQueryText);
      }
    }
  }, [location]);

  return (
    <div className='search'>
      <div className='search__wrapper'>
        <Form
          additionalBtnClass='search__form-btn'
          additionalFormClass='search__form'
          btnText='Найти'
          handleSubmitForm={searchMovieHandler}
          formValues={{ text: inputValue }}
          isFormValid={true}
          novalidate={true}
        >
          <Input
            placeholder='Фильм'
            name='text'
            type='text'
            onChange={(e) => handleInputChange(e)}
            value={inputValue}
            labelClass='search__label'
            inputClass='search__input'
          />
        </Form>
        <div className='search__short-film'>
          <div className='search__radio-wrapper'>
            <input
              onChange={() => changeDurationSearchQuery(!isShortFilm)}
              className='search__radio-btn'
              type='checkbox'
              checked={isShortFilm}
            />
            <label className='search__radio-btn-descr'>Короткометражки</label>
          </div>
        </div>
      </div>
      {isFormValueEmpty && (
        <p className='search-form__error search-form__error_mobile'>
          {searchRequestIsEmptyMsg}
        </p>
      )}
      <div className='search__short-film search__short-film_mobile'>
        <div className='search__radio-wrapper'>
          <input
            onChange={() => changeDurationSearchQuery(!isShortFilm)}
            className='search__radio-btn'
            type='checkbox'
            checked={isShortFilm}
          />
          <label className='search__radio-btn-descr'>Короткометражки</label>
        </div>
      </div>
      {isFormValueEmpty && (
        <p className='search-form__error'>{searchRequestIsEmptyMsg}</p>
      )}
    </div>
  );
}

export default SearchForm;

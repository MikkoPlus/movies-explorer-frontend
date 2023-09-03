import { useEffect } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import Form from '../singleComponents/Form/Form';
import Input from '../singleComponents/Input/Input';
import { errorMessages } from '../../utils/constants';
import './SearchForm.css';

function SearchForm({
  searchMovieHandler,
  changeDurationSearchQuery,
  isShortFilm,
  previousQueryText,
}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const { text } = values;
  const { searchRequestIsEmptyMsg } = errorMessages;

  useEffect(() => {
    values.text = previousQueryText;
  }, [previousQueryText]);

  return (
    <div className='search'>
      <div className='search__wrapper'>
        <Form
          additionalBtnClass='search__form-btn'
          additionalFormClass='search__form'
          btnText='Найти'
          isFormValid={isValid}
          handleSubmitForm={searchMovieHandler}
          formValues={values}
          novalidate
        >
          <Input
            placeholder='Фильм'
            name='text'
            type='text'
            value={text}
            onChange={handleChange}
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
      {errors.text && (
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
      {errors.text && (
        <p className='search-form__error'>{searchRequestIsEmptyMsg}</p>
      )}
    </div>
  );
}

export default SearchForm;

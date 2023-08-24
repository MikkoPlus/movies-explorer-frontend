import Form from '../singleComponents/Form/Form';
import Input from '../singleComponents/Input/Input';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import './SearchForm.css';

function SearchForm(props) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const { text } = values;

  return (
    <div className='search'>
      <div className='search__wrapper'>
        <Form
          additionalBtnClass='search__form-btn'
          additionalFormClass='search__form'
          btnText='Найти'
          isFormValid={isValid}
        >
          <Input
            placeholder='Фильм'
            name='text'
            type='text'
            value={text}
            onChange={handleChange}
            error={errors.text}
            labelClass='search__label'
            inputClass='search__input'
          />
        </Form>
        <div className='search__short-film'>
          <div className='search__radio-wrapper'>
            <input className='search__radio-btn' type='checkbox' />
            <label className='search__radio-btn-descr'>Короткометражки</label>
          </div>
        </div>
      </div>
      <div className='search__short-film search__short-film_mobile'>
        <div className='search__radio-wrapper'>
          <input className='search__radio-btn' type='checkbox' />
          <label className='search__radio-btn-descr'>Короткометражки</label>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;

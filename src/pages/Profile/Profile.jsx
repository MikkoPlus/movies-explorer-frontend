import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import Header from '../../components/Header/Header';
import Title from '../../components/singleComponents/Title/Title';
import Form from '../../components/singleComponents/Form/Form';
import Input from '../../components/singleComponents/Input/Input';

import './Profile.css';

function Profile({
  switchEditMode,
  isEditModeOn,
  handleChangeProfile,
  handleLogOut,
}) {
  const { name, email } = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setIsValid, setValues } =
    useFormAndValidation();

  useEffect(() => {
    setValues({
      email: email,
      username: name,
    });
  }, [name, email, setValues, isEditModeOn]);

  useEffect(() => {
    if (name === values.username && email === values.email) {
      setIsValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.username, values.email]);

  useEffect(() => {
    switchEditMode(false);
  }, []);

  return (
    <section className='profile'>
      <Header />
      <main className='profile__wrapper'>
        <Title additionalClass='profile__title' text={`Привет, ${name}!`} />
        {!isEditModeOn && (
          <>
            <div className='profile__data'>
              <div className='profile__data-item'>
                <p className='profile__label'>Имя</p>
                <p className='profile__value'>{name}</p>
              </div>
              <span className='profile__delimiter'></span>
              <div className='profile__data-item'>
                <p className='profile__label'>E-mail</p>
                <p className='profile__value'>{email}</p>
              </div>
            </div>
            <ul className='profile__controls'>
              <li onClick={switchEditMode} className='profile__control'>
                Редактировать
              </li>
              <li
                onClick={handleLogOut}
                className='profile__control profile__control_red'
              >
                Выйти из аккаунта
              </li>
            </ul>
          </>
        )}

        {isEditModeOn && (
          <>
            <Form
              additionalFormClass='profile__form'
              additionalBtnClass='profile__button'
              btnText='Сохранить'
              isFormValid={isValid}
              handleSubmitForm={handleChangeProfile}
              formValues={values}
            >
              <Input
                type='text'
                placeholder='Ваше имя'
                name='username'
                value={values.username}
                onChange={handleChange}
                error={errors.username}
                labelText='Имя'
                labelClass='profile__label'
                regExp='^[а-яА-ЯёЁa-zA-Z\s\-]+$'
              />
              <Input
                type='email'
                placeholder='Ваш email'
                name='email'
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                labelText='E-mail'
                labelClass='profile__label'
              />
            </Form>
            <p onClick={() => switchEditMode(true)} className='profile__back'>
              назад
            </p>
          </>
        )}
      </main>
    </section>
  );
}

export default Profile;

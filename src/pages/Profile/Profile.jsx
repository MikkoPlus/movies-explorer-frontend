import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Header from '../../components/Header/Header';
import Title from '../../components/singleComponents/Title/Title';
import Form from '../../components/singleComponents/Form/Form';
import Input from '../../components/singleComponents/Input/Input';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import './Profile.css';

function Profile({ isLoggedIn, handleChangeProfile, handleLogOut }) {
  const { name, email } = useContext(CurrentUserContext);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  function switchEditMode() {
    setIsEditModeOn(!isEditModeOn);
  }

  function onProfileFormSubmit(e) {
    e.preventDefault();
    handleChangeProfile();
  }

  useEffect(() => {
    setValues({
      email: email,
      name: name,
    });
  }, [name, email, setValues, isEditModeOn]);

  return (
    <section className='profile'>
      <Header isLoggedIn={isLoggedIn} isAppPage={true}></Header>
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
              handleSubmitForm={onProfileFormSubmit}
            >
              <Input
                type='name'
                placeholder='Ваше имя'
                name='name'
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                labelText='Имя'
                labelClass='profile__label'
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
            <p onClick={() => switchEditMode()} className='profile__back'>
              назад
            </p>
          </>
        )}
      </main>
    </section>
  );
}

export default Profile;

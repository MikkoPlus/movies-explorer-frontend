import { useFormAndValidation } from '../../hooks/useFormAndValidation';

import Sign from '../../components/singleComponents/Sign/Sign';
import Input from '../../components/singleComponents/Input/Input';

import './Register.css';

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const { username, email, password } = values;

  return (
    <Sign
      handleSubmit={onRegister}
      title='Добро пожаловать!'
      btnText='Зарегистрироваться'
      isFormValid={isValid}
      replaceText='Уже зарегистрированы?'
      replaceLinkText='Войти'
      replaceLink='sign-in'
      formValues={{ ...values, name: username }}
    >
      <Input
        type='text'
        placeholder='Ваше имя'
        name='username'
        value={username}
        onChange={handleChange}
        error={errors.username}
        labelText='Имя'
        labelClass='sign__label'
        regExp='^[а-яА-ЯёЁa-zA-Z\s\-]+$'
        minLength='2'
        maxLength='30'
      />
      <Input
        type='email'
        placeholder='Ваш email'
        name='email'
        value={email}
        onChange={handleChange}
        error={errors.email}
        labelText='E-mail'
        labelClass='sign__label'
      />
      <Input
        type='password'
        placeholder='Ваш пароль'
        name='password'
        value={password}
        onChange={handleChange}
        error={errors.password}
        labelText='Пароль'
        labelClass='sign__label'
      />
    </Sign>
  );
}

export default Register;

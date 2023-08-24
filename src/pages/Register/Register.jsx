import Sign from '../../components/singleComponents/Sign/Sign';
import Input from '../../components/singleComponents/Input/Input';
import './Register.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const { name, email, password } = values;

  return (
    <Sign
      handleSubmit={onRegister}
      title='Добро пожаловать!'
      btnText='Зарегистрироваться'
      isFormValid={isValid}
      replaceText='Уже зарегистрированы?'
      replaceLinkText='Войти'
      replaceLink='signin'
    >
      <Input
        type='name'
        placeholder='Ваше имя'
        name='name'
        value={name}
        onChange={handleChange}
        error={errors.name}
        labelText='Имя'
        labelClass='sign__label'
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

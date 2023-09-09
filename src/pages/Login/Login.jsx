import Sign from '../../components/singleComponents/Sign/Sign';
import Input from '../../components/singleComponents/Input/Input';
import './Login.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function Login({ onLogin }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const { email, password } = values;

  return (
    <Sign
      title='Рады видеть!'
      btnText='Войти'
      isFormValid={isValid}
      replaceText='Ещё не зарегистрированы?'
      replaceLinkText='Регистрация'
      replaceLink='sign-up'
      handleSubmit={onLogin}
      formValues={values}
    >
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

export default Login;

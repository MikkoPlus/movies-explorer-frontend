export const usernameRegexp = /^[а-яА-ЯёЁa-zA-Z-\s]+$/iu;

export const errorMessages = {
  invalidUsernameMsg:
    'Поле должно содержать только латиницу, кириллицу, пробел или дефис',
  invalidNameMsg: 'Введено некорректное имя',
  invalidEmailMsg: 'Введена некорректная почта',
  emailIsExistsMsg: 'Пользователь с такой почтой уже существует',
  invalidDataMsg: 'Переданны некорректные данные',
  unauthorizedMsg: 'Непарвильная почта или пароль',
  forbidenMsg: 'Ошибка прав доступа',
  defaultMsg: 'Внутренняя ошибка сервера',
};

export const successMessages = {
  successRegistered: 'Регистрация прошла успешно',
  successLogin: 'Вы вошли в аккаунт',
  successLogout: 'Выход из аккаунта',
  successProfileChange: 'Профиль успешно обновлён',
};
export const BASE_URL = 'https://api.movie-hunter.nomoreparties.sbs';
export const DATA_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const BASE_MOVIE_URL = `${BASE_URL}/movies`;

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
  searchRequestIsEmptyMsg: 'Введите ключевое слово',
  filmsNotFoundMsg: 'Ничего не найдено',
  filmServiceAreNotAvalibleMsg:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};

export const successMessages = {
  successRegistered: 'Регистрация прошла успешно',
  successLogin: 'Вы вошли в аккаунт',
  successLogout: 'Выход из аккаунта',
  successProfileChange: 'Профиль успешно обновлён',
};

export const shortFilmDuration = 40;

export const widthIndexes = {
  mobile: 5,
  tablet: 8,
  desktop: 12,
};

export const devicesWidth = {
  mobile: 565,
  tabet: 864,
};

import { errorMessages } from './constants';

export const errorHandler = (err) => {
  const statusCode = err.status;

  const {
    emailIsExistsMsg,
    invalidDataMsg,
    unauthorizedMsg,
    forbidenMsg,
    defaultMsg,
  } = errorMessages;

  switch (statusCode) {
    case 400:
      err.message = invalidDataMsg;
      return;
    case 401:
      err.message = unauthorizedMsg;
      return;
    case 403:
      err.message = forbidenMsg;
      return;
    case 409:
      err.message = emailIsExistsMsg;
      return;
    default:
      err.message = defaultMsg;
      return;
  }
};

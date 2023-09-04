import { useState, useCallback } from 'react';
import { usernameRegexp, errorMessages } from '../utils/constants';
import * as EmailValidator from 'email-validator';

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });

    if (name === 'username' && value !== '' && !usernameRegexp.test(value)) {
      setErrors({
        ...errors,
        [name]: errorMessages.invalidUsernameMsg,
      });
    } else if (name === 'email' && !EmailValidator.validate(value)) {
      setErrors({
        ...errors,
        [name]: errorMessages.invalidEmailMsg,
      });
    }

    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
  };
}

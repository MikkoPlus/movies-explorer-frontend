import { useState } from 'react';

import './Input.css';

function Input({
  labelText,
  name,
  type,
  placeholder,
  minLength,
  maxLength,
  value,
  onChange,
  error,
  labelClass,
  inputClass,
}) {
  const [isDirty, setIsDirty] = useState(false);

  const labelClassName = labelClass
    ? `input-label ${labelClass}`
    : 'input-label';

  const inputClassName = inputClass ? `input ${inputClass}` : 'input';

  return (
    <label className={labelClassName}>
      {labelText}
      <input
        required
        name={name}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value || ''}
        onChange={onChange}
        onBlur={() => setIsDirty(true)}
      />
      {isDirty && (
        <span id='input-error' className='input__text-error'>
          {error}
        </span>
      )}
    </label>
  );
}

export default Input;

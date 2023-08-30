import './Form.css';

function Form({
  handleSubmitForm,
  btnText,
  isFormValid,
  additionalBtnClass,
  additionalFormClass,
  formValues,
  children,
}) {
  const activeBtnClass = isFormValid
    ? 'form__btn'
    : 'form__btn form__btn_disabled';
  const btnClass = additionalBtnClass
    ? `${activeBtnClass} ${additionalBtnClass}`
    : activeBtnClass;
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleSubmitForm(formValues);
  };

  return (
    <form className={`form ${additionalFormClass}`} onSubmit={handleSubmit}>
      <div className='form__input-wrapper'>{children}</div>
      <button disabled={!isFormValid} className={btnClass}>
        {btnText}
      </button>
    </form>
  );
}

export default Form;

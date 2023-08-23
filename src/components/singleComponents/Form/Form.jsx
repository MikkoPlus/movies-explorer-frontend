import './Form.css';

function Form({
  handleSubmitForm,
  btnText,
  isFormValid,
  additionalBtnClass,
  additionalFormClass,
  children,
}) {
  const activeBtnClass = isFormValid
    ? 'form__btn'
    : 'form__btn form__btn_disabled';
  const btnClass = additionalBtnClass
    ? `${activeBtnClass} ${additionalBtnClass}`
    : activeBtnClass;
  return (
    <form className={`form ${additionalFormClass}`} onSubmit={handleSubmitForm}>
      <div className='form__input-wrapper'>{children}</div>
      <button disabled={!isFormValid} className={btnClass}>
        {btnText}
      </button>
    </form>
  );
}

export default Form;

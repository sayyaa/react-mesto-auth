function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText
}) {

  const popupOpenOrCloseLogic = `popup ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={popupOpenOrCloseLogic}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
          onClick={onClose}
          className="popup__close-btn button"
          type="button"
          aria-label="Закрыть окно"
        ></button>
        <form className={`form form_${name}`} name={name} onSubmit={onSubmit} noValidate>
          <fieldset className="form__set">
            {children}
            <button className="form__save-btn button" type='submit'>
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

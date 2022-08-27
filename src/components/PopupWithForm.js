import React from "react";

function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
  popupConfirmClass,
  inputValid,
  buttonText,
}) {
  const className = `popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={className} onClick={onClose}>
      <div
        className="popup__container"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <button
          type="button"
          id="popup__close"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h3 className={`popup__title ${popupConfirmClass}`}>{title}</h3>
        <form
          noValidate
          onSubmit={onSubmit}
          name={`${name}`}
          className="popup__form"
        >
          {children}
          <button
            type="submit"
            className={`popup__save ${inputValid ? "" : "popup__save_invalid"}`}
            disabled={!inputValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default React.memo(PopupWithForm);

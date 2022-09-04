import React from "react";

function InfoTooltip({ loggedIn, onClose, name, isOpen }) {
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
        <div
          className={`popup__info-tooltip ${
            !loggedIn ? "popup__info-tooltip_type_error" : ""
          }`}
        ></div>
        <h3 className={"popup__info-tooltip_title"}>
          {loggedIn
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
}

export default React.memo(InfoTooltip);

import React from "react";

function InfoTooltip({ isRegister, onClose }) {
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
        <img
          src={isRegister ? "../images/Check-mark.svg" : "../images/Cross.svg"}
        />
        <h3 className={"popup__title"}>
          {isRegister
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
}

export default React.memo(InfoTooltip);

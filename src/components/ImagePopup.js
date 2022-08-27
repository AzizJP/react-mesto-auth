import React from "react";
function ImagePopup({ name, card, isOpen, onClose }) {
  return (
    <div
      id="popup__img"
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__image-wrapper"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <button
          type="button"
          id="img-btn__close"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          src={`${card?.link ?? ""}`}
          alt={`${card?.name ?? ""}`}
          className="popup__image"
        />
        <h2 className="popup__name">{card?.name ?? ""}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;

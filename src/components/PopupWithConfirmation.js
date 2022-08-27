import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({ card, onClose, onSubmit, isRequesting }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      title={"Вы уверены?"}
      name={"confirm"}
      isOpen={!!card}
      onClose={onClose}
      onSubmit={handleSubmit}
      popupConfirmClass={"popup__title_confirm"}
      inputValid={true}
      buttonText={isRequesting ? "Удаляю..." : "Да"}
    ></PopupWithForm>
  );
}

export default React.memo(PopupWithConfirmation);

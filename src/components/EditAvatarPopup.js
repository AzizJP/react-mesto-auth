import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isRequesting }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({ "popup__avatar": "" }, { "popup__avatar": "" }, { "popup__avatar": true });

  React.useEffect(() => {
    if (isOpen) {
      setValues({ "popup__avatar": "" });
      resetForm({ "popup__avatar": "" }, { "popup__avatar": "" },)
    }
  }, [setValues, resetForm, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: values["popup__avatar"],
    });
  }

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"edit-avatar"}
      submitButtonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      inputValid={isValid["popup__avatar"]}
      buttonText={isRequesting ? "Сохраняю..." : "Сохранить"}
    >
      <input
        required
        type="url"
        id="popup-avatar"
        name="popup__avatar"
        className={`popup__input popup__input_type_avatar ${isValid["popup__avatar"] ? "" : "popup__input_type_error"
          }`}
        placeholder="Ссылка на картинку"
        value={values["popup__avatar"]}
        onChange={handleChange}
      />
      <span
        className={`popup-avatar-error popup__input-error ${isValid["popup__avatar"] ? "" : "popup__input-error_active"
          }`}
      >
        {errors["popup__avatar"]}
      </span>
    </PopupWithForm>
  );
}

export default React.memo(EditAvatarPopup);

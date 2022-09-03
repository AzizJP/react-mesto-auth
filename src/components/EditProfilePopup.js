import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isRequesting }) {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation(
      {
        "popup__name": "",
        "popup__info": "",
      },
      {
        "popup__name": "",
        "popup__info": "",
      },
      {
        "popup__name": true,
        "popup__info": true,
      }
    );
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser.name && currentUser.about && isOpen) {
      setValues({
        "popup__name": currentUser.name,
        "popup__info": currentUser.about,
      });
    }
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values["popup__name"],
      about: values["popup__info"],
    });
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit-profile"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      inputValid={isValid["popup__name"] && isValid["popup__info"]}
      buttonText={isRequesting ? "Сохраняю..." : "Сохранить"}
    >
      <input
        className={`popup__input popup__input_type_name ${
          isValid["popup__name"] ? "" : "popup__input_type_error"
        }`}
        required
        minLength="2"
        maxLength="40"
        type="text"
        id="popup-title"
        name="popup__name"
        placeholder="Имя"
        value={values["popup__name"]}
        onChange={handleChange}
      />
      <span
        className={`popup-title-error popup__input-error ${
          isValid["popup__name"] ? "" : "popup__input-error_active"
        }`}
      >
        {errors["popup__name"]}
      </span>
      <input
        required
        minLength="2"
        maxLength="200"
        type="text"
        id="popup-info"
        name="popup__info"
        className={`popup__input popup__input_type_info ${
          isValid["popup__info"] ? "" : "popup__input_type_error"
        }`}
        placeholder="Вид деятельности"
        value={values["popup__info"]}
        onChange={handleChange}
      />
      <span
        className={`popup-info-error popup__input-error ${
          isValid["popup__info"] ? "" : "popup__input-error_active"
        }`}
      >
        {errors["popup__info"]}
      </span>
    </PopupWithForm>
  );
}

export default React.memo(EditProfilePopup);

import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isRequesting }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation({
      "popup__place": "",
      "popup__link": ""
    }, {
      "popup__place": "",
      "popup__link": ""
    }, {
      "popup__place": true,
      "popup__link": true
    });

  React.useEffect(() => {
    if (isOpen) {
      setValues({});
      resetForm({ "popup__place": "", "popup__link": "" }, { "popup__place": "", "popup__link": "" },);
    }
  }, [setValues, resetForm, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: values["popup__place"],
      link: values["popup__link"],
    });
  }

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-card"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      inputValid={values["popup__place"] && values["popup__link"]}
      buttonText={isRequesting ? "Добавляю..." : "Добавить"}
    >
      <input
        required
        minLength="2"
        maxLength="30"
        type="text"
        id="popup-name"
        name="popup__place"
        className={`popup__input popup__input_type_place ${isValid["popup__place"] ? "" : "popup__input_type_error"
          }`}
        placeholder="Название"
        value={values["popup__place"]}
        onChange={handleChange}
      />
      <span
        className={`popup-name-error popup__input-error ${isValid["popup__place"] ? "" : "popup__input-error_active"
          }`}
      >
        {errors["popup__place"]}
      </span>
      <input
        required
        type="url"
        id="popup-link"
        name="popup__link"
        className={`popup__input popup__input_type_link ${isValid["popup__link"] ? "" : "popup__input_type_error"
          }`}
        placeholder="Ссылка на картинку"
        value={values["popup__link"]}
        onChange={handleChange}
      />
      <span
        className={`popup-link-error popup__input-error ${isValid["popup__link"] ? "" : "popup__input-error_active"
          }`}
      >
        {errors["popup__link"]}
      </span>
    </PopupWithForm>
  );
}
export default React.memo(AddPlacePopup);

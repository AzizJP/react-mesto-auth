import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function RegisterLoginForm({ title, buttonText }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation(
      {
        "register-email": "",
        "register-password": "",
      },
      {
        "register-email": "",
        "register-password": "",
      },
      {
        "register-email": true,
        "register-password": true,
      }
    );

  React.useEffect(() => {
    setValues({});
  });

  return (
    <div className={"regiser-login__container"}>
      <h2 className={"regiser-login__title"}>{title}</h2>
      <form noValidate className="regiser-login__form">
        <input
          className={`regiser-login__input regiser-login__input_type_email`}
          required
          minLength="2"
          maxLength="40"
          type="email"
          id="input__register-email"
          name="register-email"
          placeholder="Email"
          value={values["register-email"]}
          onChange={handleChange}
        />
        <span
          className={`popup-name-error popup__input-error ${
            isValid["register-email"] ? "" : "popup__input-error_active"
          }`}
        >
          Введите корректный Email
        </span>
        <input
          className={`regiser-login__input regiser-login__input_type_password`}
          required
          minLength="6"
          maxLength="40"
          type="password"
          pattern="(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
          id="input__register-password"
          name="register-password"
          placeholder="Пароль"
          value={values["register-password"]}
          onChange={handleChange}
        />
        <span
          className={`popup-name-error popup__input-error ${
            isValid["register-password"] ? "" : "popup__input-error_active"
          }`}
        >
          Введите корректный пароль. Минимум 6 символов, одна цифра, одна буква
          в верхнем регистре и одна в нижнем
        </span>
        <button type="submit" className={`regiser-login__button`}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default RegisterLoginForm;

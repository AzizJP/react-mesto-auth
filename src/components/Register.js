import React from "react";
import { Link } from "react-router-dom";
import RegisterLoginForm from "./RegisterLoginForm";

function Register({
  onRegister,
  onRegisterPopup,
  email,
  setEmail,
  password,
  setPassword,
  message,
}) {
  const handleSubmit = (e) => {
    onRegisterPopup();
    e.preventDefault();
    onRegister({ password, email });
  };
  return (
    <div className="register-login">
      <RegisterLoginForm
        formType={"register"}
        title={"Регистрация"}
        buttonText={"Зарегистрироваться"}
        onSubmit={handleSubmit}
      >
        <input
          className={`regiser-login__input regiser-login__input_type_email`}
          required
          minLength="2"
          maxLength="40"
          type="email"
          id="input__register-email"
          name="register-email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>{message}</span>
        <input
          className={`regiser-login__input regiser-login__input_type_password`}
          required
          minLength="6"
          maxLength="40"
          type="password"
          id="input__register-password"
          name="register-password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>{message}</span>
      </RegisterLoginForm>
      <div className={"regiser-question"}>
        <h4 className={"regiser-question__title"}>Уже зарегистрированы?</h4>
        <Link to="/sign-in" className={`regiser-question__button`}>
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;

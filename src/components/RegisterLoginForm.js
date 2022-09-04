import React from "react";

function RegisterLoginForm({
  title,
  buttonText,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  message,
}) {
  return (
    <div className={"regiser-login__container"}>
      <h2 className={"regiser-login__title"}>{title}</h2>
      <form noValidate onSubmit={onSubmit} className="regiser-login__form">
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
        <button type="submit" className={`regiser-login__button`}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default React.memo(RegisterLoginForm);

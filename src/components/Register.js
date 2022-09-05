import React from "react";
import { Link } from "react-router-dom";
import RegisterLoginForm from "./RegisterLoginForm";

function Register({
  onRegister,
  email,
  setEmail,
  password,
  setPassword,
  message,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ password, email });
  };
  return (
    <div className="register-login">
      <RegisterLoginForm
        formType="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        message={message}
      />
      <div className={"regiser-question"}>
        <h4 className={"regiser-question__title"}>Уже зарегистрированы?</h4>
        <Link to="/sign-in" className={`regiser-question__button`}>
          Войти
        </Link>
      </div>
    </div>
  );
}

export default React.memo(Register);

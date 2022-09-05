import React from "react";
import RegisterLoginForm from "./RegisterLoginForm";

function Login({ onLogin, email, setEmail, password, setPassword, message }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin({ email, password });
  };

  return (
    <div className="register-login">
      <RegisterLoginForm
        formType="login"
        title="Вход"
        buttonText="Войти"
        onSubmit={handleSubmit}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        message={message}
      />
    </div>
  );
}

export default React.memo(Login);

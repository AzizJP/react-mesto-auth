import React from "react";
import { useHistory } from "react-router-dom";
import RegisterLoginForm from "./RegisterLoginForm";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const history = useHistory();
  const resetForm = () => {
    setPassword("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin({ email, password })
      .then(resetForm)
      .then(() => {
        history.push("/react-mesto-auth");
      })
      .catch((err) => setMessage(err.message || "Что-то пошло не так!"));
  };

  return (
    <div className="register-login">
      <RegisterLoginForm
        formType={"login"}
        title={"Вход"}
        buttonText={"Войти"}
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
    </div>
  );
}

export default Login;

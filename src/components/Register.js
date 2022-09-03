import RegisterLoginForm from "./RegisterLoginForm";

function Register() {
  return (
    <div className="register-login">
      <RegisterLoginForm
        formType={"register"}
        title={"Регистрация"}
        buttonText={"Зарегистрироваться"}
      />
      <div className={"regiser-question"}>
        <h4 className={"regiser-question__title"}>Уже зарегистрированы?</h4>
        <button type="submit" className={`regiser-question__button`}>
          Войти
        </button>
      </div>
    </div>
  );
}

export default Register;

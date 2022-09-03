import RegisterLoginForm from "./RegisterLoginForm";

function Login() {
  return (
    <div className="register-login">
      <RegisterLoginForm
        formType={"login"}
        title={"Вход"}
        buttonText={"Войти"}
      />
    </div>
  );
}

export default Login;

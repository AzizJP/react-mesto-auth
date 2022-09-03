import { useLocation } from "react-router-dom";

function Header() {
  const path = useLocation();
  return (
    <header className="header">
      <a href="https://azizjp.github.io/mesto/" className="header__logo">
        {" "}
      </a>
      <button type="button" className="header__button">
        {path.pathname === "/"
          ? "Выйти"
          : path.pathname === "/sign-in"
          ? "Регистрация"
          : path.pathname === "/sign-up"
          ? "Войти"
          : null}
      </button>
    </header>
  );
}

export default Header;

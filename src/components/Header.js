import { Link, useLocation } from "react-router-dom";

function Header({ emailVision, isOpen, onHeaderPopup }) {
  const path = useLocation();
  return path.pathname === "/react-mesto-auth" ? (
    <div className="header__container">
      <div
        className={`header__email ${isOpen ? "header__email_type_active" : ""}`}
      >
        <p className="header__email_text">{emailVision}</p>
        <Link
          onClick={() => {
            localStorage.removeItem("token");
            onHeaderPopup();
          }}
          to={"/sign-in"}
          className="header__button_popup"
        >
          Выйти
        </Link>
      </div>
      <header className="header__logged-in">
        <a
          href="https://azizjp.github.io/react-mesto-auth/"
          className="header__logo"
        >
          {" "}
        </a>
        <button
          onClick={onHeaderPopup}
          className={`header__popup ${
            isOpen ? "header__popup_type_active" : ""
          }`}
        ></button>
      </header>
    </div>
  ) : (
    <header className="header">
      <a
        href="https://azizjp.github.io/react-mesto-auth/"
        className="header__logo"
      >
        {" "}
      </a>
      <Link
        to={
          path.pathname === "/sign-in"
            ? "/sign-up"
            : path.pathname === "/sign-up"
            ? "/sign-in"
            : "/"
        }
        className="header__button"
      >
        {path.pathname === "/sign-in"
          ? "Регистрация"
          : path.pathname === "/sign-up"
          ? "Войти"
          : null}
      </Link>
    </header>
  );
}

export default Header;

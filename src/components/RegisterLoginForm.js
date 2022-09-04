import React from "react";

function RegisterLoginForm({ title, buttonText, children, onSubmit }) {
  return (
    <div className={"regiser-login__container"}>
      <h2 className={"regiser-login__title"}>{title}</h2>
      <form noValidate onSubmit={onSubmit} className="regiser-login__form">
        {children}
        <button type="submit" className={`regiser-login__button`}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default RegisterLoginForm;

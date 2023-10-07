import Header from "./Header";
import LogRegForm from "./LogRegForm";
import LogRegInput from "./LogRegInput";
import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <Header button="Войти" />
      <LogRegForm
        title="Регеистрация"
        submitButtonText="Зарегистрироваться"
        submit={props.submit}
      >
        <LogRegInput
          id="email"
          value={email}
          onChange={handleEmail}
          placeholder="Email"
          type="email"
        />
        <LogRegInput
          id="password"
          value={password}
          onChange={handlePassword}
          placeholder="Пароль"
          type="password"
        />
      </LogRegForm>
      <Link to="/sing-in" className="login-registration-form__back-to-login">
          Уже зарегистрированы? Войти
      </Link>
    </>
  );
}

export default Register;

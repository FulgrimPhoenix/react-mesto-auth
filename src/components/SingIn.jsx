import Header from "./Header";
import LogRegForm from "./LogRegForm";
import LogRegInput from "./LogRegInput";
import React from "react";

function SingIn(props) {
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
      <Header button="Регистрация" />
      <LogRegForm title="Вход" submitButtonText='Войти' submit={props.submit}>
        <LogRegInput
          id='email'
          value={email}
          onChange={handleEmail}
          placeholder="Email"
          type="email"
        />
        <LogRegInput
          id='password'
          value={password}
          onChange={handlePassword}
          placeholder="Пароль"
          type="password"
        />
      </LogRegForm>
    </>
  );
}

export default SingIn;

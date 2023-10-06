function LogRegForm({ children, submit, name, title, submitButtonText }) {
  return (
    <form className="form login-registration-form" name={name} onSubmit={submit} noValidate>
      <h1 className="login-registration-form__title">{title}</h1>
      {children}
      <button type="button" className="login-registration-form__submit" onClick={submit}>
        {submitButtonText}
      </button>
    </form>
  );
}

export default LogRegForm;

import { useState } from "react";

export default function Login({ onClose, onOpenRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const isFormValid = email.trim() && password.trim() && !emailError;

  function handleSubmit(e) {
    e.preventDefault();

    if (emailError) return;

    if (onLogin) {
      const error = onLogin({ email, password });

      if (error) {
        setAuthError(error);
        return;
      }
    }

    setAuthError("");
    onClose();
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <fieldset className="popup__fieldset">
        <p className="popup__input-name">E-mail</p>
        <input
          className="popup__input"
          name="email"
          type="email"
          placeholder="Insira e-mail"
          required
          value={email}
          onChange={(e) => {
            const value = e.target.value;

            setEmail(value);
            setAuthError("");

            if (!e.target.validity.valid) {
              setEmailError("Invalid email address");
            } else {
              setEmailError("");
            }
          }}
        />

        {emailError && (
          <span className="popup__error email-error">{emailError}</span>
        )}
      </fieldset>

      <fieldset className="popup__fieldset">
        <p className="popup__input-name">Senha</p>
        <input
          className="popup__input"
          name="password"
          type="password"
          placeholder="Insira a senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setAuthError("");
          }}
          required
        />
      </fieldset>

      <div className="popup__submit-container">
        <button
          className="popup__submit-button"
          type="submit"
          disabled={!isFormValid}
        >
          Entrar
        </button>

        {authError && <span className="popup__submit-error">{authError}</span>}
      </div>

      <p className="popup__info-text">
        ou{" "}
        <button
          className="popup__info-button"
          type="button"
          onClick={() => {
            onClose();
            onOpenRegister();
          }}
        >
          inscreva-se
        </button>
      </p>
    </form>
  );
}

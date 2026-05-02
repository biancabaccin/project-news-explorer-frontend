import { useState } from "react";

export default function Login({ onClose, onOpenRegister }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() && password.trim() && !emailError;

  function handleSubmit(e) {
    e.preventDefault();

    const emailInput = e.target.elements.email;
    const isValid = emailInput.validity.valid;

    if (!isValid) {
      setEmailError("Invalid email address");
      return;
    }

    setEmailError("");
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
            setEmail(e.target.value);
            if (!e.target.validity.valid) {
              setEmailError("");
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
          onChange={(e) => setPassword(e.target.value)}
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

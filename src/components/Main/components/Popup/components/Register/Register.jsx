import { useState } from "react";

export default function Register({
  onClose,
  onOpenLogin,
  onOpenTooltip,
  onRegister,
}) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const isFormValid = email.trim() && password.trim() && username.trim();

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitError("");

    if (emailError) return;

    if (password.length < 8) {
      setSubmitError("The password must be at least 8 characters long");
      return;
    }

    const result = onRegister({
      username,
      email,
      password,
    });

    if (!result.success) {
      setSubmitError(result.message);
      return;
    }

    onClose();
    onOpenTooltip();
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
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </fieldset>

      <fieldset className="popup__fieldset">
        <p className="popup__input-name">Nome de usuário</p>

        <input
          className="popup__input"
          name="username"
          type="text"
          placeholder="Insira seu nome de usuário"
          minLength={2}
          maxLength={30}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </fieldset>

      <div className="popup__submit-container">
        <button
          className="popup__submit-button"
          type="submit"
          disabled={!isFormValid}
        >
          Inscrever-se
        </button>

        {submitError && (
          <span className="popup__submit-error">{submitError}</span>
        )}
      </div>

      <p className="popup__info-text">
        ou{" "}
        <button
          className="popup__info-button"
          type="button"
          onClick={() => {
            onClose();
            onOpenLogin();
          }}
        >
          Entre
        </button>
      </p>
    </form>
  );
}

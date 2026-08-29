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
  const [name, setName] = useState("");

  const isFormValid = email.trim() && password.trim() && name.trim();

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitError("");

    if (emailError) return;

    if (password.length < 8) {
      setSubmitError("The password must be at least 8 characters long");
      return;
    }

    const result = await onRegister({
      name,
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
          placeholder="Insert email"
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
          placeholder="Password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </fieldset>

      <fieldset className="popup__fieldset">
        <p className="popup__input-name">Username</p>

        <input
          className="popup__input"
          name="name"
          type="text"
          placeholder="Insert your username"
          minLength={2}
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </fieldset>

      <div className="popup__submit-container">
        <button
          className="popup__submit-button"
          type="submit"
          disabled={!isFormValid}
        >
          Sign up
        </button>

        {submitError && (
          <span className="popup__submit-error">{submitError}</span>
        )}
      </div>

      <p className="popup__info-text">
        or{" "}
        <button
          className="popup__info-button"
          type="button"
          onClick={() => {
            onClose();
            onOpenLogin();
          }}
        >
          Log in
        </button>
      </p>
    </form>
  );
}

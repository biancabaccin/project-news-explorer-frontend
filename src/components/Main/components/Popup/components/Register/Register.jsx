import { useState, useEffect } from "react";

export default function Register({
  onClose,
  onOpenLogin,
  onOpenTooltip,
  onRegister = { onRegister },
}) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [emailAvailable, setEmailAvailable] = useState(true);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const isFormValid =
    email.trim() &&
    password.trim() &&
    username.trim() &&
    !emailError &&
    emailAvailable;

  async function checkEmailAvailability(emailToCheck) {
    setCheckingEmail(true);
    await new Promise((resolve) => setTimeout(resolve));
    setCheckingEmail(false);

    const usedEmails = ["teste@gmail.com", "admin@example.com"];
    return !usedEmails.includes(emailToCheck.toLowerCase());
  }

  useEffect(() => {
    if (email) {
      checkEmailAvailability(email).then((available) => {
        setEmailAvailable(available);
        if (!available) {
          setEmailError("");
        } else {
          setEmailError("");
        }
      });
    } else {
      setEmailAvailable(true);
      setEmailError("");
    }
  }, [email]);

  function handleSubmit(e) {
    e.preventDefault();

    const emailInput = e.target.elements.email;
    const isValid = emailInput.validity.valid;

    if (!isValid) {
      setEmailError("Invalid email address");
      return;
    }

    if (!emailAvailable) {
      setEmailError("Este e-mail não está disponível");
      return;
    }

    setEmailError("");

    if (onRegister) {
      onRegister({ username, email, password });
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

      <fieldset className="popup__fieldset">
        <p className="popup__input-name">Nome de usuário</p>
        <input
          className="popup__input"
          name="username"
          type="text"
          placeholder="Insira seu nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </fieldset>

      <div className="popup__submit-container">
        <button
          className="popup__submit-button"
          type="submit"
          disabled={!isFormValid || checkingEmail}
        >
          Insecrever-se
        </button>
        {!emailAvailable && (
          <span className="popup__submit-error">
            Este e-mail não está disponível
          </span>
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

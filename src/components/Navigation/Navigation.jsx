import "./Navigation.css";
import { Link } from "react-router-dom";
import logoutLight from "@src/images/Logout.svg";
import logoutDark from "@src/images/Logout_Dark.svg";

export default function Navigation({ variant }) {
  const logoutIcon = variant === "saved" ? logoutDark : logoutLight;

  return (
    <div className={`navigation ${variant ? `navigation--${variant}` : ""}`}>
      <Link to="/" className="navigation__link">
        Início
      </Link>

      <Link to="/saved-news" className="navigation__link">
        Artigos salvos
      </Link>

      <button className="navigation__signout-button">
        Fulana <img src={logoutIcon} alt="Logout" />
      </button>

      <button className="navigation__signin-button">Entrar</button>
    </div>
  );
}

import "./Navigation.css";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "@src/contexts/CurrentUserContext";
import logoutLight from "@src/images/Logout.svg";
import logoutDark from "@src/images/Logout_Dark.svg";

export default function Navigation({ variant, onOpenPopup, onLogout }) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  const logoutIcon = variant === "saved" ? logoutDark : logoutLight;

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`navigation ${variant ? `navigation--${variant}` : ""}`}>
      <Link
        to="/"
        className={`navigation__link ${isActive("/") ? "navigation__link--active" : ""}`}
      >
        Início
      </Link>

      {currentUser ? (
        <>
          <Link
            to="/saved-news"
            className={`navigation__link ${isActive("/saved-news") ? "navigation__link--active" : ""}`}
          >
            Artigos salvos
          </Link>

          <button
            className="navigation__signout-button"
            type="button"
            onClick={onLogout}
          >
            {currentUser.username} <img src={logoutIcon} alt="Logout" />
          </button>
        </>
      ) : (
        <button
          className="navigation__signin-button"
          type="button"
          onClick={() => onOpenPopup("login")}
        >
          Entrar
        </button>
      )}
    </div>
  );
}

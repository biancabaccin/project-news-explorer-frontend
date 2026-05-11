import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "./Navigation.css";

import CurrentUserContext from "@src/contexts/CurrentUserContext";
import logoutLight from "@src/images/Logout.svg";
import logoutDark from "@src/images/Logout_Dark.svg";
import mobileMenu from "@src/images/Toggle_Menu.svg";
import mobileMenuDark from "@src/images/Toggle_Menu_Dark.svg";
import closeMenuIcon from "@src/images/Close.svg";

export default function Navigation({ variant, onOpenPopup, onLogout }) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  const logoutIcon = variant === "saved" ? logoutDark : logoutLight;
  const menuIcon = variant === "saved" ? mobileMenuDark : mobileMenu;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  return (
    <div className={`navigation ${variant ? `navigation--${variant}` : ""}`}>
      <button
        className="navigation__mobile-menu"
        type="button"
        onClick={toggleMenu}
      >
        <img
          className="navigation__mobile-icon"
          src={isMenuOpen ? closeMenuIcon : menuIcon}
          alt="Menu Button"
        />
      </button>

      <div
        className={`navigation__menu ${isMenuOpen ? "navigation__menu--open" : ""}`}
      >
        <Link
          to="/"
          className={`navigation__link ${isActive("/") ? "navigation__link--active" : ""}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Início
        </Link>

        {currentUser ? (
          <>
            <Link
              to="/saved-news"
              className={`navigation__link ${isActive("/saved-news") ? "navigation__link--active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Artigos salvos
            </Link>

            <button
              className="navigation__signout-button"
              type="button"
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
            >
              {currentUser.username}{" "}
              <img
                className="navigation__singout-image"
                src={logoutIcon}
                alt="Logout"
              />
            </button>
          </>
        ) : (
          <button
            className="navigation__signin-button"
            type="button"
            onClick={() => {
              onOpenPopup("login");
              setIsMenuOpen(false);
            }}
          >
            Entrar
          </button>
        )}
      </div>
    </div>
  );
}

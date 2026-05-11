import { Link } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

export default function Header({
  variant,
  onOpenPopup,
  currentUser,
  onLogout,
}) {
  return (
    <header className={`header ${variant ? `header--${variant}` : ""}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>

        <Navigation
          variant={variant}
          onOpenPopup={onOpenPopup}
          currentUser={currentUser}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
}

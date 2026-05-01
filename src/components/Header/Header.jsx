import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header({ variant }) {
  return (
    <header className={`header ${variant ? `header--${variant}` : ""}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>

        <Navigation variant={variant} />
      </div>
    </header>
  );
}

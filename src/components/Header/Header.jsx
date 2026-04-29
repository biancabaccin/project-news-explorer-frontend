import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">
            NewsExplorer
          </Link>

          <Navigation />
        </div>
      </header>
    </>
  );
}

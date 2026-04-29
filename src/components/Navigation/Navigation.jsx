import { Link } from "react-router-dom";
import logoutIcon from "@src/images/Logout.svg";

export default function Navigation() {
  return (
    <div className="navigation">
      <Link to="/" className="navigation__link">
        Início
      </Link>

      <Link to="/" className="navigation__link">
        Artigos salvos
      </Link>

      <button className="navigation__signout-button">
        Fulana <img src={logoutIcon} alt="Logout" />
      </button>

      <button className="navigation__signin-button">Entrar</button>
    </div>
  );
}

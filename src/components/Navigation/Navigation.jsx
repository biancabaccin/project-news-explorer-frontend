// import "./Navigation.css";
// import { Link } from "react-router-dom";
// import logoutLight from "@src/images/Logout.svg";
// import logoutDark from "@src/images/Logout_Dark.svg";

// export default function Navigation({
//   variant,
//   onOpenPopup,
//   currentUser,
//   onLogout,
// }) {
//   const logoutIcon = variant === "saved" ? logoutDark : logoutLight;

//   return (
//     <div className={`navigation ${variant ? `navigation--${variant}` : ""}`}>
//       <Link to="/" className="navigation__link">
//         Início
//       </Link>

//       {currentUser && (
//         <Link to="/saved-news" className="navigation__link">
//           Artigos salvos
//         </Link>
//       )}

//       {currentUser ? (
//         <button
//           className="navigation__signout-button"
//           type="button"
//           onClick={onLogout}
//         >
//           {currentUser.username} <img src={logoutIcon} alt="Logout" />
//         </button>
//       ) : (
//         <button
//           className="navigation__signin-button"
//           type="button"
//           onClick={() => onOpenPopup("login")}
//         >
//           Entrar
//         </button>
//       )}
//     </div>
//   );
// }

import "./Navigation.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "@src/contexts/CurrentUserContext";
import logoutLight from "@src/images/Logout.svg";
import logoutDark from "@src/images/Logout_Dark.svg";

export default function Navigation({ variant, onOpenPopup, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const logoutIcon = variant === "saved" ? logoutDark : logoutLight;

  return (
    <div className={`navigation ${variant ? `navigation--${variant}` : ""}`}>
      <Link to="/" className="navigation__link">
        Início
      </Link>

      {currentUser ? (
        <>
          <Link to="/saved-news" className="navigation__link">
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

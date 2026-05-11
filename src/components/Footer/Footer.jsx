import "./Footer.css";
import { Link } from "react-router-dom";
import githubIcon from "@src/images/Github_Icon.svg";
import facebookIcon from "@src/images/Facebook_Icon.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          &copy; 2021 Supersite, desenvolvido pela News API
        </p>

        <div className="footer__navigation">
          <div className="footer__link-box">
            <Link to="/" className="footer__link footer__link-home">
              Início
            </Link>
            <a
              href="https://tripleten.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              TripleTen
            </a>
          </div>

          <div className="footer__icon-box">
            <a
              href="https://github.com/biancabaccin"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__icon-link"
            >
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a
              href="https://www.facebook.com/tripleten.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__icon-link"
            >
              <img src={facebookIcon} alt="Facebook" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

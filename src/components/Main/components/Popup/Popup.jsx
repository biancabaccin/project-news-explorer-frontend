import { useEffect } from "react";
import "./Popup.css";
import closeButton from "@src/images/Close.svg";

export default function Popup(props) {
  const { title, children, onClose } = props;

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Close Modal"
          type="button"
          onClick={onClose}
        >
          <img src={closeButton} alt="CloseButton" />
        </button>

        <h3 className="popup__title">{title}</h3>

        {children}
      </div>
    </div>
  );
}

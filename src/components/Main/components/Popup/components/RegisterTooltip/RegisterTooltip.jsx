export default function RegisterTooltip({ onClose, onOpenLogin }) {
  return (
    <div className="popup__container">
      <button
        className="popup__tooltip-button"
        type="button"
        onClick={() => {
          onClose();
          onOpenLogin();
        }}
      >
        Entrar
      </button>
    </div>
  );
}

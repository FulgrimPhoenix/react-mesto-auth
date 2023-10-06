import OK from './OK.svg'

function StatusPopup({ onClose, isOpen, name, title }) {
  return (
    <div
      className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}
      id={`popup-${name}`}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__exit"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <img src={OK} />
      </div>
    </div>
  );
}

export default StatusPopup;

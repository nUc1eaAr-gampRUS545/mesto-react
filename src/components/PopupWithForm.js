import React from "react";
export default function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
}) {
  return (
    <div
      className={
        isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`
      }
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__exit"
          onClick={onClose}
        ></button>
        <form className="popup__content">
          <h2 className="popup__title ">{title}</h2>
          {children}
          <button type="submit" className="popup__saved">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

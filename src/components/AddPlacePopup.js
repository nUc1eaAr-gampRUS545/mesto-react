import React from "react";
import PopupWithForm from "./PopupWithForm.js";

 export default function AddPlacePopup({onClose,isOpen,onAddPlaceSubmit}){
    const cardNameRef=React.useRef();
const linkRef=React.useRef();
    function handleSubmit(evt){
        evt.preventDefault();
        onAddPlaceSubmit({name:cardNameRef.current.value,link:linkRef.current.value})
    }
    return(<PopupWithForm
        name="type_add-cards"
        title="Новое место"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        submitText='Сохранить'
      >
        <label className="popup__form">
          <input
            className="popup__input popup__input_type_add-cards"
            id="text"
            name="name"
            minLength="2"
            required
            maxLength="40"
            type="text"
            ref={cardNameRef}
            placeholder="Название"
          />
          <span className="popup__message-error popup__message-error_text"></span>
        </label>
        <label className="popup__form">
          <input
            id="url"
            className="popup__input popup__input_type_add-cards"
            required
            name="link"
            type="url"
            ref={linkRef}
            placeholder="Ссылка на картинку"
          />
          <span className="popup__message-error popup__message-error_url"></span>
        </label>
      </PopupWithForm>)
 }
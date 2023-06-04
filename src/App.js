import React from "react";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import PopupWithForm from "./components/PopupWithForm.js";
import ImagePopup from "./components/ImagePopup.js";


import Footer from "./components/Footer.js";
function App() {
  const [isEditProfilePopupOpen,setIsEditProfilePopupOpen]=React.useState(false);
  const [isAddPlacePopupOpen,setIsAddPlacePopupOpen]=React.useState(false);
  const [isEditAvatarPopupOpen,setIsEditAvatarPopupOpen]=React.useState(false);
  const [isEditImagePopupOpen,setIsEditImagePopupOpen]=React.useState(false);
  const [selectedCard,setSelectedCard]=React.useState(null)
  const handleEditProfileClick=()=>{
    setIsEditProfilePopupOpen(true)
}
const closeAllPopups=()=>{
  setSelectedCard(null);
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setIsEditAvatarPopupOpen(false);

}
const handleCardClick = (card) => {
  setSelectedCard(card);
}
const handleAddPlaceClick=()=>{
   setIsAddPlacePopupOpen(true)
}
const handleEditAvatarClick=()=>{
    setIsEditAvatarPopupOpen(true)
}
  return (
  <div className='page'>
    <Header/>
    <Main 
    onEditProfile={setIsEditProfilePopupOpen}
    onAddPlace={setIsAddPlacePopupOpen}
    onEditAvatar={setIsEditAvatarPopupOpen}
    onCardClick={setSelectedCard}/>
    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

    <Footer/>
    <PopupWithForm 
     name="type_profile"
     title='Редактировать профиль'
     isOpen={isEditProfilePopupOpen}
     onClose={closeAllPopups}
    ><label className="popup__form">
          <input className="popup__input popup__input_type_profile" minLength="2" required  maxLength="40" id="name" name="name" type="text" placeholder="Имя"/>
          <span className="popup__message-error popup__message-error_name"></span></label>
          <label className="popup__form">
          <input className="popup__input popup__input_type_profile" minLength="2" required  maxLength="200" id="job" name="job" type="text" placeholder="Работа"/>
          <span className="popup__message-error popup__message-error_job"></span></label></PopupWithForm>
    <PopupWithForm 
    name='type_add-cards'
    title='Новое место'
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
    >
    <label className="popup__form">
          <input className="popup__input popup__input_type_add-cards" id="text" name="name" minLength="2" required  maxLength="40" type="text" placeholder="Название"/>
          <span className="popup__message-error popup__message-error_text"></span></label>
          <label className="popup__form">
          <input id="url" className="popup__input popup__input_type_add-cards" required name="link" type="url" placeholder="Ссылка на картинку"/>
          <span className="popup__message-error popup__message-error_url"></span></label>
    </PopupWithForm>
    <PopupWithForm
    name='type_profile-change'
    title='Обновить аватар'
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}>
<label className="popup__form">
          <input className="popup__input popup__input_type_profile-change" id="avatar" name="avatar" type="url" required placeholder="Ссылка"/>
          <span className="popup__message-error popup__message-error_avatar"></span></label>
    </PopupWithForm>




  </div>
  );
}

export default App;

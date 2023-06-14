import React from "react";
import api from "../utils/api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
function App() {
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .setLikes(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const handleEditDeleteCardClick = (card) => {
    api.deleteCard(card._id).then((res) => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    }).catch(
      (err) => {
        console.error(err);
      }
    );
  };
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    api
      .getInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  },{});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditDeleteCardPopupOpen, setIsEditDeleteCardPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditImagePopupOpen, setIsEditImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const closeAllPopups = () => {
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditDeleteCardPopupOpen(false);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  function handleUpdateUser(i) {
    api
      .replaceInfo(i)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
    
  }
  function handleUpdateAvatar(i) {
    api
      .changeProfile(i)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
    
  }
  function handleAddPlaceSubmit(newCard) {
    api
      .addMyCards(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
   
  }
  function handleDeleteCard(data) {
    api
      .deleteCard(data)
      .then((items) => {
        setCards([items, ...cards]);
      })
      .catch((err) => {
        console.error(err);
      });
    closeAllPopups();
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onDeleteCard={handleEditDeleteCardClick}
          cards={cards}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <DeleteCardPopup
          isOpen={isEditDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

import React from "react";
import api from "../utils/api";
import Card from "./Card";
import addButton from "../images/profile/addBotton.svg";
function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api
      .getInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => {
        console.error(err);
      });
  });
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
  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-button"
          onClick={onEditAvatar}
        >
          <img className="profile__avatar" src={userAvatar} alt="Иконка" />
        </button>

        <div className="profile__info">
          <div className="profile__info-block">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button className="profile__button" type="button" onClick={onAddPlace}>
          <img
            className="profile__add-button"
            src={addButton}
            alt="кнопка 'Добавить'"
          />
        </button>
      </section>
      <ul className="elements">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={onCardClick} />
        ))}
      </ul>
    </main>
  );
}
export default Main;

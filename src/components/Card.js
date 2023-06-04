import React from "react";
export default function Card({ card, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(card); // или props.onCardClick(card)
  };
  return (
    
      <article className="card">
        <img
          className="card__photography"
          src={`${card.link}`}
          alt={`${card.name}`}
          onClick={handleCardClick}
        />
        <div className="card__info">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__group">
            <button className="card__button" type="button"></button>
            <h3 className="card__likes" id="countLikes">
              {card.likes.length}
            </h3>
          </div>
        </div>
        <button className="card__bascket"></button>
      </article>
    
  );
}

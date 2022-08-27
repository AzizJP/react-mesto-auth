import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <img
        className="card__image"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like_group">
          <button
            type="button"
            className={`card__like ${isLiked ? "card__like_active" : ""}`}
            aria-label="Оценить"
            onClick={handleLikeClick}
          ></button>
          <h3 className="card__like_number">{props.likes}</h3>
        </div>
        <button
          type="button"
          className={`${!isOwn ? "card__trash_hidden" : "card__trash"}`}
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      </div>
    </article>
  );
}
export default React.memo(Card);

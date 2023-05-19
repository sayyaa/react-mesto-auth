import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, _id, name, link, onCardClick, onCardLike, onCardDelete }) {
  // подписываем компонент Card на контекст
  const currentUser = useContext(CurrentUserContext);

  // определяем, являемся ли мы владельцем текущей карточки;
  const isOwn = card.owner._id === currentUser._id;

  // определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(person => person._id === currentUser._id);
  
  const cardLikeButtonClassName = (`content__like ${isLiked && 'content__like_active'}`);

  // при клике по карточке запускается функция, которую мы передали в пропс onCardClick компонента Card в Main.
  function handleClick() {
    onCardClick(card);
  }

  // обработчик клика по лайку
  function handleLikeClick() {
    // вызывает onCardLike с аргументом card
    onCardLike(card)
  }

  // обработчки клика удаления карточки
  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
      <li key={_id} className="content__card" aria-label="Карточка Места">
        <img
          src={link}
          alt={name}
          className="content__img"
          onClick={handleClick}
        />
        {/* добавляем корзину только на карточки добавленные нами */}
        {isOwn && (
          <button
            className="content__bin button"
            aria-label="Удалить карточку"
            onClick={handleDeleteClick}
          ></button>
        )}
        <div className="content__main-container">
          <div className="content__name-wrapper">
            <h2 className="content__card-name">
              {/* <!-- Имя карточки --> */}
              {name}
            </h2>
          </div>
          <div className="content__like-counter-wrapper">
            <button
              className={`${cardLikeButtonClassName} button`}
              aria-label="Поставить лайк"
              onClick={handleLikeClick}
            >
              {/* <!-- кнопка лайка - сердечко --> */}
            </button>
            <p className="content__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
  );
}

export default Card;

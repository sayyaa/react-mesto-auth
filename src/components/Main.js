import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import { useContext } from "react";
import Footer from "./Footer";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {

  // подписываем компонент на контекст
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="hero">
        <div onClick={onEditAvatar} className="hero__profile">
          <img
            src={currentUser.avatar}
            alt="Фотография пользователя"
            className="hero__img"
          />
        </div>
        <div className="hero__wrapper">
          <h1 className="hero__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="hero__edit button"
            type="button"
            aria-label="Редактировать профиль"
          ></button>
          <p className="hero__description">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="hero__add button"
          type="button"
          aria-label="Добавить карточку места"
        ></button>
      </section>
      <section aria-label="Карточки мест">
      <ul className="content">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            name={card.name}
            link={card.link}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
        </ul>
      </section>
      <Footer />
    </main>
  );
}

export default Main;

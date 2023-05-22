import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";

import { Routes, Route, Navigate } from "react-router-dom";

// импорт объекта контекста
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  // стейт переменная, в которой хранится массив карточек
  const [cards, setCards] = useState([]);

  // стейт переменная, в которой хранится имя и ссылка выбранной карточки
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  // стейт переменная, отвечающая за состояние открытие попапа профиля
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);

  // стейт переменная, отвечающая за состояние открытие попапа добавления карточки
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

  // стейт переменная, отвечающая за состояние открытие попапа аватара
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  // переменная состояния, хранящая объект информации о пользователе
  const [currentUser, setCurrentUser] = useState("");

  // стейт переменная статуса пользователя (авторизирован или нет)

  const [loggedIn, setLoggedIn] = useState(true)

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([profileData, cardsData]) => {
        // записываем объект с информацией о пользователе в переменную состояния currentUser;
        setCurrentUser(profileData);
        // добавляем карточки в массив cards
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при клике на карточку в стейт selectedCard добавляется ее имя и ссылка
  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  // функция отвечающася за постановку/снятие лайка при клике на карточку

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((person) => person._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        // state - массив карточек, который был в переменной cards. Проходим по массиву объектов и обновляем объект в стейте на который мы поставили лайк
        setCards((state) =>
          state.map((el) => (el._id === card._id ? newCard : el))
        );
      })
      .catch((err) => console.warn(err));
  }

  // функция удаления карточки

  function handleCardDelete(card) {
    // обращаемся к api и удаляем карточку. Далее записываем в стейт для перерисовки карточек новый массив полученный по следующим условиям: если id карточки в стейте не равно id карточки, которую удаляем,то оставляем ее в массиве
    api
      .deleteCards(card._id)
      .then(() =>
        setCards((state) => state.filter((el) => el._id !== card._id))
      )
      .catch((err) => console.log(err));
  }

  // функция открытия попапа ПРОФИЛЯ

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  // функция открытия попапа ДОБАВЛЕНИЯ КАРТОЧКИ

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  // функция открытия попапа АВАТАРА

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  // функция обработчик, закрывающая все попапы

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  // функция обработчик, при сабмите формы РЕДАКТИРОВАНИЯ ПРОФИЛЯ отправляет данные из нее на сервер, после полученный новый объект пользователя записывается в переменную состояния CurrentUser для обновления контекста, при удачном ответе от сервера закрывает попап

  function handleUpdateUser({ name, about }) {
    api
      .editProfileData({ name, about })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setEditProfilePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  // функция обработчик, при сабмите формы ОБНОВЛЕНИЯ АВАТАРА отправляет данные из нее на сервер, после полученный новый объект пользователя записывается в переменную состояния CurrentUser для обновления контекста, при удачном ответе от сервера закрывает попап

  function handleUpdateAvatar({ avatar }) {
    api
      .setProfileAvatar({ avatar })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setEditAvatarPopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  // функция обработчик, при сабмите формы ДОБАВЛЕНИЯ КАРТОЧКИ отправляет данные из нее на сервер, создает новый массив карточек вместе с добавленной только что и сохраняет в стейт сards, при удачном ответе от сервера закрывает попап

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCardData) => {
        setCards([newCardData, ...cards]);
        setAddPlacePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />
        <Routes>
          <Route
            path="/"
            element={!loggedIn ? <Navigate to='/sign-in' replace /> : 
            <Main
              cards={cards}
              userName={currentUser.name}
              userDescription={currentUser.about}
              userAvatar={currentUser.avatar}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
          />
          && <Footer />
        } />
          <Route path="/sign-up" />
          <Route path="/sign-in" element={<Login />}/>
        </Routes>
        {/* <Main
          cards={cards}
          userName={currentUser.name}
          userDescription={currentUser.about}
          userAvatar={currentUser.avatar}
          onCardClick={handleCardClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        /> */}
        {/* <Footer /> */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* попап редактирования профиля */}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* попап с аватаром */}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* попап карточки */}

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewCard={handleAddPlaceSubmit}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

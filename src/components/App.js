import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/auth";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

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

  // стейт переменная, отвечающая за состояние открытие попапа уведомления о статусе регистрации
  const [isEditInfoTooltipOpen, setEditInfoTooltipOpen] = useState(false);

  // стейт переменная, отвечающая за текст внутри открытого попапа уведомления о статусе регистрации (true: удачно, false: ошибка) и за текст внутри этого попапа
  const [infoTooltipData, setInfoTooltipData] = useState({status: null, text: ''})

  // переменная состояния, хранящая объект информации о пользователе
  const [currentUser, setCurrentUser] = useState("");

  // стейт переменная статуса пользователя (авторизирован или нет)
  const [loggedIn, setLoggedIn] = useState(false);

  // стейт переменная, хранит значение email пользователя для шапки сайта
  const [email, setEmail] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([profileData, cardsData]) => {
          // записываем объект с информацией о пользователе в переменную состояния currentUser;
          setCurrentUser(profileData);
          // добавляем карточки в массив cards
          setCards(cardsData);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

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
    setEditInfoTooltipOpen(false);
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

  // при регистрации делаем запрос к серверу c данными, если приходит положительный ответ от сервера уведомляем пользователя и перенаправляем на страницу входа

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          // при успешном ответе показываем попап успеха
          successInfoTooltip();
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        // при неудачном ответе показываем попап ошибки
        errorInfoTooltip();
        console.log(err);
      });
  }

  // при входе делаем запрос к серверу с нашими данными, получаем объект, если токен верен авторизируем пользователя и перенаправляем на главную страницу
  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        errorInfoTooltip();
        console.log(err);
      });
  }

  // проверка jwt токена

  const navigate = useNavigate();

  // если у пользователя есть токен в localStorage, эта функция проверит, действующий он или нет

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email || "");
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    }
  };

  // при входе в систему проверяем токен
  useEffect(() => {
    // проверяем наличие jwt токена
    tokenCheck();
  }, [loggedIn]);

  // функция, открывает инфо-попап с УСПЕШНОЙ регистрацией
  function successInfoTooltip() {
    setInfoTooltipData({status: true, text: "Вы успешно зарегистрировались!"})
    setEditInfoTooltipOpen(true);
  }

  // функция, открывает инфо-попап с ОШИБКОЙ регистрации
  function errorInfoTooltip() {
    setInfoTooltipData({status: false, text: "Что-то пошло не так! Попробуйте ещё раз."})
    setEditInfoTooltipOpen(true);
  }

  // функция выхода из аккаунта, удаляет jwt токен из локального хранилища
  const logOut = () => {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    navigate("/sign-in", { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header userEmail={email} onSignOut={logOut} />
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
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
            }
          />

          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>

        <InfoTooltip
          isOpen={isEditInfoTooltipOpen}
          onClose={closeAllPopups}
          infoTooltipData={infoTooltipData}
        />

        {/* попап открытия изображения каточки */}
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

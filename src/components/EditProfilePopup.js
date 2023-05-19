import React from "react";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import {
  inputNameProps,
  inputOccupationProps,
} from "../utils/inputsPropsConstants";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // переменная состояния хранящая имя профиля
  const [name, setName] = useState("");

  // переменная состояния хранящая описание профиля
  const [description, setDescription] = useState("");

  // Обработчик изменения инпута обновляет стейт name
  function handleChangeNameInput(e) {
    setName(e.target.value);
  }

  // Обработчик изменения инпута обновляет стейт name
  function handleChangeDescriptionInput(e) {
    setDescription(e.target.value);
  }

  // подписываемся на контекст
  const currentUser = useContext(CurrentUserContext);

  // при изменении объекта с данными пользователя и состояния открытия попапа, устанавливаем значения в стейт переменные, чтобы при открытии попапа данные были в инпуте
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // функция обработчик, сбрасывает действие по умолчанию для формы и передает значения name и about в функцию handleUpdateUser компонента App.js для запроса к серверу, чтобы изменить данные пользователя

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }


  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
      title="Редактировать профиль"
      name="edit-profile"
      firstProps={inputNameProps}
      secondProps={inputOccupationProps}
    >
      <input
        className={`form__input form__input_${inputNameProps.classTag}`}
        id={inputNameProps.id}
        name={inputNameProps.inputName}
        type={inputNameProps.type}
        placeholder={inputNameProps.placeholder}
        minLength={inputNameProps.minLength}
        maxLength={inputNameProps.maxLength}
        value={name || ''}
        onChange={handleChangeNameInput}
        required
      />
      <span
        className={`form__input-error ${inputNameProps.inputName}-input-error`}
      ></span>
      <input
        className={`form__input form__input_${inputOccupationProps.classTag}`}
        id={inputOccupationProps.id}
        name={inputOccupationProps.inputName}
        type={inputOccupationProps.type}
        placeholder={inputOccupationProps.placeholder}
        minLength={inputOccupationProps.minLength}
        maxLength={inputOccupationProps.maxLength}
        value={description || ''}
        onChange={handleChangeDescriptionInput}
        required
      />
      <span
        className={`form__input-error ${inputOccupationProps.inputName}-input-error`}
      ></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

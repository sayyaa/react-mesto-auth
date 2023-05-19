import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import {
  inputCityProps,
  inputCityLinkProps,
} from "../utils/inputsPropsConstants";

function AddPlacePopup({ isOpen, onClose, onAddNewCard }) {
  // объявляем стейт переменную cardName
  const [cardName, setCardName] = useState("");

  // объявляем стейт переменную cardLink
  const [cardLink, setCardLink] = useState("");

  // меняем переменную состояния cardName при изменении value инпута
  function handleChangeCardNameInput(e) {
    setCardName(e.target.value);
  }

  // меняем переменную состояния cardLink при изменении value инпута
  function handleChangeCardLinkInput(e) {
    setCardLink(e.target.value);
  }

  // функция сабмита формы
  function handleSubmit(e) {
    //сбрасываем состояние по умолчанию
    e.preventDefault();

    // при сабмите формы получаем значения инпутов (имя карточки и ссылку), и передаем в качестве параметра в функцию handleAppPlaceSubmit компонента App.js
    onAddNewCard({
      name: cardName,
      link: cardLink,
    });
  }
  // cбрасываем инпуты при открытии(монтировании) попапа
  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Добавить"
      title="Новое место"
      name="add-card"
      secondProps={inputCityLinkProps}
    >
      <input
        className={`form__input form__input_${inputCityProps.classTag}`}
        id={inputCityProps.id}
        name={inputCityProps.inputName}
        type={inputCityProps.type}
        placeholder={inputCityProps.placeholder}
        minLength={inputCityProps.minLength}
        maxLength={inputCityProps.maxLength}
        value={cardName || ""}
        onChange={handleChangeCardNameInput}
        required
      />
      <span
        className={`form__input-error ${inputCityProps.inputName}-input-error`}
      ></span>
      <input
        className={`form__input form__input_${inputCityLinkProps.classTag}`}
        id={inputCityLinkProps.id}
        name={inputCityLinkProps.inputName}
        type={inputCityLinkProps.type}
        placeholder={inputCityLinkProps.placeholder}
        minLength={inputCityLinkProps.minLength}
        maxLength={inputCityLinkProps.maxLength}
        value={cardLink || ""}
        onChange={handleChangeCardLinkInput}
        required
      />
      <span
        className={`form__input-error ${inputCityLinkProps.inputName}-input-error`}
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

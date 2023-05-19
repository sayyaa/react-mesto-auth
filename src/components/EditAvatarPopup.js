import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import {inputChangeAvatarProps} from '../utils/inputsPropsConstants';


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar
}) {
  // записываем объект, возвращаемый хуком в переменную
  const avatarRef = useRef('');

  // при сабмите формы, функция записывает значение инпута в объект {avatar: значение инпута} и передает параметр во внешний компонент App для изменения автара через api
  function handleSubmit(e) {
    // сбрасываем поведение по умалчанию
    e.preventDefault();

    // при сабмите получаем значение инпута и записываем в значение ключа avatar
    onUpdateAvatar( {
      avatar: avatarRef.current.value
    } 
  )
  // очищаем инпут
  avatarRef.current.value = '';
  }

    //СОЗДАЕМ ИСКУССВЕННУЮ ОШИБКУ
  // useEffect(() => {
  //   avatarRef.current.value = '';
  // }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Обновить'
      title="Обновить аватар"
      name="add-card"
    >
      <input
        className={`form__input form__input_${inputChangeAvatarProps.classTag}`}
        id={inputChangeAvatarProps.id}
        name={inputChangeAvatarProps.inputName}
        type={inputChangeAvatarProps.type}
        placeholder={inputChangeAvatarProps.placeholder}
        minLength={inputChangeAvatarProps.minLength}
        maxLength={inputChangeAvatarProps.maxLength}
        ref={avatarRef}
        required
      />
      <span
        className={`form__input-error ${inputChangeAvatarProps.inputName}-input-error`}
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

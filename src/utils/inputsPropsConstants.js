//объект, хранящий пропсы для инпута имени пользователя
export const inputNameProps = {
  classTag: "text_name",
  id: "text_name",
  inputName: "name",
  type: "text",
  placeholder: "Имя",
  minLength: "2",
  maxLength: "40",
};

// объект, хранящий пропсы для инпута описания пользователя
export const inputOccupationProps = {
  classTag: "text_occupation",
  id: "occupation-input",
  inputName: "about",
  type: "text",
  placeholder: "Чем занимаешься?",
  minLength: "2",
  maxLength: "200",
};

//объект, хранящий пропсы для инпута имени карточки
export const inputCityProps = {
  classTag: "text_city",
  id: "city-input",
  inputName: "name",
  type: "text",
  placeholder: "Название",
  minLength: "2",
  maxLength: "30",
};

//объект, хранящий пропсы для инпута ссылки на карточку
export const inputCityLinkProps = {
  classTag: "text_link",
  id: "url-input",
  inputName: "link",
  type: "url",
  placeholder: "Ссылка на картинку",
  minLength: "2",
};

//объект, хранящий пропсы для инпута изменения аватара
export const inputChangeAvatarProps = {
  classTag: "avatar-link",
  id: "avatar-input",
  inputName: "link",
  type: "url",
  placeholder: "Ссылка на изображение",
  minLength: "2",
};
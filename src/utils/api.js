class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getPromise(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибочка вышла: ${res.status}`);
  }

  // запрос информации о пользователе с сервера
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      this._getPromise
    );
  }

  // запрос карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      this._getPromise
    );
  }

  // редактирование профиля

  editProfileData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getPromise);
  }

  // замена аватара

  setProfileAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getPromise);
  }

  //Добавление новой карточки

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getPromise);
  }

  // удаление карточки

  deleteCards(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getPromise);
  }

  // переключатель состояния лайков

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._getPromise);
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getPromise);
    }
  }

  //   // поставить лайк

  //   setLike(cardId) {
  //     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //       method: 'PUT',
  //       headers: this._headers,
  //     }).then(this._getPromise)
  //   }

  //     // удалить лайк

  //     removeLike(cardId) {
  //       return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //         method: 'DELETE',
  //         headers: this._headers,
  //       }).then(this._getPromise)
  //     }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-57",
  headers: {
    authorization: "92fe6ed7-0e7c-46b8-933e-0c04fe04b6bf",
    "Content-Type": "application/json",
  },
});

export default api;

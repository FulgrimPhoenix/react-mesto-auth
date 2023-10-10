class Api {
  constructor({ baseUrl, authorization }) {
    this._url = baseUrl;
    this._authorization = authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCardsInfo(JWT) {
    return fetch(this._url + "cards", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }

  getMyUserInfo(JWT) {
    return fetch(this._url + "users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }

  editProfileInfo(name, about, JWT) {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(name, link, JWT) {
    return fetch(this._url + "cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id, JWT) {
    return fetch(this._url + "cards/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }

  likeThisCard(id, JWT) {
    return fetch(this._url + "cards/" + id + "/likes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }

  unLikeThisCard(id, JWT) {
    return fetch( this._url + "cards/" + id + "/likes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }

  updateAvatar(link, JWT) {
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }
  registrate(email, password, JWT) {
    return fetch("https://auth.nomoreparties.co/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
      }),
    }).then(this._checkResponse);
  }

  login(email, password, JWT) {
    return fetch("https://auth.nomoreparties.co/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }
  checkToken(JWT) {
    return fetch("https://auth.nomoreparties.co/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://auth.nomoreparties.co/"
});

export default api;

class Api {
  constructor({ baseUrl, authUrl }) {
    this._url = baseUrl;
    this._authUrl = authUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCardsInfo() {
    return fetch(this._url + "cards", {
      headers:
      {
        authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  getMyUserInfo() {
    return fetch(this._url + "users/me", {
      method: "GET",
      headers:
      {
        authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  editProfileInfo(name, about) {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers:
      {
        authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(name, link) {
    return fetch(this._url + "cards", {
      method: "POST",
      headers:
      {
        authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(this._url + "cards/" + id, {
      method: "DELETE",
      headers:
      {
        authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  likeThisCard(id) {
    return fetch(this._url + "cards/" + id + "/likes", {
      method: "PUT",
      headers:
      {
        authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  unLikeThisCard(id) {
    return fetch(this._url + "cards/" + id + "/likes", {
      method: "DELETE",
      headers:
      {
        authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse);
  }

  updateAvatar(link) {
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers:
      {
        authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }
  registrate(email, password) {
    return fetch(this._authUrl + "signup", {
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
    return fetch(this._authUrl + "signin", {
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
    return fetch(this._authUrl + "users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }
}


const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-73/',
  authUrl: 'https://auth.nomoreparties.co/',
})


export default api;

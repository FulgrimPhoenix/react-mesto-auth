class Api{
  constructor({baseUrl, authorization}){
    this._url = baseUrl;
    this._authorization = authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  getCardsInfo(){
    return fetch(this._url + 'cards', {
        headers: this._authorization
        })
        .then(this._checkResponse)
  }

  getMyUserInfo(){
    return fetch(this._url + 'users/me', {
      method: 'GET',
      headers: this._authorization
    })
    .then(this._checkResponse);
  }

  editProfileInfo(name, about){
    return fetch(this._url + 'users/me', {
      method: 'PATCH',
      headers: this._authorization,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(this._checkResponse);
  }

  addNewCard(name, link){
    return fetch(this._url + 'cards',{
      method: 'POST',
      headers: this._authorization,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this._checkResponse);
  }

  deleteCard(id){
    return fetch(this._url + 'cards/' + id,{
      method: 'DELETE',
      headers: this._authorization
    })
    .then(this._checkResponse);
  }

  likeThisCard(id){
    return fetch(this._url + 'cards/' + id + '/likes',{
      method: 'PUT',
      headers: this._authorization
    })
    .then(this._checkResponse);
  }

  unLikeThisCard(id){
    return fetch(this._url + 'cards/' + id + '/likes',{
      method: 'DELETE',
      headers: this._authorization
    })
    .then(this._checkResponse);
  }

  updateAvatar(link){
    return fetch (this._url + 'users/me/avatar',{
      method: 'PATCH',
      headers: this._authorization,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73/',
  authorization: {
    authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
    'Content-Type': 'application/json'
  }})

export default api
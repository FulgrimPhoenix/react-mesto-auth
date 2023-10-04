import "../App.css";
import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import Form from "./Form.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddCardPopupState] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupState] = React.useState(false);
  const [isImagePopupOpen, setImagePopupState] = React.useState(false);
  const [selectedCard, setCardData] = React.useState({ src: "", title: "" });
  const [cards, setCards] = React.useState([]);

  const [currentUser, setUserData] = React.useState({});
  //загрузка исходной информации
  React.useEffect(() => {
    Promise.all([api.getMyUserInfo(), api.getCardsInfo()])
      .then(([userInfo, cardList]) => {
        setUserData(userInfo);
        setCards(cardList);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleOpenImagePopup({ name, link }) {
    setImagePopupState(true);
    setCardData({ src: link, title: name });
  }

  function handleOpenProfilePopup() {
    setProfilePopupState(true);
  }
  function handleOpenAddCardPopup() {
    setAddCardPopupState(true);
  }
  function handleOpenAvatarPopup() {
    setAvatarPopupState(true);
  }
  //закрываем все модальные окна
  function closeAllPopups() {
    setCardData({ src: "", title: "" });
    setImagePopupState(false);
    setProfilePopupState(false);
    setAddCardPopupState(false);
    setAvatarPopupState(false);
  }

  //устанавливаем новый контекст и отправляем данные на сервер
  function handleUpdateUser(name, about) {
    api
      .editProfileInfo(name, about)
      .then((res) => {
        setUserData(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  //функционал обновления аватара
  function handleUpdateAvatar(link) {
    api
      .updateAvatar(link)
      .then((res) => {
        setUserData(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  //функционал карточек
  //удаление карточки
  function handleCardDelete(id) {
///////////////////////////////////////
    api.deleteCard(id)
      .then(() =>{
        setCards(cards => cards.filter((item) => {return item._id !== id})) 
      })
      .catch((err) => console.log(err));
  }
  //лайк карточки
  function handleLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    !isLiked
      ? api.likeThisCard(card._id).then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(err => console.log(err))
      : api.unLikeThisCard(card._id).then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(err => console.log(err))
  }

  //функция добавления карточки
  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link)
      .then((res) => setCards([res, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onCardDelete={handleCardDelete}
          onCardLike={handleLike}
          card={cards}
          setCardData={handleOpenImagePopup}
          onEditProfile={handleOpenProfilePopup}
          onAddPlace={handleOpenAddCardPopup}
          onEditAvatar={handleOpenAvatarPopup}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          key={`deleteCard`}
          name="delete-card"
          title="Вы уверены?"
          test={
            <Form
              key={`deleteCardPopup`}
              name={`deleteCardPopup`}
              submitButtonText="Да"
            />
          }
        />
        <ImagePopup
          key={`ImagePopup`}
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

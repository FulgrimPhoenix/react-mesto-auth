function MainContent() {
  return (
    <>
      <Header button="Выйти" />
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
    </>
  );
}

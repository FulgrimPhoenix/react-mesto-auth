import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import Form from "./Form";
import Input from "./Input";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const context = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(context.name);
  const [description, setDescription] = React.useState(context.description);

  React.useEffect(() => {
    setName(context.name);
    setDescription(context.about);
  }, [context, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="profile"
      title="Редактировать профиль"
      submit={handleSubmit}
      submitButtonText={"Сохранить"}
    >
      <Input
        key={"field-name"}
        value={name}
        getValue={handleNameChange}
        id="field-name"
        placeholder="Введите имя"
      />
      <Input
        key={"field-speciality"}
        value={description}
        getValue={handleDescriptionChange}
        id="field-speciality"
        placeholder="Введите специальность"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;

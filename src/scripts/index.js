import "../pages/index.css";
import { initialCards } from "./constants.js";
import { config } from "./constants.js";
import {
  placeAddHtml,
  popupTypeImage,
  popupAddImage,
  cardEditButton,
} from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

const popupList = document.querySelectorAll(".popup");
const profileEditPopup = document.querySelector(".popup_type_edit-profile");
const profileEditButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".popup__button-close");
const formElement = document.querySelector(".form-edit-profile");
const popupInputName = document.querySelector(".popup__input_type_name");
const popupInputAboutYourself = document.querySelector(
  ".popup__input_type_about-yourself"
);
const profileNameElement = document.querySelector(".profile__name");
const profileAboutYourselfElement = document.querySelector(
  ".profile__about-yourself"
);
//const сardEditPopup = document.querySelector(".popup_type_edit-card");
//const cardEditButton = document.querySelector(".profile__add-button");
const placeContainer = document.querySelector(".places");
const formEditProfile = document.querySelector(".form-edit-card");
const link = document.querySelector(".popup__input_type_picture-link");
const nameCard = document.querySelector(".popup__input_type_card-title");
const profileValidation = new FormValidator(config, formElement);
const newCardValidation = new FormValidator(config, formEditProfile);

/*export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}*/

/*function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

function closeByClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

function handleFormEdit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputName.value;
  profileAboutYourselfElement.textContent = popupInputAboutYourself.value;
  closePopup(profileEditPopup);
}

function addedNewPlace(card) {
  placeContainer.prepend(createCard(card));
}

function createCard(card) {
  const placeElement = new Card(card, "#template-place");
  return placeElement.generateCard();
}

function handleFormAdd(evt) {
  evt.preventDefault();
  addedNewPlace({ name: nameCard.value, link: link.value });
  closePopup(сardEditPopup);
}

popupList.forEach((popup) => popup.addEventListener("mousedown", closeByClick));

profileEditButton.addEventListener("click", () => {
  popupInputName.value = profileNameElement.textContent;
  popupInputAboutYourself.value = profileAboutYourselfElement.textContent;
  profileValidation.cleanError();
  openPopup(profileEditPopup);
});

cardEditButton.addEventListener("click", () => {
  nameCard.value = "";
  link.value = "";
  newCardValidation.cleanError();
  openPopup(сardEditPopup);
});

closeButtons.forEach((el) =>
  el.addEventListener("click", () => {
    const popup = el.closest(".popup");
    closePopup(popup);
  })
);

formElement.addEventListener("submit", handleFormEdit);

formEditProfile.addEventListener("submit", handleFormAdd);

profileValidation.enableValidation();
newCardValidation.enableValidation();

initialCards.forEach((card) => {
  addedNewPlace(card);
});*/

/*const placeList = new Section(
  {
    items: initialCards,
    renderer: function (item) {
      const place = new Card(item, "#template-place");
      const placeElement = place.generateCard();
      this.addItem(placeElement);
    },
  },
  ".places"
);*/

/*placeList.renderItems();

const popupTypeImage = document.querySelector(".popup_type_image");

const popupIncreaseImage = new PopupWithImage(popupTypeImage);
popupIncreaseImage.setEventListeners();

function handleCardClick(name, link) {
  popupIncreaseImage.open(name, link);
}*/

function createPlace(data) {
  const place = new Card(data, "#template-place", handleCardClick);
  return place.generateCard();
}

const placeList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      placeList.addItem(createPlace(item));
    },
  },
  placeAddHtml
);

const сardEditPopup = new PopupWithForm(popupAddImage, {
  handleSubmitForm: (data) => {
    placeList.addItem(createPlace(data));

    сardEditPopup.close();
  },
});
сardEditPopup.setEventListeners();

cardEditButton.addEventListener("click", () => {
  сardEditPopup.open();
});

placeList.renderItems();

const popupIncreaseImage = new PopupWithImage(popupTypeImage);
popupIncreaseImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupIncreaseImage.open(name, link);
};

import { initialCards } from './constants.js';
import { config } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__button-close');
const formElement = document.querySelector('.form-edit-profile');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAboutYourself = document.querySelector(
  '.popup__input_type_about-yourself'
);
const profileNameElement = document.querySelector('.profile__name');
const profileAboutYourselfElement = document.querySelector(
  '.profile__about-yourself'
);
const сardEditPopup = document.querySelector('.popup_type_edit-card');
const cardEditButton = document.querySelector('.profile__add-button');
const formList = document.querySelectorAll('.form');
const placeContainer = document.querySelector('.places');
const formEditProfile = document.querySelector('.form-edit-card');
const link = document.querySelector('.popup__input_type_picture-link');
const nameCard = document.querySelector('.popup__input_type_card-title');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('mousedown', closeByClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  document.removeEventListener('mousedown', closeByClick);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function closeByClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
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
  const placeElement = new Card(card, '#template-place');
  placeContainer.prepend(placeElement.generateCard());
}

function handleFormAdd(evt) {
  evt.preventDefault();
  addedNewPlace({ name: nameCard.value, link: link.value });
  closePopup(сardEditPopup);
}

profileEditButton.addEventListener('click', () => {
  popupInputName.value = profileNameElement.textContent;
  popupInputAboutYourself.value = profileAboutYourselfElement.textContent;
  new FormValidator(config, profileEditPopup).cleanError();
  openPopup(profileEditPopup);
});

cardEditButton.addEventListener('click', () => {
  nameCard.value = '';
  link.value = '';
  new FormValidator(config, сardEditPopup).cleanError();
  openPopup(сardEditPopup);
});

closeButtons.forEach((el) =>
  el.addEventListener('click', () => {
    const popup = el.closest('.popup');
    closePopup(popup);
  })
);

formElement.addEventListener('submit', handleFormEdit);

formEditProfile.addEventListener('submit', handleFormAdd);

formList.forEach((form) => {
  const validationForm = new FormValidator(config, form);
  validationForm.enableValidation();
});

initialCards.forEach((card) => {
  addedNewPlace(card);
});

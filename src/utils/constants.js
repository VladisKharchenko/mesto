export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const config = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error',
};

export const placeAddHtml = document.querySelector('.places');

export const popupTypeImage = '.popup_type_image';

export const profileEditPopup = '.popup_type_edit-profile';
export const profileEditButton = document.querySelector(
  '.profile__edit-button'
);
export const profileTitle = document.querySelector('.profile__name');
export const profileabout = document.querySelector('.profile__about-yourself');
export const titleUserProfile = document.querySelector('[name="title"]');
export const aboutUserProfile =
document.querySelector('[name="about"]');

export const popupAddImage = '.popup_type_edit-card';
export const cardEditButton = document.querySelector('.profile__add-button');

export const formEditProfile = document.querySelector('.form-edit-profile');
export const formEditCard = document.querySelector('.form-edit-card');

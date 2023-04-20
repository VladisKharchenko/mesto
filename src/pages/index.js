import './index.css';
import { initialCards } from '../utils/constants.js';
import {
  placeAddHtml,
  popupTypeImage,
  popupAddImage,
  cardEditButton,
  profileEditButton,
  profileEditPopup,
  profileTitle,
  profileabout,
  titleUserProfile,
  aboutUserProfile,
  formEditProfile,
  formEditCard,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import { Card } from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { config } from '../utils/constants.js';

const popupEditProfileValidator = new FormValidator(config, formEditProfile);
const popupAddCardValidator = new FormValidator(config, formEditCard);

const userInfoProfile = new UserInfo(profileTitle, profileabout);

const popupEditProfile = new PopupWithForm(profileEditPopup, {
  handleSubmitForm: (inputData) => {
    userInfoProfile.setUserInfo(inputData.title, inputData.about);
    popupEditProfile.close();
  },
});
popupEditProfile.setEventListeners();

function renderFormProfile() {
  const inputData = userInfoProfile.getUserInfo();
  titleUserProfile.value = inputData.title;
  aboutUserProfile.value = inputData.about;
  popupEditProfile.open();
  popupEditProfileValidator.cleanError();
};

profileEditButton.addEventListener('click', renderFormProfile);

const popupIncreaseImage = new PopupWithImage(popupTypeImage);
popupIncreaseImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupIncreaseImage.open({ name, link });
};

function createPlace(data) {
  const place = new Card(data, '#template-place', handleCardClick);
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

const popupAddCard = new PopupWithForm(popupAddImage, {
  handleSubmitForm: (data) => {
    placeList.addItem(createPlace(data));

    popupAddCard.close();
  },
});
popupAddCard.setEventListeners();

function renderFormСard() {
  popupAddCard.open();
  popupAddCardValidator.cleanError();
};

cardEditButton.addEventListener('click', renderFormСard);

placeList.renderItems();

popupEditProfileValidator.enableValidation();
popupAddCardValidator.enableValidation();



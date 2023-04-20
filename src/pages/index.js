import './index.css';
import { initialCards } from '../components/constants.js';
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
} from '../components/constants.js';
import Section from '../components/Section.js';
import { Card } from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userInfoProfile = new UserInfo(profileTitle, profileabout);

const popupEditProfile = new PopupWithForm(profileEditPopup, {
  handleSubmitForm: (inputData) => {
    userInfoProfile.setUserInfo(inputData.title, inputData.about);
    popupEditProfile.close();
  },
});
popupEditProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
  const inputData = userInfoProfile.getUserInfo();
  titleUserProfile.value = inputData.title;
  aboutUserProfile.value = inputData.about;
  popupEditProfile.open();
});

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

const сardEditPopup = new PopupWithForm(popupAddImage, {
  handleSubmitForm: (data) => {
    placeList.addItem(createPlace(data));

    сardEditPopup.close();
  },
});
сardEditPopup.setEventListeners();

cardEditButton.addEventListener('click', () => {
  сardEditPopup.open();
});

placeList.renderItems();

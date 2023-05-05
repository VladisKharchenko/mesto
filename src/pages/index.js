import './index.css';
import {
  placeAddHtml,
  popupTypeImage,
  popupAddImage,
  cardEditButton,
  profileEditButton,
  formEditProfile,
  formEditCard,
  popupCardDelete,
  formChangeAvatar,
  avatarChangeButton,
  profileInfoSelectors,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import { Card } from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import { config } from '../utils/constants.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'd7db98be-0f68-4b1c-bf6a-476af911ba25',
    'Content-Type': 'application/json',
  },
});

const placeList = new Section(
  {
    renderer: (item) => {
      const place = createPlace(item);
      placeList.appendItem(place);
    },
  },
  placeAddHtml
);

api
  .getUserInfo()
  .then((userInfo) => {
    userInfoProfile.setUserInfo(userInfo);
    api
      .getInitialCards()
      .then((cards) => {
        placeList.renderItems(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

const popupEditProfileValidator = new FormValidator(config, formEditProfile);
const popupAddCardValidator = new FormValidator(config, formEditCard);
const popupChangeAvatarValidator = new FormValidator(config, formChangeAvatar);

const userInfoProfile = new UserInfo(profileInfoSelectors);

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  handleSubmitForm: (inputData) => {
    popupEditProfile.loadingButton();
    api
      .updateUserInfo(inputData)
      .then((updatedUser) => {
        userInfoProfile.setUserInfo(updatedUser);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.loadButton();
        popupEditProfile.close();
      });
  },
});

popupEditProfile.setEventListeners();

function renderFormProfile() {
  popupEditProfile.open();
  popupEditProfileValidator.cleanError();
}

profileEditButton.addEventListener('click', renderFormProfile);

const popupIncreaseImage = new PopupWithImage(popupTypeImage);
popupIncreaseImage.setEventListeners();

const handleCardClick = (card) => {
  popupIncreaseImage.open(card);
};

function handleCardDelete(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      card.deletePlace();
      confirmDeletePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

const confirmDeletePopup = new PopupWithConfirmation(
  popupCardDelete,
  handleCardDelete
);
confirmDeletePopup.setEventListeners();

function createPlace(data) {
  const place = new Card(data, '#template-place', {
    handleCardClick: () => handleCardClick(data),
    handleButtonDelete: (card) => confirmDeletePopup.open(card),
    isOwner: (userID) => userInfoProfile.getUserInfo().id === userID,
    addLike: (userID) => {
      api
        .addLike(userID)
        .then((res) => {
          const countLikes = res.likes.length;
          place.renderLikes(countLikes);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    removeLike: (userID) => {
      api
        .removeLike(userID)
        .then((res) => {
          const countLikes = res.likes.length;
          place.renderLikes(countLikes);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    isLiked(userID) {
      return userID === userInfoProfile.getUserInfo().id;
    },
  });

  return place.generateCard();
}

const popupAddCard = new PopupWithForm(popupAddImage, {
  handleSubmitForm: (data) => {
    popupAddCard.loadingButton();
    api
      .addNewCard(data.name, data.link)
      .then((newCard) => {
        placeList.prependItem(createPlace(newCard));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCard.loadButton();
        popupAddCard.close();
      });
  },
});

popupAddCard.setEventListeners();

function renderFormСard() {
  popupAddCard.open();
  popupAddCardValidator.cleanError();
}

cardEditButton.addEventListener('click', renderFormСard);

const popupChangeAvatar = new PopupWithForm('.popup_type_change-avatar', {
  handleSubmitForm: (inputData) => {
    popupChangeAvatar.loadingButton();
    api
      .changeAvatar(inputData.avatar)
      .then((updatedUser) => {
        userInfoProfile.setUserInfo(updatedUser);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupChangeAvatar.loadButton();
        popupChangeAvatar.close();
      });
  },
});

popupChangeAvatar.setEventListeners();

function renderFormAvatar() {
  popupChangeAvatar.open();
  popupChangeAvatarValidator.cleanError();
}

avatarChangeButton.addEventListener('click', renderFormAvatar);

popupEditProfileValidator.enableValidation();
popupAddCardValidator.enableValidation();
popupChangeAvatarValidator.enableValidation();

const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditCloseButton = document.querySelector('.popup__close-button');

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
const cardEditCloseButton = document.querySelector('.popup__card-close-button');

const initialCards = [
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

const placeContainer = document.querySelector('.places');

const popupImage = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__image-text');

const imageCloseButton = document.querySelector('.popup__image-close-button');
const imagePopup = document.querySelector('.popup_type_image');

const editFormElement = document.querySelector('.form-edit-card');
const link = document.querySelector('.popup__input_type_picture-link');
const nameCard = document.querySelector('.popup__input_type_card-title');

function openProfileEditPopup() {
  profileEditPopup.classList.add('popup_opened');
  popupInputName.value = profileNameElement.textContent;
  popupInputAboutYourself.value = profileAboutYourselfElement.textContent;
}

function closeProfileEditPopup() {
  profileEditPopup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputName.value;
  profileAboutYourselfElement.textContent = popupInputAboutYourself.value;
  closeProfileEditPopup();
}

function openCardEditPopup() {
  сardEditPopup.classList.add('popup_opened');
  nameCard.value = '';
  link.value = '';
}

function closeCardEditPopup() {
  сardEditPopup.classList.remove('popup_opened');
}

function renderPlaces() {
  for (let i = 0; i < initialCards.length; i++) {
    createPlace(initialCards[i].name, initialCards[i].link);
  }
}

function openImagePopup() {
  imagePopup.classList.add('popup_opened');
}

function createPlace(nameValue, linkValue) {
  const placeTemplate = document.querySelector('.template-place').content;
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);

  const placeImage = placeElement.querySelector('.place__image');
  placeImage.src = linkValue;

  const placeTitle = (placeElement.querySelector('.place__title').textContent =
    nameValue);

  placeImage.alt = placeTitle;

  placeElement
    .querySelector('.place__like-button')
    .addEventListener('click', function (evt) {
      evt.target.classList.toggle('place__like-button_active');
    });

  placeElement
    .querySelector('.place__delete-button')
    .addEventListener('click', function (evt) {
      const deleteButton = evt.target;
      const place = deleteButton.closest('.place');
      place.remove();
    });

  placeImage.addEventListener('click', function (evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = placeTitle;
    popupImageText.textContent = popupImage.alt;

    openImagePopup();
  });

  placeContainer.prepend(placeElement);
}

function closeImagePopup() {
  imagePopup.classList.remove('popup_opened');
}

function handleFormAdd(evt) {
  evt.preventDefault();
  createPlace(nameCard.value, link.value);
  closeCardEditPopup();
}

profileEditButton.addEventListener('click', openProfileEditPopup);
profileEditCloseButton.addEventListener('click', closeProfileEditPopup);

formElement.addEventListener('submit', handleFormSubmit);

cardEditButton.addEventListener('click', openCardEditPopup);
cardEditCloseButton.addEventListener('click', closeCardEditPopup);

imageCloseButton.addEventListener('click', closeImagePopup);

editFormElement.addEventListener('submit', handleFormAdd);

renderPlaces();

const popup = document.querySelector('.popup');

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

const placeTemplate = document.querySelector('.template-place').content;

const placeContainer = document.querySelector('.places');

const popupImage = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__image-text');

const imagePopup = document.querySelector('.popup_type_image');

const formEditProfile = document.querySelector('.form-edit-card');
const link = document.querySelector('.popup__input_type_picture-link');
const nameCard = document.querySelector('.popup__input_type_card-title');

function openPopup(popup) {
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
};

function handleFormEdit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputName.value;
  profileAboutYourselfElement.textContent = popupInputAboutYourself.value;
  closePopup(profileEditPopup);
}

function renderPlaces() {
  for (let i = 0; i < initialCards.length; i++) {
    placeContainer.prepend(createPlace(initialCards[i].name, initialCards[i].link));
  }
}

function createPlace(nameValue, linkValue) {
  const placeElement = placeTemplate.cloneNode(true);

  const placeImage = placeElement.querySelector('.place__image');
  placeImage.src = linkValue;

  const placeTitle = placeElement.querySelector('.place__title');

  placeTitle.textContent= nameValue;

  placeImage.alt = placeTitle.textContent;

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
    popupImage.alt = placeTitle.textContent;
    popupImageText.textContent = popupImage.alt;
    openPopup(imagePopup);
  });

  return placeElement
}

function addedNewPlace (nameValue, linkValue) {
  const newPlace = createPlace(nameValue, linkValue);
  placeContainer.prepend(newPlace);
}

function handleFormAdd(evt) {
  evt.preventDefault();
  addedNewPlace(nameCard.value, link.value);
  closePopup(сardEditPopup);
}

profileEditButton.addEventListener('click', () => {
  popupInputName.value = profileNameElement.textContent;
  popupInputAboutYourself.value = profileAboutYourselfElement.textContent;
  openPopup(profileEditPopup);
  cleanError(profileEditPopup, config);
});

cardEditButton.addEventListener('click', () => {
  nameCard.value = '';
  link.value = '';
  openPopup(сardEditPopup);
  cleanError(сardEditPopup, config);
});

closeButtons.forEach((el) => el.addEventListener('click', () => {
  const popup = el.closest('.popup');
  closePopup(popup);
}));

formElement.addEventListener('submit', handleFormEdit);

formEditProfile.addEventListener('submit', handleFormAdd);

renderPlaces();

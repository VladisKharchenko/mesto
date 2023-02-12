const profileEditButton = document.querySelector('.profile__edit-button');
const popupOpened = document.querySelector('.popup');

const popupCloseButton = document.querySelector('.popup__close-button');
const popupClose = document.querySelector('.popup');

const formElement = document.querySelector('.popup__container');
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputAboutYourself = document.querySelector('.popup__input_type_about-yourself');
const profileNameElement = document.querySelector('.profile__name');
const profileAboutYourselfElement = document.querySelector('.profile__about-yourself');

function openPopup () {
  popupOpened.classList.add('popup_opened');
  popupInputName.value = profileNameElement.textContent;
  popupInputAboutYourself.value = profileAboutYourselfElement.textContent;
}

profileEditButton.addEventListener('click', openPopup);

function closePopup () {
  popupClose.classList.remove('popup_opened');
}

popupCloseButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileNameElement.textContent = popupInputName.value;
  profileAboutYourselfElement.textContent = popupInputAboutYourself.value;
  closePopup();
 }

formElement.addEventListener('submit', handleFormSubmit);




const profileEditButton = document.querySelector('.profile__edit-button');

profileEditButton.addEventListener('click', function() {
  const popupOpened = document.querySelector('.popup');
  popupOpened.classList.add('popup_opened');
  popupInputName.value = profileNameElement.textContent;
  popupInputAboutYourself.value = profileAboutYourselfElement.textContent;
});

const popupCloseButton = document.querySelector('.popup__close-button');

popupCloseButton.addEventListener('click', function() {
  const popupClose = document.querySelector('.popup');
  popupClose.classList.remove('popup_opened');
});

const formElement = document.querySelector('.popup__container');

const popupInputName = document.querySelector('.popup__input-name');

const popupInputAboutYourself = document.querySelector('.popup__input-about-yourself');

const profileNameElement = document.querySelector('.profile__name');

const profileAboutYourselfElement = document.querySelector('.profile__about-yourself');

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileNameElement.textContent = popupInputName.value;

  profileAboutYourselfElement.textContent = popupInputAboutYourself.value;

 }

formElement.addEventListener('submit', handleFormSubmit);

const popupSaveButton = document.querySelector('.popup__save-button');

  popupSaveButton.addEventListener('click', function() {
    const popupClose = document.querySelector('.popup');
    popupClose.classList.remove('popup_opened');
  });



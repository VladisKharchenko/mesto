import { openPopup } from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popup = document.querySelector('.popup_type_image');
    this._popupImage = document.querySelector('.popup__image');
    this._popupImageText = document.querySelector('.popup__image-text');
    this._likeButton = null;
    this._deleteButton = null;
    this._imagePlace = null;
  }

  _openPopup(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupImageText.textContent = data.name;
    openPopup(this._popup);
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place')
      .cloneNode(true);
    return placeElement;
  }

  _handlePlaceLike() {
    this._element
      .querySelector('.place__like-button')
      .classList.toggle('place__like-button_active');
  }

  _handlePlaceDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.place__like-button');
    this._deleteButton = this._element.querySelector('.place__delete-button');
    this._imagePlace = this._element.querySelector('.place__image');

    this._likeButton.addEventListener('click', () => {
      this._handlePlaceLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handlePlaceDelete();
    });

    this._imagePlace.addEventListener('click', () => {
      this._openPopup({ name: this._name, link: this._link });
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const placeImage = this._element.querySelector('.place__image');
    const placeTitle = this._element.querySelector('.place__title');

    placeImage.src = this._link;
    placeImage.alt = this._name;
    placeTitle.textContent = this._name;

    return this._element;
  }
}

export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._likeButton = null;
    this._deleteButton = null;
    this._imagePlace = null;
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

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
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
      this._handleImageClick();
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



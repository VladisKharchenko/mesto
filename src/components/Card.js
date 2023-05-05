export class Card {
  constructor(
    data,
    templateSelector,
    {
      handleCardClick,
      handleButtonDelete,
      isOwner,
      addLike,
      removeLike,
      isLiked,
    }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleClickButtonDelete = () => handleButtonDelete(this);
    this._ownerId = data.owner._id;
    this._isOwner = () => isOwner(this._ownerId);
    this._id = data._id;
    this._handleLikeClick = this._handlePlaceLike.bind(this);
    this._likeList = data.likes;
    this._likeCount = data.likes.length;
    this._addLike = () => addLike(this._id);
    this._removeLike = () => removeLike(this._id);
    this._isLiked = () => this._likeList.some(({ _id }) => isLiked(_id));
  }

  deletePlace() {
    this._element.remove();
    this._element = null;
  }

  renderLikes(count) {
    this._likesCount.textContent = count;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place')
      .cloneNode(true);
    return placeElement;
  }

  _handlePlaceLike() {
    this._likeButton.classList.toggle('place__like-button_active');
    if (this._likeButton.classList.contains('place__like-button_active')) {
      this._addLike();
    } else {
      this._removeLike();
    }
  }

  _toggleLikeButton() {
    this._likeButton.classList.toggle('place__like-button_active');
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handleLikeClick);

    this._imagePlace.addEventListener('click', () => {
      this._handleImageClick();
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener(
        'click',
        this._handleClickButtonDelete
      );
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    const placeImage = this._element.querySelector('.place__image');
    const placeTitle = this._element.querySelector('.place__title');

    this._likeButton = this._element.querySelector('.place__like-button');
    this._deleteButton = this._element.querySelector('.place__delete-button');
    this._imagePlace = this._element.querySelector('.place__image');
    this._likesCount = this._element.querySelector('.place__like-count');

    if (!this._isOwner()) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }

    if (this._isLiked()) {
      this._toggleLikeButton();
    }

    placeImage.src = this._link;
    placeImage.alt = this._name;
    placeTitle.textContent = this._name;
    this._likesCount.textContent = this._likeCount;

    this._setEventListeners();
    return this._element;
  }
}

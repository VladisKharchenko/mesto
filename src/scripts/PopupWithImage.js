import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    //popup__image
    this._popupCaption = this._popup.querySelector('.popup__image-text');
  }

  open({name, link}) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = alt;
    this._popupCaption.textContent = name;
  }
}





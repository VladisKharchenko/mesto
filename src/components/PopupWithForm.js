import Popup from './Popup.js';
import { FormValidator } from './FormValidator.js';
import { config } from './constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formInputs = Array.from(
      this._popup.querySelectorAll('.popup__input')
    );
    this._formValidator = new FormValidator(config, this._popup.querySelector('.form'));
  }

  _getInputValues() {
    this._formInputValues = {};
    this._formInputs.forEach((input) => {
      this._formInputValues[input.name] = input.value;
    });
    return this._formInputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popup.querySelector('.form').reset();
    this._formValidator.cleanError();
    this._formValidator.enableValidation();
    this._formValidator._updateFormValidity();

  }
}

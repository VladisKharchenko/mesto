import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.popup__submit')
    this._handleSubmitForm = handleSubmitForm;
    this._formInputs = Array.from(
      this._popup.querySelectorAll('.popup__input')
    );
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
  }

  loadingButton() {
    this._submitButton.textContent = 'Сохраняется...'
  }

  loadButton() {
    this._submitButton.textContent = 'Сохранить'
  }
}

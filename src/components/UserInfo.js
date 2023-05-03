export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
  }

  getUserInfo() {
    return {
      title: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
      id: this._id,
    };
  }

  setUserInfo({ name, about, _id }) {
    this._nameSelector.textContent = name;
    this._aboutSelector.textContent = about;
    this._id = _id;
  }
}

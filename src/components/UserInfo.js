export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
  }

  getUserInfo() {
    return {
      title: this._nameSelector.textContent,
      about: this._aboutSelector.textContent,
    };
  }

  setUserInfo(title, about) {
    this._nameSelector.textContent = title;
    this._aboutSelector.textContent = about;
  }
}

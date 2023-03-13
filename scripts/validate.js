const showInputError = (
  form,
  inputElement,
  validationMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(inputErrorClass);
  errorElement.textContent = validationMessage;
  inputElement.classList.add(errorClass);
};

const hideInputError = (form, inputElement, inputErrorClass, errorClass) => {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(inputErrorClass);
  inputElement.classList.remove(errorClass);
  inputElement.textContent = '';
};

const checkInputValidity = (
  form,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      form,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(form, inputElement, inputErrorClass, errorClass);
  }
};

const setButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(
          form,
          inputElement,
          config.inputErrorClass,
          config.errorClass
        );
        setButtonState(inputList, buttonElement, config.inactiveButtonClass);
      });
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error',
});

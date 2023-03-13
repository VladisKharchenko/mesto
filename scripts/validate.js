const showInputError = (
  form,
  inputElement,
  validationMessage,
  config
) => {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.inputErrorClass);
  errorElement.textContent = validationMessage;
  inputElement.classList.add(config.errorClass);
};

const hideInputError = (form, inputElement, config) => {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.inputErrorClass);
  inputElement.classList.remove(config.errorClass);
  inputElement.textContent = '';
};

const checkInputValidity = (
  form,
  inputElement,
  config
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      form,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(form, inputElement, config);
  }
};

const setButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
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
          config
        );
        setButtonState(inputList, buttonElement, config);
      });
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function cleanError(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);
  inputList.forEach(inputElement => hideInputError(form, inputElement, config));
  setButtonState(inputList, buttonElement, config);
}

const config = ({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error',
});

enableValidation(config);



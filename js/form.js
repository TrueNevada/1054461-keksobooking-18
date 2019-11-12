'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var avatar = adForm.querySelector('#avatar');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview');
  var title = adForm.querySelector('#title');
  var price = adForm.querySelector('#price');
  var type = adForm.querySelector('#type');
  var address = adForm.querySelector('#address');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var roomField = adForm.querySelector('#room_number');
  var guestField = adForm.querySelector('#capacity');
  var formImages = adForm.querySelector('#images');
  var uploadPhoto = adForm.querySelector('.ad-form__photo');

  title.required = true;
  title.minLength = 30;
  title.maxLenght = 100;

  price.required = true;
  price.max = 1000000;
  price.placeholder = '1000';

  var minPriceValidation = function () {
    if (type.value === 'bungalo') {
      price.min = 0;
      price.placeholder = '0';
    } else if (type.value === 'flat') {
      price.min = 1000;
      price.placeholder = '1000';
    } else if (type.value === 'house') {
      price.min = 5000;
      price.placeholder = '5000';
    } else if (type.value === 'palace') {
      price.min = 10000;
      price.placeholder = '10000';
    }
  };

  type.addEventListener('input', function (evt) {
    minPriceValidation(evt);
  });

  type.addEventListener('submit', function (evt) {
    minPriceValidation(evt);
  });

  minPriceValidation();

  address.readOnly = true;

  var matchFields = function (fieldFirst, fieldSecond) {
    fieldFirst.addEventListener('change', function () {
      fieldSecond.value = fieldFirst.value;
    });
  };

  matchFields(timeIn, timeOut);
  matchFields(timeOut, timeIn);

  var onGuestsFieldValidation = function () {
    if (roomField.value === '1' && guestField.value !== '1') {
      guestField.setCustomValidity('Только 1 гость может быть для 1 комнаты ');
    } else if ((roomField.value === '2' && guestField.value === '3') || (roomField.value === '2' && guestField.value === '0')) {
      guestField.setCustomValidity('Только 1 или 2 гостя могут быть для 2 комнат ');
    } else if (roomField.value === '3' && guestField.value === '0') {
      guestField.setCustomValidity('Только 1, 2 или 3 гостя могут быть для 3 комнат');
    } else if (roomField.value === '100' && guestField.value !== '0') {
      guestField.setCustomValidity('100 комнат может быть только "не для гостей"');
    } else {
      guestField.setCustomValidity('');
    }
  };

  adForm.addEventListener('submit', function (evt) {
    onGuestsFieldValidation();

    var formData = new FormData(adForm);

    var successHandler = function () {
      var error = document.querySelector('#success')
      .content
      .querySelector('.success');
      var successMessage = error.cloneNode(true);
      document.body.insertAdjacentElement('afterbegin', successMessage);

      window.addEventListener('click', function () {
        successMessage.remove();
      });

      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          successMessage.remove();
        }
      });

      window.map.reset();
    };

    window.backend.save(formData, window.util.errorHandler, successHandler);
    evt.preventDefault();
  });

  roomField.addEventListener('change', function (evt) {
    onGuestsFieldValidation(evt);
  });

  guestField.addEventListener('change', function (evt) {
    onGuestsFieldValidation(evt);
  });

  onGuestsFieldValidation();

  window.fileLoader.setup(avatar, avatarPreview, window.fileLoader.FillingType.REPLACE_WITH);
  window.fileLoader.setup(formImages, uploadPhoto, window.fileLoader.FillingType.ADD_TO);

  window.form = {
    adForm: adForm,
    address: address,
  };
})();

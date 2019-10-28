'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (array) {
    return array[getRandomNumber(0, array.length)];
  };

  var getRandomArraySlice = function (array) {
    var newLength = getRandomNumber(0, array.length);
    return array.slice(0, newLength);
  };

  var translateType = function (type) {
    switch (type) {
      case 'palace':
        return 'Дворец';
      case 'flat':
        return 'Квартира';
      case 'house':
        return 'Дом';
      case 'bungalo':
        return 'Бунгало';
      default:
        return type;
    }
  };

  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomArraySlice: getRandomArraySlice
  }
})();

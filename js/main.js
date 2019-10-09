'use strict';

var COUNT_USERS = 8;
var TYPE_OF_ROOMS = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var dataList = generatePost();
shuffleArray(dataList);

var generatePost = function () {
  var data = [];
  var userAvatars = shuffleArray(generateAvatars());

  for (var i = 0; i < COUNT_USERS; i++) {

    data.push({
      'author': {
        'avatar': userAvatars[i]
      },
      'offer': {
        'title': [],
        'address': [],
        'price': getRandomNumber(),
        'type': getRandomElement(TYPE_OF_ROOMS),
        'rooms': getRandomNumber(),
        'guests': getRandomNumber(),
        'checkin': getRandomElement(TIME),
        'checkout': getRandomElement(TIME),
        'features': getArrayLength(FEATURES),
        'description': '',
        'photos': getRandomElement(PHOTOS)
      },
      'location': {
        'x': [],
        'y': []
      }
    });
  }

  return data;
};

var generateAvatars = function () {
  var listAvatars = [];

  for (var i = 1; i < COUNT_USERS + 1; i++) {
    if (i < 10) {
      i = '0' + i;
    }
    var avatars = 'img/avatars/user' + i + '.png';
    listAvatars.push(avatars);
  }
  return listAvatars;
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
  }
  var randomElement = array[randomIndex];
  return randomElement;
};

var getArrayLength = function (array) {
  var clone = array.slice();
  clone.length = getRandomNumber(1, array.length);
  return clone;
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var tempValue = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');


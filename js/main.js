'use strict';

var COUNT_USERS = 8;

var MIN_GUEST = 1;
var MAX_GUEST = 20;

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var PIN_HEIGHT = 165;
var PIN_WIDTH = 50;

var minAxisX = 0;
var maxAxisX = 1200;
var minAxisY = 130;
var maxAxisY = 630;

var TITLE_ADS = ['Большая уютная квартира', 'Маленькая уютная квартирка', 'Холостяцкое бунгало', 'Уютное гнездышко для молодоженов', 'Просторные апартаменты', 'Скромная лачуга', 'Шикарный дворец', 'Оргомный просторный дом'];
var TYPE_OF_ROOMS = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var dataList = generatePost();
insertPins();

var insertPins = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataList.length; i++) {
    fragment.appendChild(createPin(dataList[i]));
  }
  mapPins.appendChild(fragment);
};

var createPin = function (marker) {
  var userLocation = document.createElement('div');
  var userAvatar = document.createElement('img');
  userLocation.className = 'pin';
  userLocation.style.left = (marker.location.x - PIN_HEIGHT) + 'px';
  userLocation.style.top = marker.location.y - (PIN_WIDTH / 2) + 'px';
  userAvatar.className = 'rounded';
  userAvatar.width = 40;
  userAvatar.height = 40;
  userAvatar.src = marker.author.avatar;
  userLocation.appendChild(userAvatar);
  return userLocation;
};

var generatePost = function () {
  var data = [];
  var userAvatars = shuffleArray(generateAvatars());
  var addHeadlines = shuffleArray(TITLE_ADS);
  var addPhotos = shuffleArray(PHOTO);

  for (var i = 0; i < COUNT_USERS; i++) {
    var locationX = getRandomNumber(minAxisX, maxAxisX);
    var locationY = getRandomNumber(minAxisY, maxAxisY);

    data.push({
      'author': {
        'avatar': userAvatars[i]
      },
      'offer': {
        'title': addHeadlines[i],
        'address': (locationX + ', ' + locationY),
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': getRandomElement(TYPE_OF_ROOMS),
        'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomNumber(MIN_GUEST, MAX_GUEST),
        'checkin': getRandomElement(TIME),
        'checkout': getRandomElement(TIME),
        'features': getArrayLength(FEATURES),
        'description': '',
        'photos': addPhotos[i]
      },
      'location': {
        'x': locationX,
        'y': locationX
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


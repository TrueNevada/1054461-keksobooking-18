'use strict';

var map = document.querySelector(".map");
map.classList.remove('map--faded');

var COUNT_USERS = 8;

var MIN_GUEST = 1;
var MAX_GUEST = 20;

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;

var minAxisX = 25;
var maxAxisX = 1175;
var minAxisY = 130;
var maxAxisY = 630;

var TITLE_ADS = ['Большая уютная квартира', 'Маленькая уютная квартирка', 'Холостяцкое бунгало', 'Уютное гнездышко для молодоженов', 'Просторные апартаменты', 'Скромная лачуга', 'Шикарный дворец', 'Оргомный просторный дом'];
var TYPE_OF_ROOMS = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
  return array[getRandomNumber(0, array.length)];
};

var getRandomArray = function (array) {
  var randomSort = function () {
    return Math.random() - 0.5;
  };
  array.sort(randomSort);
  var length = getRandomNumber(0, array.length);
  return array.slice(0, length);
};

var generatePost = function () {
  var data = [];
  var userAvatars = generateAvatars();
  var addHeadlines = getRandomElement(TITLE_ADS);
  var addPhotos = getRandomElement(PHOTO);

  for (var i = 0; i < COUNT_USERS; i++) {
    var locationX = getRandomNumber(minAxisX, maxAxisX);
    var locationY = getRandomNumber(minAxisY, maxAxisY);

    data.push({
      'author': {
        'avatar': getRandomElement(userAvatars)
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
        'features': getRandomArray(FEATURES),
        'description': '',
        'photos': addPhotos[i]
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }

  return data;
};

var dataList = generatePost();

var createPin = function (marker) {
  var userLocation = document.createElement('button');
  var userAvatar = document.createElement('img');
  userLocation.className = 'map__pin';
  userLocation.style.left = marker.location.x - PIN_WIDTH + 'px';
  userLocation.style.top = marker.location.y - (PIN_HEIGHT / 2) + 'px';
  userAvatar.width = 40;
  userAvatar.height = 40;
  userAvatar.src = marker.author.avatar;
  userAvatar.alt = 'Метка объявления'
  userLocation.appendChild(userAvatar);
  return userLocation;
};

var insertPins = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataList.length; i++) {
    fragment.appendChild(createPin(dataList[i]));
  }
  mapPins.appendChild(fragment);
};

insertPins();


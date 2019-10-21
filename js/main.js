'use strict';
var ENTER_KEYCODE = 13;

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

var TITLE_ADS = [
  'Большая уютная квартира',
  'Маленькая уютная квартирка',
  'Холостяцкое бунгало',
  'Уютное гнездышко для молодоженов',
  'Просторные апартаменты',
  'Скромная лачуга',
  'Шикарный дворец',
  'Огромный просторный дом'
];

var TYPE_OF_ROOMS = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTO = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var DESCRIPTIONS = [
  'Отличное предложение в одном из самых престижных районов Токио!',
  'Прекрасный дом, в котором есть все необходимое для комфортного проживания.',
  'Современная квартира с благоустроенной придомовой территорией.',
  'Большая, светлая, уютная квартира.',
  'Уникальная возможность жить в красивой современной квартире и одновременно в окружении старинной архитектуры и духа старого Токио!'
];

var map = document.querySelector('.map');

var pinMain = document.querySelector('.map__pin--main');

var address = document.querySelector('#address');
var startCoords = (pinMain.offsetLeft + Math.round(65 / 2)) + ', ' + (pinMain.offsetTop + Math.round(65 / 2));
var startCoordsOnMouseDown = (pinMain.offsetLeft + Math.round(65 / 2)) + ', ' + (pinMain.offsetTop + 65);
address.value = startCoords;

var mapFilter = document.querySelectorAll('.map__filter');

var fieldsets = document.querySelectorAll('fieldset');

var disabling = function (array, disabled) {
  for (var i = 0; i < mapFilter.length; i++) {
    array[i].disabled = disabled;
  }
};

disabling(mapFilter, true);

disabling(fieldsets, true);


var form = document.querySelector('.ad-form');

var startAction = function () {
  map.classList.remove('map--faded');

  form.classList.remove('ad-form--disabled');

  disabling(mapFilter, false);

  disabling(fieldsets, false);

  address.value = startCoordsOnMouseDown;
};

pinMain.addEventListener('mousedown', function () {
  startAction();
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    startAction();
  }
});

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

var generatePost = function () {
  var data = [];

  for (var i = 0; i < COUNT_USERS; i++) {
    var locationX = getRandomNumber(minAxisX, maxAxisX);
    var locationY = getRandomNumber(minAxisY, maxAxisY);

    data.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': getRandomElement(TITLE_ADS),
        'address': (locationX + ', ' + locationY),
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': getRandomElement(TYPE_OF_ROOMS),
        'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomNumber(MIN_GUEST, MAX_GUEST),
        'checkin': getRandomElement(TIME),
        'checkout': getRandomElement(TIME),
        'features': getRandomArraySlice(FEATURES),
        'description': getRandomElement(DESCRIPTIONS),
        'photos': getRandomArraySlice(PHOTO)
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
  var userLocation = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var userPin = userLocation.cloneNode(true);

  userPin.style.left = marker.location.x - PIN_WIDTH + 'px';
  userPin.style.top = marker.location.y - (PIN_HEIGHT / 2) + 'px';
  userPin.querySelector('img').src = marker.author.avatar;
  return userPin;
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

var generateOffer = function (advertisement) {
  var card = document.querySelector('#card')
  .content
  .querySelector('.popup');

  var popup = card.cloneNode(true);
  var imagesRoot = popup.querySelector('.popup__photos');
  var image = imagesRoot.querySelector('img');
  image.remove();

  popup.querySelector('.popup__title').textContent = advertisement.offer.title;
  popup.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  popup.querySelector('.popup__text--price').textContent = advertisement.offer.price + ' ₽/ночь';
  popup.querySelector('.popup__type').textContent = translateType(advertisement.offer.type);
  popup.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  popup.querySelector('.popup__features').textContent = advertisement.offer.features;
  popup.querySelector('.popup__description').textContent = advertisement.offer.description;
  popup.querySelector('.popup__avatar').src = advertisement.author.avatar;

  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < advertisement.offer.photos.length; i++) {
    var img = image.cloneNode(true);
    img.src = advertisement.offer.photos[i];
    photosFragment.appendChild(img);
  }

  imagesRoot.appendChild(photosFragment);

  return popup;
};

var insertAdvertisement = function () {
  var offer = document.createDocumentFragment();
  for (var i = 0; i < dataList.length; i++) {
    offer.appendChild(generateOffer(dataList[i]));
  }
  map.insertBefore(offer, document.querySelector('.map__filters-container'));
};

insertAdvertisement();

var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');

form.addEventListener('submit', function (evt) {
  if (roomNumber.value === 100 && capacity.value > 0 || capacity.value > roomNumber.value) {
    roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');

    evt.preventDefault();
  } else if (capacity.value === 0 && roomNumber.value < 100) {
    roomNumber.setCustomValidity('Количество комнат не соответствует количеству гостей');

    evt.preventDefault();
  }
});

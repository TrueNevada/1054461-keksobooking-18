'use strict';

(function () {
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

  var mapPins = document.querySelector('.map__pins');
  var housingTypeFilter = document.querySelector('#housing-type');

  var generatePost = function () {
    var data = [];

    for (var i = 0; i < COUNT_USERS; i++) {
      var locationX = window.util.getRandomNumber(minAxisX, maxAxisX);
      var locationY = window.util.getRandomNumber(minAxisY, maxAxisY);

      data.push({
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': window.util.getRandomElement(TITLE_ADS),
          'address': (locationX + ', ' + locationY),
          'price': window.util.getRandomNumber(MIN_PRICE, MAX_PRICE),
          'type': window.util.getRandomElement(TYPE_OF_ROOMS),
          'rooms': window.util.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
          'guests': window.util.getRandomNumber(MIN_GUEST, MAX_GUEST),
          'checkin': window.util.getRandomElement(TIME),
          'checkout': window.util.getRandomElement(TIME),
          'features': window.util.getRandomArraySlice(FEATURES),
          'description': window.util.getRandomElement(DESCRIPTIONS),
          'photos': window.util.getRandomArraySlice(PHOTO)
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
    userPin.addEventListener('click', function () {
      window.popup.insertAdvertisement(marker);
    });

    userPin.style.left = marker.location.x - PIN_WIDTH + 'px';
    userPin.style.top = marker.location.y - (PIN_HEIGHT / 2) + 'px';
    userPin.querySelector('img').src = marker.author.avatar;
    return userPin;
  };

  var insertPins = function (pins) {
    var takeNumber = pins.length > 5 ? 5 : pins.length;
    for (var i = 0; i < takeNumber; i++) {
      mapPins.appendChild(createPin(pins[i]));
    }
  };

  var pinList = [];

  var updatePins = function () {
    var typeOfHouse = pinList.filter(function(it) {
      if (housingTypeFilter.value === 'palace') {
        return it.offer.type === 'palace'
      }
      else if (housingTypeFilter.value === 'flat') {
        return it.offer.type === 'flat'
      }
      else if (housingTypeFilter.value === 'house') {
        return it.offer.type === 'house'
      }
      else if (housingTypeFilter.value === 'bungalo') {
        return it.offer.type === 'bungalo'
      }
    });
    insertPins(typeOfHouse);
  };

  var successLoader = function (data) {
    pinList = data;
    insertPins(pinList);
  };

  var removePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  window.pin = {
    mapPins: mapPins,
    housingTypeFilter: housingTypeFilter,
    insertPins: insertPins,
    successLoader: successLoader,
    updatePins: updatePins,
    removePins: removePins,
  };

})();

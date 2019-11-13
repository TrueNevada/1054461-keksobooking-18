'use strict';

(function () {
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var mapPins = document.querySelector('.map__pins');
  var housingTypeFilter = document.querySelector('#housing-type');
  var housingPriceFilter = document.querySelector('#housing-price');
  var housingRoomsFilter = document.querySelector('#housing-rooms');
  var housingGuestsFilter = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var filterFeatures = housingFeatures.querySelectorAll('input[type="checkbox"][name="features"]');

  var createPin = function (marker) {
    var userLocation = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    var userPin = userLocation.cloneNode(true);
    userPin.addEventListener('click', function () {
      window.popup.popupRemove();
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
    var typeOfHouse = function (it) {
      if (housingTypeFilter.value === 'palace') {
        return it.offer.type === 'palace';
      } else if (housingTypeFilter.value === 'flat') {
        return it.offer.type === 'flat';
      } else if (housingTypeFilter.value === 'house') {
        return it.offer.type === 'house';
      } else if (housingTypeFilter.value === 'bungalo') {
        return it.offer.type === 'bungalo';
      }

      return it;
    };

    var priceOfHouse = function (it) {
      if (housingPriceFilter.value === 'low') {
        return it.offer.price < 10000;
      } else if (housingPriceFilter.value === 'middle') {
        return it.offer.price >= 10000 && it.offer.price <= 50000;
      } else if (housingPriceFilter.value === 'high') {
        return it.offer.price >= 10000 && it.offer.price <= 50000;
      }

      return it;
    };

    var countOfRooms = function (it) {
      if (housingRoomsFilter.value === '1') {
        return it.offer.rooms === 1;
      } else if (housingRoomsFilter.value === '2') {
        return it.offer.rooms === 2;
      } else if (housingRoomsFilter.value === '3') {
        return it.offer.rooms === 3;
      }

      return it;
    };

    var countOfGuests = function (it) {
      if (housingGuestsFilter.value === '1') {
        return it.offer.guests === 1;
      } else if (housingGuestsFilter.value === '2') {
        return it.offer.guests === 2;
      } else if (housingGuestsFilter.value === '0') {
        return it.offer.guests === 0;
      }

      return it;

    };

    var features = [];

    var featuresCheck = function (it) {
      features = [];
      filterFeatures.forEach(function (feature) {
        if (feature.checked) {
          features.push(feature.value);
        }
      });
      for (var i = 0; i < features.length; i++) {
        if (!it.offer.features.includes(features[i])) {
          return false;
        }
      }

      return true;
    };

    var result = pinList.filter(typeOfHouse).filter(priceOfHouse).filter(countOfRooms).filter(countOfGuests).filter(featuresCheck);

    insertPins(result);
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
    housingPriceFilter: housingPriceFilter,
    housingRoomsFilter: housingRoomsFilter,
    housingGuestsFilter: housingGuestsFilter,
    housingFeatures: housingFeatures,
    insertPins: insertPins,
    successLoader: successLoader,
    updatePins: updatePins,
    removePins: removePins,
  };

})();

'use strict';

(function () {
  var mapFilter = document.querySelectorAll('.map__filter');

  var fieldsets = document.querySelectorAll('fieldset');

  var pinMain = document.querySelector('.map__pin--main');

  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 65;
  var PIN_MAIN_HEIGHT_ON_MOUSEDOWN = 80;

  var PIN_MAIN_STYLE_TOP = 375 + 'px';
  var PIN_MAIN_STYLE_LEFT = 570 + 'px';

  var isPageLoaded = false;

  var disabling = function (array, disabled) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = disabled;
    }
  };

  disabling(mapFilter, true);

  disabling(fieldsets, true);

  var coords = (pinMain.offsetLeft + Math.round(PIN_MAIN_WIDTH / 2)) + ', ' + (pinMain.offsetTop + Math.round(PIN_MAIN_HEIGHT / 2));
  window.form.address.value = coords;

  var startAction = function () {
    isPageLoaded = true;

    window.form.adForm.classList.remove('ad-form--disabled');

    window.util.map.classList.remove('map--faded');

    disabling(mapFilter, false);

    disabling(fieldsets, false);

    window.backend.load(window.util.errorHandler, window.pin.successLoader);
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var top = pinMain.offsetTop - shift.y;
      var left = pinMain.offsetLeft - shift.x;

      if (top > 60 && top < 560) {
        pinMain.style.top = top + 'px';
      }

      if (left > 0 && left < 1135) {
        pinMain.style.left = left + 'px';
      }

      var coordsOnMouseDown = (pinMain.offsetLeft + Math.round(PIN_MAIN_WIDTH / 2)) + ', ' + (pinMain.offsetTop + PIN_MAIN_HEIGHT_ON_MOUSEDOWN);
      window.form.address.value = coordsOnMouseDown;

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          pinMain.removeEventListener('click', onClickPreventDefault);
        };
        pinMain.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    if (!isPageLoaded) {
      startAction();
    }
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      if (!isPageLoaded) {
        startAction();
      }
    }
  });

  var onChangeUpdate = window.debounce(function () {
    window.popup.popupRemove();
    window.pin.removePins();
    window.pin.updatePins();
  });

  window.pin.housingTypeFilter.addEventListener('change', onChangeUpdate);

  window.pin.housingPriceFilter.addEventListener('change', onChangeUpdate);

  window.pin.housingRoomsFilter.addEventListener('change', onChangeUpdate);

  window.pin.housingGuestsFilter.addEventListener('change', onChangeUpdate);

  window.pin.housingFeatures.addEventListener('change', onChangeUpdate);

  var reset = function () {
    window.form.adForm.classList.add('ad-form--disabled');

    window.util.map.classList.add('map--faded');

    disabling(mapFilter, true);

    disabling(fieldsets, true);

    pinMain.style.top = PIN_MAIN_STYLE_TOP;
    pinMain.style.left = PIN_MAIN_STYLE_LEFT;

    window.form.adForm.reset();

    window.pin.removePins();

    window.form.address.value = coords;

    isPageLoaded = false;
  };

  window.map = {
    mapFilter: mapFilter,
    fieldsets: fieldsets,
    pinMain: pinMain,
    coords: coords,
    reset: reset
  };

})();

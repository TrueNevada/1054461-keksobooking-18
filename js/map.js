'use strict';

(function () {
  var mapFilter = document.querySelectorAll('.map__filter');

  var fieldsets = document.querySelectorAll('fieldset');

  var pinMain = document.querySelector('.map__pin--main');

  var disabling = function (array, disabled) {
    for (var i = 0; i < mapFilter.length; i++) {
      array[i].disabled = disabled;
    }
  };

  disabling(mapFilter, true);

  disabling(fieldsets, true);

  var startCoords = (pinMain.offsetLeft + Math.round(65 / 2)) + ', ' + (pinMain.offsetTop + Math.round(65 / 2));
  window.form.address.value = startCoords;

  var startAction = function () {
    window.form.adForm.classList.remove('ad-form--disabled');

    var startCoordsOnMouseDown = (pinMain.offsetLeft + Math.round(65 / 2)) + ', ' + (pinMain.offsetTop + 70);
    window.form.address.value = startCoordsOnMouseDown;

    window.util.map.classList.remove('map--faded');

    disabling(mapFilter, false);

    disabling(fieldsets, false);

    window.pin.insertPins();
  };

  pinMain.addEventListener('mousedown', function () {
    startAction();
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      startAction();
    }
  });

  window.map = {
    mapFilter: mapFilter,
    fieldsets: fieldsets,
    pinMain: pinMain,
  };

})();

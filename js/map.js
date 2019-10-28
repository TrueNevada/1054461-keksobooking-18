'use strict';

(function () {
  var map = document.querySelector('.map');

  var mapFilter = document.querySelectorAll('.map__filter');

  var fieldsets = document.querySelectorAll('fieldset');

  var pinMain = document.querySelector('.map__pin--main');

  var form = document.querySelector('.ad-form');

  window.map = {
    map: map,
    mapFilter: mapFilter,
    fieldsets: fieldsets,
    pinMain: pinMain,
    form: form
  }

  var disabling = function (array, disabled) {
  for (var i = 0; i < mapFilter.length; i++) {
    array[i].disabled = disabled;
    }
  };

  disabling(mapFilter, true);

  disabling(fieldsets, true);

  var startAction = function () {
  map.classList.remove('map--faded');

  form.classList.remove('ad-form--disabled');

  disabling(mapFilter, false);

  disabling(fieldsets, false);

  insertPins();

  address.value = window.form.startCoordsOnMouseDown;
  };

  pinMain.addEventListener('mousedown', function () {
  startAction();
  });

  pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === window.util.ENTER_KEYCODE) {
    startAction();
    }
  });

})();

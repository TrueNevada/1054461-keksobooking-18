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

  var coords = (pinMain.offsetLeft + Math.round(65 / 2)) + ', ' + (pinMain.offsetTop + Math.round(65 / 2));
  window.form.address.value = coords;

  var startAction = function () {
    window.form.adForm.classList.remove('ad-form--disabled');

    var coordsOnMouseDown = (pinMain.offsetLeft + Math.round(65 / 2)) + ', ' + (pinMain.offsetTop + 70);
    window.form.address.value = coordsOnMouseDown;

    window.util.map.classList.remove('map--faded');

    disabling(mapFilter, false);

    disabling(fieldsets, false);

    window.pin.insertPins();
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

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          pinMain.removeEventListener('click', onClickPreventDefault)
        };
        pinMain.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

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

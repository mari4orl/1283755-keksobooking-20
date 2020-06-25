'use strict';
window.move = (function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var MAIN_PIN_SIZE = 62;
  var MAX_LEFT = -MAIN_PIN_SIZE / 2;
  var MAX_RIGHT = 1200 - MAIN_PIN_SIZE / 2;
  var MAX_TOP = 46;
  var MAX_BOTTOM = 546;
  var inputAddress = document.querySelector('#address');

  mapPinMain.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    inputAddress.value = window.utils.getCoordinates(mapPinMain, true);
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    inputAddress.value = window.utils.getCoordinates(mapPinMain, true);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (((mapPinMain.offsetLeft - shift.x) >= MAX_LEFT) && ((mapPinMain.offsetLeft - shift.x) <= MAX_RIGHT) && ((mapPinMain.offsetTop - shift.y) >= MAX_TOP) && ((mapPinMain.offsetTop - shift.y) <= MAX_BOTTOM)) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
      inputAddress.value = window.utils.getCoordinates(mapPinMain, true);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

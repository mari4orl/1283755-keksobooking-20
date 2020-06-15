'use strict';
window.move = (function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var PIN_ARROW_HEIGHT = 22;
  var MAIN_PIN_SIZE = 62;
  var inputAddress = document.querySelector('#address');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      inputAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_SIZE / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_SIZE + PIN_ARROW_HEIGHT);

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

'use strict';
window.utils = (function () {
  var MAIN_PIN_SIZE = 62;
  var PIN_ARROW_HEIGHT = 22;

  function getCoordinates(mapPinMain, isPageActive) {
    if (isPageActive) {
      return Math.round(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_SIZE / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_SIZE + PIN_ARROW_HEIGHT);

    } else {
      return Math.round(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_SIZE / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_SIZE / 2);
    }
  }
  return {
    getCoordinates: getCoordinates
  };
})();

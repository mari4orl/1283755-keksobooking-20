'use strict';
window.utils = (function () {
  var MAIN_PIN_SIZE = 62;
  var PIN_ARROW_HEIGHT = 22;
  var DEBOUNCE_INTERVAL = 500;

  function getCoordinates(mapPinMain, isPageActive) {
    if (isPageActive) {
      return Math.round(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_SIZE / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_SIZE + PIN_ARROW_HEIGHT);

    } else {
      return Math.round(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_SIZE / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_SIZE / 2);
    }
  }

  function debounce(functionToDebounce) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        functionToDebounce.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  return {
    getCoordinates: getCoordinates,
    debounce: debounce
  };
})();

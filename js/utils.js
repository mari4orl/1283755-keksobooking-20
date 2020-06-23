'use strict';
window.utils = (function () {
  var MAIN_PIN_SIZE = 62;
  var PIN_ARROW_HEIGHT = 22;

  return {
    getCoordinates: function (x, y, isPageActive) {
      if (isPageActive) {
        return Math.round(x + MAIN_PIN_SIZE / 2) + ', ' + Math.round(y + MAIN_PIN_SIZE + PIN_ARROW_HEIGHT);

      } else {
        return Math.round(x + MAIN_PIN_SIZE / 2) + ', ' + Math.round(y + MAIN_PIN_SIZE / 2);
      }
    }
  };
})();

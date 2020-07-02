'use strict';

window.debounce = (function () {

  var DEBOUNCE_INTERVAL = 500;

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
    debounce: debounce
  };
})();

'use strict';

window.debounce = (function () {

  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

  function debounce(functionToDebounce) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(functionToDebounce, DEBOUNCE_INTERVAL);
  }

  return {
    debounce: debounce
  };
})();

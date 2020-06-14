'use strict';
window.maping = (function () {
  var filtersContainer = document.querySelector('.map__filters-container');

  return {
    renderPins: function (adsArray, destination) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < adsArray.length; i++) {
        fragment.appendChild(window.pin.renderPin(adsArray[i]));
      }
      destination.appendChild(fragment);
    },

    renderCards: function (adsArray, destination) {
      var fragment = document.createDocumentFragment();

      fragment.appendChild(window.card.renderCard(adsArray[1]));
      destination.insertBefore(fragment, filtersContainer);
    }
  };
})();

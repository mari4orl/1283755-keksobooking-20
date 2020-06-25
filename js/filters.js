'use strict';
window.filters = (function (offers) {
  var housingType = document.querySelector('#housing-type');
  var pinList = document.querySelector('.map__pins');

  function filterHousing() {
    if (housingType.value === 'any') {
      var sameHousingTypeOffers = offers;
    } else {
      sameHousingTypeOffers = offers.filter(function (it) {
        return it.offer.type === housingType.value;
      });
    }
    window.pin.removePins();
    window.card.closePopup();
    window.pin.renderPins(sameHousingTypeOffers, pinList);
  }

  return {
    filterHousing: filterHousing
  };
})();

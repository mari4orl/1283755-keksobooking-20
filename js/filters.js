'use strict';
window.filters = (function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var featuresList = [];
  var pinList = document.querySelector('.map__pins');

  function filterHousing(offers) {
    var filteredOffers = offers;

    // TYPE
    if (housingType.value !== 'any') {
      filteredOffers = filteredOffers.filter(function (it) {
        return it.offer.type === housingType.value;
      });
    }
    // PRICE
    if (housingPrice.value !== 'any') {
      switch (housingPrice.value) {
        case 'low':
          filteredOffers = filteredOffers.filter(function (it) {
            return it.offer.price < 10000;
          });
          break;
        case 'middle':
          filteredOffers = filteredOffers.filter(function (it) {
            return (it.offer.price >= 10000 && it.offer.price < 50000);
          });
          break;
        case 'high':
          filteredOffers = filteredOffers.filter(function (it) {
            return (it.offer.price >= 50000);
          });
          break;
      }
    }
    // ROOMS
    if (housingRooms.value !== 'any') {
      filteredOffers = filteredOffers.filter(function (it) {
        return it.offer.rooms === parseInt(housingRooms.value, 10);
      });
    }
    // GUESTS
    if (housingGuests.value !== 'any') {
      filteredOffers = filteredOffers.filter(function (it) {
        return it.offer.guests === parseInt(housingGuests.value, 10);
      });
    }

    // FEATURES
    function onCheckboxClick(filteredOffers, evt) {
      var label = evt.target;
      console.log(label);
      var labelId = label.getAttribute('for');
      console.log(labelId);
      var checkbox = housingFeatures.querySelector('#' + labelId);
      console.log(checkbox.value);

      filteredOffers = filteredOffers.filter(function (it) {
        return it.offer.features.indexOf(checkbox.value);
      });
      housingFeatures.removeEventListener('click', onCheckboxClick);
      return filteredOffers
    }
    housingFeatures.addEventListener('click', onCheckboxClick.bind(null, filteredOffers));


    window.pin.removePins();
    window.card.closePopup();
    window.pin.renderPins(filteredOffers, pinList);
  }

  // window.debounce.debounce(filterHousing);

  return {
    filterHousing: filterHousing
  };
})();

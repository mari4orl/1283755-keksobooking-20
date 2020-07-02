'use strict';
window.filters = (function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var allFeautures = document.querySelectorAll('.map__checkbox');
  var pinList = document.querySelector('.map__pins');
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  function onTypeFilter(it) {
    return it.offer.type === housingType.value;
  }

  function onLowPriceFilter(it) {
    return it.offer.price < LOW_PRICE;
  }

  function onMiddlePriceFilter(it) {
    return (it.offer.price >= LOW_PRICE && it.offer.price < HIGH_PRICE);
  }

  function onHighPriceFilter(it) {
    return (it.offer.price >= HIGH_PRICE);
  }

  function onRoomsFilter(it) {
    return it.offer.rooms === parseInt(housingRooms.value, 10);
  }

  function onGuestsFilter(it) {
    return it.offer.guests === parseInt(housingGuests.value, 10);
  }

  function filterHousing(offers) {
    var filteredOffers = offers;

    // TYPE
    if (housingType.value !== 'any') {
      filteredOffers = filteredOffers.filter(onTypeFilter);
    }
    // PRICE
    if (housingPrice.value !== 'any') {
      switch (housingPrice.value) {
        case 'low':
          filteredOffers = filteredOffers.filter(onLowPriceFilter);
          break;
        case 'middle':
          filteredOffers = filteredOffers.filter(onMiddlePriceFilter);
          break;
        case 'high':
          filteredOffers = filteredOffers.filter(onHighPriceFilter);
          break;
      }
    }
    // ROOMS
    if (housingRooms.value !== 'any') {
      filteredOffers = filteredOffers.filter(onRoomsFilter);
    }
    // GUESTS
    if (housingGuests.value !== 'any') {
      filteredOffers = filteredOffers.filter(onGuestsFilter);
    }

    // FEATURES
    var featuresList = [];
    allFeautures.forEach(function (item) {
      if (item.checked) {
        featuresList.push(item);
      }
    });

    function filterFeatures(offerItem) {
      return featuresList.every(function (feature) {
        return offerItem.offer.features.indexOf(feature.value) !== -1;
      });
    }

    filteredOffers = filteredOffers.filter(filterFeatures);

    window.pin.removePins();
    window.card.closePopup();
    window.pin.renderPins(filteredOffers, pinList);
  }

  return {
    filterHousing: filterHousing
  };
})();

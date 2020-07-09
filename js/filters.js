'use strict';
window.filters = (function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var allFeatures = document.querySelectorAll('.map__checkbox');
  var pinList = document.querySelector('.map__pins');
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  function onTypeFilter(ad) {
    return ad.offer.type === housingType.value;
  }

  function onLowPriceFilter(ad) {
    return ad.offer.price < LOW_PRICE;
  }

  function onMiddlePriceFilter(ad) {
    return (ad.offer.price >= LOW_PRICE && ad.offer.price < HIGH_PRICE);
  }

  function onHighPriceFilter(ad) {
    return (ad.offer.price >= HIGH_PRICE);
  }

  function onRoomsFilter(ad) {
    return ad.offer.rooms === parseInt(housingRooms.value, 10);
  }

  function onGuestsFilter(ad) {
    return ad.offer.guests === parseInt(housingGuests.value, 10);
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
    allFeatures.forEach(function (item) {
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

    window.card.closeCard();
    window.pin.removePins();
    window.pin.renderPins(filteredOffers, pinList);
  }

  return {
    filterHousing: filterHousing
  };
})();

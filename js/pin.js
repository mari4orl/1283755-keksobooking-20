'use strict';
window.pin = (function () {
  var MAX_OFFER_NUMBER = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var map = document.querySelector('.map');
  var pinList = document.querySelector('.map__pins');


  function renderPin(ad) {
    var adElement = pinTemplate.cloneNode(true);

    adElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    adElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    adElement.querySelector('img').src = ad.author.avatar;
    adElement.querySelector('img').alt = ad.offer.title;

    adElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.card.renderCard(ad, map);
      }
    });

    adElement.addEventListener('click', function () {
      window.card.renderCard(ad, map);
    });
    return adElement;
  }

  function renderPins(adsArray, destination) {
    var fragment = document.createDocumentFragment();
    if (adsArray.length > MAX_OFFER_NUMBER) {
      for (var i = 0; i < MAX_OFFER_NUMBER; i++) {
        fragment.appendChild(renderPin(adsArray[i]));
      }
    } else {
      for (i = 0; i < adsArray.length; i++) {
        fragment.appendChild(renderPin(adsArray[i]));
      }
    }
    destination.appendChild(fragment);
  }

  function removePins() {
    var pins = pinList.querySelectorAll('button[type="button"]');
    pins.forEach(function (item) {
      item.remove();
    });
  }

  return {
    renderPins: renderPins,
    removePins: removePins
  };
})();

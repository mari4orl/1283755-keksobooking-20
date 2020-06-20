'use strict';
window.pin = (function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  function renderPin(ad) {
    var adElement = pinTemplate.cloneNode(true);

    adElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
    adElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
    adElement.querySelector('img').src = ad.author.avatar;
    adElement.querySelector('img').alt = ad.offer.title;

    return adElement;
  }


  return {
    renderPins: function (adsArray, destination) {
      var fragment = document.createDocumentFragment();

      function onPinClick(ad) {
        pin.addEventListener('click', function () {
          window.card.renderCards(ad, map)
        });
      }

      for (var i = 0; i < adsArray.length; i++) {
        var pin = renderPin(adsArray[i]);
        fragment.appendChild(pin);
        onPinClick(adsArray[i]);
      }
      destination.appendChild(fragment);
    }
  };
})();

'use strict';
window.card = (function () {
  var cardTemplate = document.querySelector('#card').content;
  var filtersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');


  function renderCard(ad) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupCapacity = cardElement.querySelector('.popup__text--capacity');
    var popupTime = cardElement.querySelector('.popup__text--time');
    var popupType = cardElement.querySelector('.popup__type');
    var photosList = cardElement.querySelector('.popup__photos');
    var photo = photosList.querySelector('img');

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price')
    .textContent = ad.offer.price + '₽/ночь';

    switch (ad.offer.type) {
      case 'flat':
        popupType.textContent = 'Квартира';
        break;
      case 'bungalo':
        popupType.textContent = 'Бунгало';
        break;
      case 'house':
        popupType.textContent = 'Дом';
        break;
      case 'palace':
        popupType.textContent = 'Дворец';
        break;
    }
    popupCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';

    popupTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    var featuresHTML = [];
    for (var j = 0; j < ad.offer.features.length; j++) {
      featuresHTML[j] = '<li class="popup__feature popup__feature--' + ad.offer.features[j] + '"></li>';
    }
    cardElement.querySelector('.popup__features').innerHTML = featuresHTML.join('');

    cardElement.querySelector('.popup__description').textContent = ad.offer.description;

    for (var i = 0; i < ad.offer.photos.length; i++) {
      var photoElem = photo.cloneNode('true');
      photoElem.src = ad.offer.photos[i];
      photosList.appendChild(photoElem);
    }
    photo.remove();

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    return cardElement;
  }
  return {
    renderCards: function (ad, destination) {
      destination.insertBefore(renderCard(ad), filtersContainer);
    }
  };
})();

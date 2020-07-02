'use strict';
window.card = (function () {
  var cardTemplate = document.querySelector('#card').content;
  var filtersContainer = document.querySelector('.map__filters-container');

  function closePopup() {
    var card = document.querySelector('article');
    if (card) {
      card.remove();
    }
  }

  function onPopupEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  }

  function renderCard(ad, destination) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupCapacity = cardElement.querySelector('.popup__text--capacity');
    var popupTime = cardElement.querySelector('.popup__text--time');
    var popupType = cardElement.querySelector('.popup__type');
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupDescription = cardElement.querySelector('.popup__description');
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

    if (ad.offer.features) {
      for (var j = 0; j < ad.offer.features.length; j++) {
        featuresHTML[j] = '<li class="popup__feature popup__feature--' + ad.offer.features[j] + '"></li>';
      }
      popupFeatures.innerHTML = featuresHTML.join('');
    } else {
      popupFeatures.remove();
    }

    if (ad.offer.description !== '') {
      popupDescription.textContent = ad.offer.description;
    } else {
      popupDescription.remove();
    }

    if (ad.offer.photos) {
      for (var i = 0; i < ad.offer.photos.length; i++) {
        var photoElem = photo.cloneNode('true');
        photoElem.src = ad.offer.photos[i];
        photosList.appendChild(photoElem);
      }
      photo.remove();
    } else {
      photosList.remove();
    }

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    closePopup();

    destination.insertBefore(cardElement, filtersContainer);

    var popupClose = document.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onPopupEscPress);
  }

  return {
    renderCard: renderCard,
    closePopup: closePopup
  };
})();

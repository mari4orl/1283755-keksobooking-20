'use strict';
window.card = (function () {
  var cardTemplate = document.querySelector('#card').content;
  var filtersContainer = document.querySelector('.map__filters-container');

  function closeCard() {
    var card = document.querySelector('article');
    if (card) {
      card.remove();
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  }

  function onPopupEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeCard();
    }
  }

  function getOfferType(offerType) {
    var type;
    switch (offerType) {
      case 'flat':
        type = 'Квартира';
        break;
      case 'bungalo':
        type = 'Бунгало';
        break;
      case 'house':
        type = 'Дом';
        break;
      case 'palace':
        type = 'Дворец';
        break;
    }
    return type;
  }

  function renderFeatures(offerFeatures, popupFeatures) {
    var featuresHTML = [];

    if (offerFeatures) {
      for (var j = 0; j < offerFeatures.length; j++) {
        featuresHTML[j] = '<li class="popup__feature popup__feature--' + offerFeatures[j] + '"></li>';
      }
      popupFeatures.innerHTML = featuresHTML.join('');
    } else {
      popupFeatures.remove();
    }
  }

  function renderDescription(offerDescription, popupDescription) {
    if (offerDescription !== '') {
      popupDescription.textContent = offerDescription;
    } else {
      popupDescription.remove();
    }
  }

  function renderPhotos(offerPhotos, photo, photosList) {
    if (offerPhotos) {
      for (var i = 0; i < offerPhotos.length; i++) {
        var photoElem = photo.cloneNode('true');
        photoElem.src = offerPhotos[i];
        photosList.appendChild(photoElem);
      }
      photo.remove();
    } else {
      photosList.remove();
    }
  }

  function renderCard(ad, destination) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupClose = cardElement.querySelector('.popup__close');
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

    popupType.textContent = getOfferType(ad.offer.type);
    popupCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';

    popupTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    renderFeatures(ad.offer.features, popupFeatures);
    renderDescription(ad.offer.description, popupDescription);
    renderPhotos(ad.offer.photos, photo, photosList);

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    closeCard();
    destination.insertBefore(cardElement, filtersContainer);

    popupClose.addEventListener('click', closeCard);
    document.addEventListener('keydown', onPopupEscPress);
  }

  return {
    renderCard: renderCard,
    closeCard: closeCard
  };
})();

'use strict';
var MAX_PRICE = 10000;
var MAP_WIDTH = 1200;
var MAP_Y_1 = 130;
var MAP_Y_2 = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var adsNumber = 8;

var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

var filtersContainer = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
}

function findNearestAd(number) {
  var nearestAds = [];

  for (var i = 0; i < number; i++) {
    var newFeaturesArray = [];
    var photosArray = [];
    for (var j = 0; j < getRandomInt(1, features.length + 1); j++) {
      newFeaturesArray[j] = features[j];
    }

    for (var k = 0; k < getRandomInt(1, photos.length + 1); k++) {
      photosArray[k] = photos[k];
    }
    var locationX = getRandomInt(0, MAP_WIDTH + 1);
    var locationY = getRandomInt(MAP_Y_1, MAP_Y_2 + 1);
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Название объявления',
        address: locationX + ',' + locationY,
        price: getRandomInt(1, MAX_PRICE + 1),
        type: types[getRandomInt(0, types.length)],
        rooms: getRandomInt(1, 6),
        guests: getRandomInt(1, 6),
        checkin: times[getRandomInt(0, times.length)],
        checkout: times[getRandomInt(0, times.length)],
        features: newFeaturesArray,
        description: 'Описание объявления',
        photos: photosArray
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    nearestAds[i] = ad;
  }
  return nearestAds;
}

function renderPin(ad) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.style.left = ad.location.x - PIN_WIDTH / 2 + 'px';
  adElement.style.top = ad.location.y - PIN_HEIGHT + 'px';
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = ad.offer.title;

  return adElement;
}

function renderPins(adsArray, destination) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsArray.length; i++) {
    fragment.appendChild(renderPin(adsArray[i]));
  }
  destination.appendChild(fragment);
}

function renderCard(ad) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price')
  .textContent = ad.offer.price + '₽/ночь';

  var popupType = cardElement.querySelector('.popup__type');
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
    default:
      popupType.textContent = 'Дворец';
  }
  var popupCapacity = cardElement.querySelector('.popup__text--capacity');
  popupCapacity.textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';

  var popupTime = cardElement.querySelector('.popup__text--time');
  popupTime.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  var featuresHTML = [];
  for (var j = 0; j < ad.offer.features.length; j++) {
    featuresHTML[j] = '<li class="popup__feature popup__feature--' + ad.offer.features[j] + '"></li>';
  }
  cardElement.querySelector('.popup__features').innerHTML = featuresHTML.join('');

  cardElement.querySelector('.popup__description').textContent = ad.offer.description;

  var photosList = cardElement.querySelector('.popup__photos');
  var photo = photosList.querySelector('img');
  for (var i = 0; i < ad.offer.photos.length; i++) {
    var photoElem = photo.cloneNode('true');
    photoElem.src = ad.offer.photos[i];
    photosList.appendChild(photoElem);
  }
  photo.remove();

  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return cardElement;
}

function renderCards(adsArray, destination) {
  var fragment = document.createDocumentFragment();

  fragment.appendChild(renderCard(adsArray[1]));
  destination.insertBefore(fragment, filtersContainer);
}

map.classList.remove('map--faded');

var nearestAds = findNearestAd(adsNumber);

renderPins(nearestAds, pinList);

renderCards(nearestAds, map);

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

var map = document.querySelector('.map');

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');

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
    for (var j = 0; j <= getRandomInt(1, features.length); j++) {
      newFeaturesArray[j] = features[j];
    }

    for (var k = 0; k <= getRandomInt(1, 10); k++) {
      photosArray[k] = 'http://o0.github.io/assets/images/tokyo/hotel' + k + '.jpg';
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

map.classList.remove('map--faded');

var nearestAds = findNearestAd(adsNumber);

renderPins(nearestAds, pinList);

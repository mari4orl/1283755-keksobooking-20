'use strict';
var MAX_PRICE = 10000;

var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
}

function findNearestAd(adNumber) {
  var nearestAdArray = [];

  for (var i = 0; i < adNumber; i++) {
    var newFeaturesArray = [];
    var photosArray = [];
    for (var j = 0; j <= getRandomInt(1, featuresArray.length); j++) {
      newFeaturesArray[j] = featuresArray[j];
    }

    for (var k = 0; k <= getRandomInt(1, 10); k++) {
      photosArray[k] = 'http://o0.github.io/assets/images/tokyo/hotel' + k + '.jpg';
    }
    var avaNumber = 1 + i;
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + avaNumber + '.png'
      },
      offer: {
        title: 'Название объявления',
        address: getRandomInt(0, 1201) + ',' + getRandomInt(130, 631),
        price: getRandomInt(1, MAX_PRICE),
        type: types[getRandomInt(0, types.length)],
        rooms: getRandomInt(1, 6),
        guests: getRandomInt(1, 6),
        checkin: times[getRandomInt(0, times.length)],
        checkout: times[getRandomInt(0, times.length)],
        features: newFeaturesArray,
        description: 'Описание объявления',
        photos: photosArray,
      },
      location: {
        x: getRandomInt(0, 1201),
        y: getRandomInt(130, 631)
      }
    };
    nearestAdArray[i] = ad;
  }
  return nearestAdArray;
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var nearestAdArray = findNearestAd(8);
var fragment = document.createDocumentFragment();

function renderPins(ad) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.style.left = ad.location.x - 25 + 'px';
  adElement.style.top = ad.location.y - 70 + 'px';
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = ad.offer.title;

  return adElement;
}

for (var i = 0; i < nearestAdArray.length; i++) {
  fragment.appendChild(renderPins(nearestAdArray[i]));
}

pinList.appendChild(fragment);

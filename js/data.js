'use strict';
window.data = (function () {
  var MAX_PRICE = 10000;
  var MAP_WIDTH = 1200;
  var MAP_Y_1 = 130;
  var MAP_Y_2 = 630;

  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // Максимум не включается, минимум включается
  }

  return {
    findNearestAd: function (number) {
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
  };
})();

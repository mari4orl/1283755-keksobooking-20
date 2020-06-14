'use strict';
window.form = (function () {
  var guestsRoomsMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };
  var mapFilters = document.querySelector('.map__filters');
  var allForms = document.querySelectorAll('.ad-form fieldset, .map__filters .map__filter');
  var mapFiltersFieldset = mapFilters.querySelector('.map__features');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var currentRooms = roomNumber.value;
  var currentGuests = parseInt(capacity.value, 10);

  if (guestsRoomsMap[currentRooms].indexOf(currentGuests) === -1) {
    capacity.setCustomValidity('Выберите другое количество комнат или гостей');
    roomNumber.setCustomValidity('Выберите другое количество комнат или гостей');
  }

  return {
    toggleFieldsetAvailability: function (disabledFlag) {
      if (disabledFlag) {
        for (var i = 0; i < allForms.length; i++) {
          allForms[i].setAttribute('disabled', 'disabled');
        }
        mapFiltersFieldset.setAttribute('disabled', 'disabled');
      } else {
        for (var j = 0; j < allForms.length; j++) {
          allForms[j].removeAttribute('disabled', 'disabled');
        }
        mapFiltersFieldset.removeAttribute('disabled', 'disabled');
      }
    },

    checkGuestRoomMatch: function () {
      currentRooms = roomNumber.value;
      currentGuests = parseInt(capacity.value, 10);
      if (guestsRoomsMap[currentRooms].indexOf(currentGuests) === -1) {
        capacity.setCustomValidity('Выберите другое количество комнат или гостей');
        roomNumber.setCustomValidity('Выберите другое количество комнат или гостей');
      } else {
        capacity.setCustomValidity('');
        roomNumber.setCustomValidity('');
      }
    }
  };
})();

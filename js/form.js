'use strict';
window.form = (function () {
  var guestsRoomsMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };
  var allForms = document.querySelectorAll('.ad-form fieldset, .map__filters .map__filter, .map__filters .map__features');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var currentRooms = roomNumber.value;
  var currentGuests = parseInt(capacity.value, 10);

  if (guestsRoomsMap[currentRooms].indexOf(currentGuests) === -1) {
    roomNumber.setCustomValidity('Выберите другое количество комнат или гостей');
  }

  return {
    toggleFieldsetAvailability: function (disabledFlag) {
      if (disabledFlag) {
        for (var i = 0; i < allForms.length; i++) {
          allForms[i].setAttribute('disabled', 'disabled');
        }
      } else {
        for (var j = 0; j < allForms.length; j++) {
          allForms[j].removeAttribute('disabled', 'disabled');
        }
      }
    },

    checkGuestRoomMatch: function () {
      currentRooms = roomNumber.value;
      currentGuests = parseInt(capacity.value, 10);
      if (guestsRoomsMap[currentRooms].indexOf(currentGuests) === -1) {
        roomNumber.setCustomValidity('Выберите другое количество комнат или гостей');
      } else {
        roomNumber.setCustomValidity('');
      }
    }
  };
})();
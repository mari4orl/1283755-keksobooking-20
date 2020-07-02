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
  var adForm = document.querySelector('.ad-form');

  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  if (guestsRoomsMap[currentRooms].indexOf(currentGuests) === -1) {
    roomNumber.setCustomValidity('Выберите другое количество комнат или гостей');
  }

  function toggleFieldsetAvailability(disabledFlag) {
    if (disabledFlag) {
      for (var i = 0; i < allForms.length; i++) {
        allForms[i].setAttribute('disabled', 'disabled');
      }
    } else {
      for (var j = 0; j < allForms.length; j++) {
        allForms[j].removeAttribute('disabled', 'disabled');
      }
    }
  }

  function onGuestRoomChange() {
    currentRooms = roomNumber.value;
    currentGuests = parseInt(capacity.value, 10);
    if (guestsRoomsMap[currentRooms].indexOf(currentGuests) === -1) {
      roomNumber.setCustomValidity('Выберите другое количество комнат или гостей');
    } else {
      roomNumber.setCustomValidity('');
    }
  }

  function onChangeMinPrice() {
    switch (type.value) {
      case 'flat':
        price.min = '1000';
        price.placeholder = '1000';
        break;
      case 'bungalo':
        price.min = '0';
        price.placeholder = '0';
        break;
      case 'house':
        price.min = '5000';
        price.placeholder = '5000';
        break;
      case 'palace':
        price.min = '10000';
        price.placeholder = '10000';
        break;
    }
  }

  function onTimeChange(from, to) {
    to.value = from.value;
  }

  function onSubmit(evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), function () {
      window.page.deactivate();
      window.popups.openCloseSuccess();
    }, window.popups.openCloseError);
  }

  return {
    toggleFieldsetAvailability: toggleFieldsetAvailability,

    onGuestRoomChange: onGuestRoomChange,

    onChangeMinPrice: onChangeMinPrice,

    onTimeChange: onTimeChange,

    onSubmit: onSubmit
  };
})();

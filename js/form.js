'use strict';
window.form = (function () {
  var guestsRoomsMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var allForms = document.querySelectorAll('.ad-form fieldset, .map__filters .map__filter, .map__filters .map__features');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var currentRooms = roomNumber.value;
  var currentGuests = parseInt(capacity.value, 10);
  var adForm = document.querySelector('.ad-form');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var avatarInput = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var housePhotoInput = document.querySelector('.ad-form__upload input[type=file]');
  var housePhotoPreview = document.querySelector('.ad-form__photo');

  function onPictureUpload(input, preview) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if ('src' in preview) {
          preview.src = reader.result;
        } else {
          var img = preview.querySelector('img');
          if (img) {
            img.remove();
          }
          img = document.createElement('img');
          preview.appendChild(img);
          img.width = '70';
          img.height = '70';
          img.src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  }

  avatarInput.addEventListener('change', onPictureUpload.bind(null, avatarInput, avatarPreview));
  housePhotoInput.addEventListener('change', onPictureUpload.bind(null, housePhotoInput, housePhotoPreview));

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

  function onTimeChange(sourceElement, targetElement) {
    targetElement.value = sourceElement.value;
  }

  function onDataUpload() {
    window.page.deactivate();
    window.popups.onDataLoadSuccess();
  }

  function onSubmit(evt) {
    evt.preventDefault();
    window.backend.load(URL_UPLOAD, 'POST', onDataUpload, window.popups.onDataLoadError, new FormData(adForm));
  }

  return {
    toggleFieldsetAvailability: toggleFieldsetAvailability,

    onGuestRoomChange: onGuestRoomChange,

    onChangeMinPrice: onChangeMinPrice,

    onTimeChange: onTimeChange,

    onSubmit: onSubmit
  };
})();

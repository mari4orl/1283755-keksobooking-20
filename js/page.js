'use strict';
window.page = (function () {
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinList = document.querySelector('.map__pins');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var type = document.querySelector('#type');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var reset = document.querySelector('.ad-form__reset');
  var inputAddress = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var defaultCoordinateX = 570;
  var defaultCoordinateY = 375;

  var housingType = document.querySelector('#housing-type');
  var offers = [];
  // function onError(errorMessage) {
  //   var node = document.createElement('div');
  //   node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #E87362; width: 1200px; color: #ffffff';
  //   node.style.position = 'absolute';
  //   node.style.left = 0;
  //   node.style.right = 0;
  //   node.style.fontSize = '30px';
  //
  //   node.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', node);
  // }

  function onSuccess(data) {
    offers = data;
    window.pin.renderPins(offers, pinList);
    window.form.toggleFieldsetAvailability(false);
  }

  housingType.addEventListener('change', function () {
    window.filters.filterHousing(offers);
  });

  function deactivate() {
    adForm.reset();
    window.pin.removePins();
    window.card.closePopup();
    mapPinMain.style.top = defaultCoordinateY + 'px';
    mapPinMain.style.left = defaultCoordinateX + 'px';

    inputAddress.value = window.utils.getCoordinates(mapPinMain, false);
    mapPinMain.addEventListener('mousedown', onLeftBtnMouseClick);
    mapPinMain.addEventListener('keydown', onEnterPress);
    window.form.toggleFieldsetAvailability(true);

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
  }

  function onLeftBtnMouseClick(evt) {
    if (evt.button === 0) {
      window.page.makeActive();
    }
  }

  function onEnterPress(evt) {
    if (evt.key === 'Enter') {
      window.page.makeActive();
    }
  }

  function makeActive() {

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    roomNumber.addEventListener('change', window.form.onGuestRoomChange);
    capacity.addEventListener('change', window.form.onGuestRoomChange);
    type.addEventListener('change', window.form.onChangeMinPrice);
    timeIn.addEventListener('change', window.form.onTimeChange.bind(null, timeIn, timeOut));
    timeOut.addEventListener('change', window.form.onTimeChange.bind(null, timeOut, timeIn));

    window.backend.load(onSuccess);

    mapPinMain.removeEventListener('mousedown', onLeftBtnMouseClick);
    mapPinMain.removeEventListener('keydown', onEnterPress);
    reset.addEventListener('click', deactivate);
  }

  return {
    makeActive: makeActive,
    onLeftBtnMouseClick: onLeftBtnMouseClick,
    onEnterPress: onEnterPress,
    deactivate: deactivate
  };
})();

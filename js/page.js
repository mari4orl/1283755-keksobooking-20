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
  var allFilters = document.querySelector('.map__filters');
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var offers = [];

  function onSuccess(data) {
    offers = data;
    window.pin.renderPins(offers, pinList);
    window.form.toggleFieldsetAvailability(false);
  }

  function onFilterChange() {
    window.filters.filterHousing(offers);
  }

  function deactivatePage() {
    adForm.reset();
    window.pin.removePins();
    window.card.closeCard();
    mapPinMain.style.top = defaultCoordinateY + 'px';
    mapPinMain.style.left = defaultCoordinateX + 'px';

    inputAddress.value = window.utils.getCoordinates(mapPinMain, false);
    mapPinMain.addEventListener('mousedown', onLeftBtnMouseClick);
    mapPinMain.addEventListener('keydown', onEnterPress);
    window.form.toggleFieldsetAvailability(true);

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    adForm.removeEventListener('submit', window.form.onSubmit);
    roomNumber.removeEventListener('change', window.form.onGuestRoomChange);
    capacity.removeEventListener('change', window.form.onGuestRoomChange);
    type.removeEventListener('change', window.form.onChangeMinPrice);
    timeIn.removeEventListener('change', window.form.onTimeChange.bind(null, timeIn, timeOut));
    timeOut.removeEventListener('change', window.form.onTimeChange.bind(null, timeOut, timeIn));

  }

  function onLeftBtnMouseClick(evt) {
    if (evt.button === 0) {
      window.page.activatePage();
    }
  }

  function onEnterPress(evt) {
    if (evt.key === 'Enter') {
      window.page.activatePage();
    }
  }

  function activatePage() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    roomNumber.addEventListener('change', window.form.onGuestRoomChange);
    capacity.addEventListener('change', window.form.onGuestRoomChange);
    type.addEventListener('change', window.form.onChangeMinPrice);
    timeIn.addEventListener('change', window.form.onTimeChange.bind(null, timeIn, timeOut));
    timeOut.addEventListener('change', window.form.onTimeChange.bind(null, timeOut, timeIn));

    window.backend.load(URL, 'GET', onSuccess, window.popups.onDataLoadError);
    adForm.addEventListener('submit', window.form.onSubmit);
    mapPinMain.removeEventListener('mousedown', onLeftBtnMouseClick);
    mapPinMain.removeEventListener('keydown', onEnterPress);
    reset.addEventListener('click', deactivatePage);
  }

  allFilters.addEventListener('change', window.utils.debounce(onFilterChange));

  return {
    activatePage: activatePage,
    onLeftBtnMouseClick: onLeftBtnMouseClick,
    onEnterPress: onEnterPress,
    deactivatePage: deactivatePage
  };
})();

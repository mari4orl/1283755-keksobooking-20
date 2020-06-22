'use strict';

var map = document.querySelector('.map');
var pinList = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var type = document.querySelector('#type');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var reset = document.querySelector('.ad-form__reset');
var inputAddress = document.querySelector('#address');
var mapPinMainX = parseInt(mapPinMain.style.left, 10);
var mapPinMainY = parseInt(mapPinMain.style.top, 10);
var MAIN_PIN_SIZE = 62;
var defaultCoordinateX = 570;
var defaultCoordinateY = 375;

function onResetClick() {
  adForm.reset();
  var pins = pinList.querySelectorAll('button[type="button"]');
  pins.forEach(function (item) {
    item.remove();
  });
  window.utils.removeArticle();
  mapPinMain.style.top = defaultCoordinateY + 'px';
  mapPinMain.style.left = defaultCoordinateX + 'px';

  inputAddress.value = Math.round(parseInt(mapPinMain.style.left, 10) + MAIN_PIN_SIZE / 2) + ', ' + Math.round(parseInt(mapPinMain.style.top, 10) + MAIN_PIN_SIZE / 2);
  mapPinMain.addEventListener('mousedown', onLeftBtnMouseClick);
  mapPinMain.addEventListener('keydown', onEnterPress);
}

function onError(errorMessage) {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #E87362; width: 1200px; color: #ffffff';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
}

function onSuccess(data) {
  window.pin.renderPins(data, pinList);
}

function onSubmit(evt) {
  evt.preventDefault();
  window.backend.upload(new FormData(adForm), function () {
    deactive();
  });
}
adForm.addEventListener('submit', onSubmit);


function makeActive() {
  window.form.toggleFieldsetAvailability(false);

  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  roomNumber.addEventListener('change', window.form.onGuestRoomChange);
  capacity.addEventListener('change', window.form.onGuestRoomChange);
  type.addEventListener('change', window.form.onChangeMinPrice);
  timeIn.addEventListener('change', window.form.onTimeChange.bind(null, timeIn, timeOut));
  timeOut.addEventListener('change', window.form.onTimeChange.bind(null, timeOut, timeIn));

  window.backend.load(onSuccess, onError);

  mapPinMain.removeEventListener('mousedown', onLeftBtnMouseClick);
  mapPinMain.removeEventListener('keydown', onEnterPress);
  reset.addEventListener('click', onResetClick);
}

function onLeftBtnMouseClick(evt) {
  if (evt.button === 0) {
    makeActive();
  }
}

function onEnterPress(evt) {
  if (evt.key === 'Enter') {
    makeActive();
  }
}

function deactive() {
  onResetClick();
  window.form.toggleFieldsetAvailability(true);

  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
}

mapPinMain.addEventListener('mousedown', onLeftBtnMouseClick);
mapPinMain.addEventListener('keydown', onEnterPress);

window.form.toggleFieldsetAvailability(true);

inputAddress.value = Math.round(mapPinMainX + MAIN_PIN_SIZE / 2) + ', ' + Math.round(mapPinMainY + MAIN_PIN_SIZE / 2);
inputAddress.readOnly = true;

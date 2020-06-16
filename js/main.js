'use strict';
var adsNumber = 8;

var map = document.querySelector('.map');
var pinList = document.querySelector('.map__pins');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var inputAddress = document.querySelector('#address');
var mapPinMainX = parseInt(mapPinMain.style.left, 10);
var mapPinMainY = parseInt(mapPinMain.style.top, 10);
var MAIN_PIN_SIZE = 62;

function makeActive() {
  var nearestAds = window.data.findNearestAd(adsNumber);

  window.form.toggleFieldsetAvailability(false);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  roomNumber.addEventListener('change', window.form.checkGuestRoomMatch);
  capacity.addEventListener('change', window.form.checkGuestRoomMatch);
  window.pin.renderPins(nearestAds, pinList);
  window.card.renderCards(nearestAds, map);
  mapPinMain.removeEventListener('mousedown', makeActiveByMouse);
  mapPinMain.removeEventListener('keydown', makeActiveByBtn);
}

function makeActiveByMouse(evt) {
  if (evt.button === 0) {
    makeActive();
  }
}

function makeActiveByBtn(evt) {
  if (evt.key === 'Enter') {
    makeActive();
  }
}

mapPinMain.addEventListener('mousedown', makeActiveByMouse);
mapPinMain.addEventListener('keydown', makeActiveByBtn);

window.form.toggleFieldsetAvailability(true);

inputAddress.value = Math.round(mapPinMainX + MAIN_PIN_SIZE / 2) + ', ' + Math.round(mapPinMainY + MAIN_PIN_SIZE / 2);
inputAddress.readOnly = true;

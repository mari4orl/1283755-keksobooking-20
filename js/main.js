'use strict';

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var inputAddress = document.querySelector('#address');
var mapPinMainX = parseInt(mapPinMain.style.left, 10);
var mapPinMainY = parseInt(mapPinMain.style.top, 10);

adForm.addEventListener('submit', window.form.onSubmit);

mapPinMain.addEventListener('mousedown', window.page.onLeftBtnMouseClick);
mapPinMain.addEventListener('keydown', window.page.onEnterPress);

window.form.toggleFieldsetAvailability(true);

inputAddress.value = window.utils.getCoordinates(mapPinMainX, mapPinMainY, false);
inputAddress.readOnly = true;

'use strict';

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var inputAddress = document.querySelector('#address');

adForm.addEventListener('submit', window.form.onSubmit);

mapPinMain.addEventListener('mousedown', window.page.onLeftBtnMouseClick);
mapPinMain.addEventListener('keydown', window.page.onEnterPress);

window.form.toggleFieldsetAvailability(true);

inputAddress.value = window.utils.getCoordinates(mapPinMain, false);
inputAddress.readOnly = true;

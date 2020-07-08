'use strict';

var mapPinMain = document.querySelector('.map__pin--main');
var inputAddress = document.querySelector('#address');

mapPinMain.addEventListener('mousedown', window.page.onLeftBtnMouseClick);
mapPinMain.addEventListener('keydown', window.page.onEnterPress);

window.form.toggleFieldsetAvailability(true);

inputAddress.value = window.utils.getCoordinates(mapPinMain, false);
inputAddress.readOnly = true;

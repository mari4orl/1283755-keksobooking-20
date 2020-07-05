'use strict';
window.popups = (function () {
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;
  var main = document.querySelector('main');

  function onDataLoadSuccess() {
    var success = successTemplate.cloneNode(true);
    main.appendChild(success);

    success = document.querySelector('.success');

    function onSuccessClose() {
      success.remove();
      document.removeEventListener('click', onSuccessClose);
      document.removeEventListener('keydown', onEscSuccessClose);
    }

    function onEscSuccessClose(evt) {
      if (evt.key === 'Escape') {
        onSuccessClose();
      }
    }

    document.addEventListener('click', onSuccessClose);
    document.addEventListener('keydown', onEscSuccessClose);
  }

  function onDataLoadError() {
    var error = errorTemplate.cloneNode(true);
    main.appendChild(error);

    error = document.querySelector('.error');
    var errorButton = error.querySelector('.error__button');

    function onErrorClose() {
      error.remove();
      document.removeEventListener('click', onErrorClose);
      document.removeEventListener('keydown', onEscErrorClose);
    }

    function onEscErrorClose(evt) {
      if (evt.key === 'Escape') {
        onErrorClose();
      }
    }
    document.addEventListener('keydown', onEscErrorClose);
    document.addEventListener('click', onErrorClose);
    errorButton.addEventListener('click', onErrorClose);
  }

  return {
    onDataLoadSuccess: onDataLoadSuccess,
    onDataLoadError: onDataLoadError
  };
})();

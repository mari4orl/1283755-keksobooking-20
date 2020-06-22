'use strict';
window.backend = (function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;
  var main = document.querySelector('main');

  function openCloseSuccess() {
    var success = successTemplate.cloneNode(true);
    main.appendChild(success);

    success = document.querySelector('.success');
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        success.remove();
      }
    });
    document.addEventListener('click', function () {
      success.remove();
    });
  }

  function openCloseError() {
    var error = errorTemplate.cloneNode(true);
    main.appendChild(error);

    error = document.querySelector('.error');
    var errorButton = error.querySelector('.error__button');
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        error.remove();
      }
    });
    // document.addEventListener('click', function () {
    //   error.remove();
    // });
    errorButton.addEventListener('click', function () {
      error.remove();
    });
  }
  return {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL);
      xhr.send();
    },

    upload: function (data, onLoad) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
          openCloseSuccess();
        } else {
          openCloseError();
        }
      });
      xhr.addEventListener('error', function () {
        openCloseError();
      });

      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };
})();

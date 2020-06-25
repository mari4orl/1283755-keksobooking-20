'use strict';
window.backend = (function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';

  function load(onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // if (xhr.status === 200) {
      onSuccess(xhr.response);
      //   } else {
      //     onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      //   }
      // });
      //
      // xhr.addEventListener('error', function () {
      //   onError('Произошла ошибка соединения');
    });
    //
    // xhr.addEventListener('timeout', function () {
    //   onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    // });
    //
    // xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  }

  function upload(data, onLoad, onErrorUpload) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onErrorUpload();
      }
    });
    xhr.addEventListener('error', function () {
      onErrorUpload();
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  }

  return {
    load: load,
    upload: upload

  };
})();

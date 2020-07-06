'use strict';
window.backend = (function () {
  function load(url, method, onLoadSuccess, onLoadError, data) {
    var errorMessage = '';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    if (method === 'GET') {
      errorMessage = 'Ошибка загрузки данных с сервера';
    }
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoadSuccess(xhr.response);
      } else {
        onLoadError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onLoadError(errorMessage);
    });

    xhr.open(method, url);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  }

  return {
    load: load
  };
})();

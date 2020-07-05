'use strict';
window.backend = (function () {
  // var URL = 'https://javascript.pages.academy/keksobooking/data';
  // var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';

  function load(url, method, onLoadSuccess, onLoadError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoadSuccess(xhr.response);
      } else {
        onLoadError();
      }
    });

    xhr.addEventListener('error', function () {
      onLoadError();
    });

    xhr.open(method, url);
    if (data) {
      xhr.send(data);
    }
  }


  // function load(onSuccess) {
  //   var xhr = new XMLHttpRequest();
  //
  //   xhr.responseType = 'json';
  //
  //   xhr.addEventListener('load', function () {
  //     onSuccess(xhr.response);
  //   });
  //
  //   xhr.open('GET', URL);
  //   xhr.send();
  // }
  //
  // function upload(data, onLoad, onErrorUpload) {
  //   var xhr = new XMLHttpRequest();
  //
  //   xhr.responseType = 'json';
  //
  //   xhr.addEventListener('load', function () {
  //     if (xhr.status === 200) {
  //       onLoad(xhr.response);
  //     } else {
  //       onErrorUpload();
  //     }
  //   });
  //   xhr.addEventListener('error', function () {
  //     onErrorUpload();
  //   });
  //
  //   xhr.open('POST', URL_UPLOAD);
  //   xhr.send(data);
  // }

  return {
    load: load
  };
})();

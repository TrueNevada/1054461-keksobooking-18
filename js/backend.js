'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/';
  var URL_DATA = URL + 'data';

  var send = function (url, method, onError, onLoad, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ответ сервера: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, url);
    xhr.send(data);
  }

  var load = function (onError, onLoad) {
    send(URL_DATA, 'GET', onError, onLoad, null);
  }

  var save = function (data, onError, onLoad) {
    send(URL, 'POST', onError, onLoad, data);
  }

  window.backend = {
    load: load,
    save: save
  };
})();

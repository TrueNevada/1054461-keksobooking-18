'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FILE_TYPE_REGEXP = new RegExp('\.(' + FILE_TYPES.join('|') + ')$', 'i');
  var FillingType = {
    REPLACE_WITH: 'replace',
    ADD_TO: 'addTo'
  };

  var matchFiles = function (files) {
    var resultFiles = [];

    Array.from(files).forEach(function (file) {
      var fileName = file.name.toLowerCase();
      if (FILE_TYPE_REGEXP.test(fileName)) {
        resultFiles.push(file);
      }
    });

    return resultFiles;
  };

  var fillPreview = function (file, preview) {
    var reader = new FileReader();
    var image = preview.querySelector('img');

    if (!image) {
      image = document.createElement('img');
      preview.appendChild(image);
    }

    reader.addEventListener('load', function () {
      image.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var addPreview = function (files, preview) {
    files.forEach(function (file) {
      var previewContainer = preview.parentElement;
      var newPreview;

      if (preview.dataset.userLoaded === 'true') {
        newPreview = preview.cloneNode(true);
        previewContainer.appendChild(newPreview);
      } else {
        newPreview = preview;
        newPreview.dataset.userLoaded = 'true';
      }

      fillPreview(file, newPreview);
    });
  };

  var readFiles = function (files, preview, fillingType) {
    if (!files.length) {
      return;
    }

    switch (fillingType) {
      case FillingType.REPLACE_WITH:
        fillPreview(files[0], preview);
        break;

      case FillingType.ADD_TO:
      default:
        addPreview(files, preview);
        break;
    }
  };

  var setup = function (fileControl, preview, fillingType) {
    fileControl.addEventListener('change', function () {
      readFiles(matchFiles(fileControl.files), preview, fillingType);
    });
  };

  window.fileLoader = {
    setup: setup,
    FillingType: FillingType
  };
})();

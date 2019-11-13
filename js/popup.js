'use strict';

(function () {
  var generateOffer = function (advertisement) {
    var card = document.querySelector('#card')
    .content
    .querySelector('.popup');

    var popup = card.cloneNode(true);
    var closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', popupRemove);
    var imagesRoot = popup.querySelector('.popup__photos');
    var image = imagesRoot.querySelector('img');
    image.remove();

    popup.querySelector('.popup__title').textContent = advertisement.offer.title;
    popup.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    popup.querySelector('.popup__text--price').textContent = advertisement.offer.price + ' ₽/ночь';
    popup.querySelector('.popup__type').textContent = window.util.translateType(advertisement.offer.type);
    popup.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    popup.querySelector('.popup__features').textContent = advertisement.offer.features;
    popup.querySelector('.popup__description').textContent = advertisement.offer.description;
    popup.querySelector('.popup__avatar').src = advertisement.author.avatar;

    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < advertisement.offer.photos.length; i++) {
      var img = image.cloneNode(true);
      img.src = advertisement.offer.photos[i];
      photosFragment.appendChild(img);
    }

    imagesRoot.appendChild(photosFragment);

    return popup;
  };

  var insertAdvertisement = function (marker) {
    var offer = document.createDocumentFragment();
    offer.appendChild(generateOffer(marker));
    window.util.map.insertBefore(offer, document.querySelector('.map__filters-container'));
  };

  var popupRemove = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    };
  }

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      popupRemove();
    }

  });

  window.popup = {
    insertAdvertisement: insertAdvertisement,
    popupRemove: popupRemove
  };
})();

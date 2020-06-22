'use strict';
window.utils = (function () {
  return {
    removeArticle: function () {
      var card = document.querySelector('article');
      if (card) {
        card.remove();
      }
    }
  };
})();

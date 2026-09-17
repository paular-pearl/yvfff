/* Compatibility loader for pages that reference js/main.js. */
(function () {
  'use strict';

  var replacements = {
    'cake.JPG': 'cake.jpg',
    'items.JPG': 'items.jpg'
  };

  function fixAssetPaths() {
    document.querySelectorAll('img, source').forEach(function (element) {
      var attribute = element.tagName.toLowerCase() === 'source' ? 'srcset' : 'src';
      var value = element.getAttribute(attribute);
      if (!value) return;
      value = value.replace(/\\/g, '/').replace(/^images\//, '');
      Object.keys(replacements).forEach(function (from) {
        value = value.replace(from, replacements[from]);
      });
      element.setAttribute(attribute, value);
    });

    document.querySelectorAll('link[rel="icon"]').forEach(function (element) {
      var value = element.getAttribute('href');
      if (value) element.setAttribute('href', value.replace(/^images\//, ''));
    });
  }

  fixAssetPaths();
  var script = document.createElement('script');
  script.src = '../main.js';
  document.head.appendChild(script);
})();

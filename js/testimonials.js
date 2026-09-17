/* Compatibility loader for pages that reference js/testimonials.js. */
(function () {
  var script = document.createElement('script');
  script.src = '../testimonials.js';
  document.head.appendChild(script);
})();

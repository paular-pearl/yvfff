/* ============================================================
   TESTIMONIALS PAGE — Page-specific JavaScript
   Filter tabs and testimonial card animations
   ============================================================ */

(function () {
  'use strict';

  /* ---- Intersection Observer — fade-in testimonial cards ---- */
  var cards = document.querySelectorAll('.testimonial-card');

  if (cards.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    cards.forEach(function (card) {
      observer.observe(card);
    });
  } else {
    cards.forEach(function (card) {
      card.classList.add('visible');
    });
  }

  /* ---- Filter Tabs ---- */
  var tabs = document.querySelectorAll('.filter-tab');

  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var filter = this.dataset.filter;

        // Update active tab
        tabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        // Filter cards
        cards.forEach(function (card) {
          var category = card.dataset.category;
          var shouldShow = filter === 'all' || category === filter;

          if (shouldShow) {
            card.style.display = '';
            card.classList.remove('visible');
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                card.classList.add('visible');
              });
            });
          } else {
            card.style.display = 'none';
            card.classList.remove('visible');
          }
        });
      });
    });
  }

})();

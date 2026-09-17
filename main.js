/* ============================================================
   YOUR VOICE FOUNDATION — Shared JavaScript
   Navbar, mobile menu, scroll animations, counter animation
   ============================================================ */

(function () {
  'use strict';

  /* ---- Sticky header shadow on scroll ---- */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ---- Mobile menu toggle ---- */
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Intersection Observer — fade-in elements ---- */
  var animatedEls = document.querySelectorAll('.animate-on-scroll');

  if (animatedEls.length && 'IntersectionObserver' in window) {
    var scrollObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(function (el) {
      scrollObserver.observe(el);
    });
  } else {
    animatedEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- Counter animation for stat values ---- */
  var stats = document.querySelectorAll('.hero-stat__value');

  function animateValue(el, start, end, duration, suffix) {
    var startTimestamp = null;
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      var progress = Math.min((timestamp - startTimestamp) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * (end - start) + start) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  if (stats.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var text = el.textContent.trim();
          var match = text.match(/^(\d+)(.*)$/);
          if (match) {
            animateValue(el, 0, parseInt(match[1], 10), 1500, match[2]);
          }
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(function (stat) { counterObserver.observe(stat); });
  }

})();

/* ==========================================================
   NorbGrafix — script.js
   Mobile menu, header state, parallax, portfolio filter,
   scroll reveal and lightbox.
   ========================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobileQuery = window.matchMedia('(max-width: 860px)');

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header + mobile menu ---------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
  }

  toggle.addEventListener('click', function () {
    setMenu(!header.classList.contains('nav-open'));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  function onMediaChange() {
    if (!mobileQuery.matches) setMenu(false);
  }
  if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', onMediaChange);
  else if (mobileQuery.addListener) mobileQuery.addListener(onMediaChange);

  /* ---------- Scroll handling (header background + parallax) ---------- */
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-speed]'));
  var ticking = false;

  function update() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('is-scrolled', y > 24);

    if (!reduceMotion && y < window.innerHeight * 1.6) {
      var factor = mobileQuery.matches ? 0.5 : 1;
      layers.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-speed')) || 0;
        el.style.transform = 'translate3d(0,' + (-y * speed * factor).toFixed(1) + 'px,0)';
      });
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  update();

  /* ---------- Portfolio filter ---------- */
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  var works = Array.prototype.slice.call(document.querySelectorAll('.work'));

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-filter');

      filterButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      works.forEach(function (w) {
        var show = value === 'all' || w.getAttribute('data-category') === value;
        w.hidden = !show;
        if (show) w.classList.add('is-visible'); // already on screen after a filter click
      });
    });
  });

  /* ---------- Scroll reveal (portfolio items) ---------- */
  if (reduceMotion || !('IntersectionObserver' in window)) {
    works.forEach(function (w) { w.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

    works.forEach(function (w) { observer.observe(w); });
  }

  /* ---------- Lightbox ---------- */
  var gallery = document.querySelector('.gallery');
  var lightbox = document.getElementById('lightbox');

  if (gallery && lightbox) {
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-cap');
  var btnClose = lightbox.querySelector('.lb-close');
  var btnPrev = lightbox.querySelector('.lb-prev');
  var btnNext = lightbox.querySelector('.lb-next');

  var items = [];
  var current = 0;
  var lastFocus = null;
  var closeTimer = null;

  function visibleItems() {
    return Array.prototype.slice.call(gallery.querySelectorAll('.work:not([hidden]) .work-btn'));
  }

  function show(index) {
    if (!items.length) return;
    current = (index + items.length) % items.length;
    var btn = items[current];
    var img = btn.querySelector('img');
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = btn.getAttribute('data-caption') + ' (' + (current + 1) + ' of ' + items.length + ')';
    var single = items.length < 2;
    btnPrev.disabled = single;
    btnNext.disabled = single;
  }

  function openLightbox(btn) {
    clearTimeout(closeTimer);
    items = visibleItems();
    lastFocus = btn;
    show(items.indexOf(btn));
    lightbox.hidden = false;
    document.body.classList.add('no-scroll');
    window.requestAnimationFrame(function () {
      lightbox.classList.add('is-open');
      btnClose.focus();
    });
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    closeTimer = setTimeout(function () {
      lightbox.hidden = true;
      lbImg.removeAttribute('src');
    }, reduceMotion ? 0 : 300);
    if (lastFocus) lastFocus.focus();
  }

  gallery.addEventListener('click', function (e) {
    var btn = e.target.closest('.work-btn');
    if (btn) openLightbox(btn);
  });

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', function () { show(current - 1); });
  btnNext.addEventListener('click', function () { show(current + 1); });

  // Click on the dark backdrop closes the preview
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lb-figure')) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      show(current - 1);
    } else if (e.key === 'ArrowRight') {
      show(current + 1);
    } else if (e.key === 'Tab') {
      // Keep keyboard focus inside the lightbox
      var focusable = [btnClose, btnPrev, btnNext].filter(function (b) { return !b.disabled; });
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Swipe left / right on touch screens
  var touchX = null;
  lightbox.addEventListener('touchstart', function (e) {
    touchX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) show(dx > 0 ? current - 1 : current + 1);
  }, { passive: true });
  }
})();

// Scroll animations: parallax photos + gentle reveal-on-scroll.
// Turned off automatically for visitors who prefer reduced motion.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  document.documentElement.classList.add('anim');

  document.addEventListener('DOMContentLoaded', function () {
    /* ---------- 1. Parallax ---------- */
    var layers = [];
    // Full-width photo strips: wrap each image so it can drift inside a fixed frame
    document.querySelectorAll('img.band, img.band-tall, img[data-parallax]').forEach(function (img) {
      var wrap = document.createElement('div');
      wrap.className = 'parallax ' + img.className;
      wrap.style.height = img.style.height;
      img.parentNode.insertBefore(wrap, img);
      wrap.appendChild(img);
      img.className = 'parallax-img';
      img.style.height = '';
      layers.push({ el: img, box: wrap, speed: 0.18 });
    });
    // Hero background photos
    document.querySelectorAll('header#top > img').forEach(function (img) {
      img.parentNode.classList.add('parallax-hero');
      img.classList.add('parallax-img');
      layers.push({ el: img, box: img.parentNode, speed: 0.28, hero: true });
    });
    // Hero text floats up slightly slower than the page
    var heroText = document.querySelectorAll('header#top h1, header#top .hero-sub, header#top .label, header#top .btn');
    heroText.forEach(function (el) { el.classList.add('hero-in'); });

    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      layers.forEach(function (l) {
        var r = l.box.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var shift;
        if (l.hero) {
          shift = Math.max(0, -r.top) * l.speed;              // hero: drift down as you scroll away
        } else {
          var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1 … 1
          shift = progress * r.height * l.speed * -1;
        }
        l.el.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0) scale(1.12)';
      });
      var hero = document.querySelector('header#top');
      if (hero) {
        var y = Math.min(window.scrollY, hero.offsetHeight);
        heroText.forEach(function (el) {
          el.style.transform = 'translate3d(0,' + (y * 0.18).toFixed(1) + 'px,0)';
          el.style.opacity = Math.max(0, 1 - y / (hero.offsetHeight * 0.85)).toFixed(3);
        });
      }
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    /* ---------- 2. Reveal on scroll ---------- */
    var selectors = [
      'section h2', 'section h3', 'section h4.label', 'section > div > p', 'section .split > *',
      'section .cols3 > *', 'section .cols2 > *', 'section .pay-cards > *', 'section blockquote',
      'section .faq', 'section .legal > *', 'section ul', 'section form', 'footer .split > *', 'footer > div > p'
    ];
    var set = new Set();
    selectors.forEach(function (s) { document.querySelectorAll(s).forEach(function (el) { set.add(el); }); });
    var items = Array.from(set).filter(function (el) {
      if (el.closest('header#top') || el.closest('.mobile-menu')) return false;
      for (var p = el.parentElement; p; p = p.parentElement) { if (set.has(p)) return false; } // animate outermost only
      return true;
    });
    items.forEach(function (el) {
      el.classList.add('reveal');
      if (el.tagName === 'IMG' || el.querySelector(':scope > img')) el.classList.add('reveal-img');
      var sibs = Array.from(el.parentElement.children).filter(function (c) { return items.indexOf(c) > -1; });
      var i = sibs.indexOf(el);
      if (i > 0) el.style.transitionDelay = Math.min(i * 110, 440) + 'ms';
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
    // Near the very bottom of the page, show anything still waiting
    window.addEventListener('scroll', function () {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        items.forEach(function (el) { el.classList.add('in'); });
      }
    }, { passive: true });
  });
})();

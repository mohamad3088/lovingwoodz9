/* ================================================================
   script.js — shared utilities for all pages
   ================================================================ */

/* ── CUSTOM CURSOR ── */
(function () {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  })();
})();

/* ── NAVBAR SCROLL ── */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* active link highlighting */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (
      (href === 'index.html' && (page === 'index.html' || page === '')) ||
      (href !== 'index.html' && page === href)
    ) a.classList.add('active');
  });

  /* hamburger */
  const ham  = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-mobile-menu');
  if (ham && menu) {
    ham.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      ham.setAttribute('aria-expanded', open);
      const spans = ham.querySelectorAll('span');
      spans[0].style.transform = open ? 'rotate(45deg) translateY(6px)' : '';
      spans[1].style.opacity   = open ? '0' : '1';
      spans[2].style.transform = open ? 'rotate(-45deg) translateY(-6px)' : '';
    });
    menu.querySelectorAll('.mobile-link').forEach(l =>
      l.addEventListener('click', () => menu.classList.remove('open'))
    );
  }
})();

/* ── SCROLL REVEAL ── */
(function () {
  const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .clip-reveal, .line-grow';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });

  function init() { document.querySelectorAll(selectors).forEach(el => obs.observe(el)); }
  document.addEventListener('DOMContentLoaded', init);

  /* re-check in case dynamic content loads */
  let last = 0;
  setInterval(() => {
    const count = document.querySelectorAll(selectors).length;
    if (count !== last) { init(); last = count; }
  }, 400);
})();

/* ── COUNTER ANIMATION ── */
function startCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    if (el.dataset.counted) return;
    const end      = parseFloat(el.dataset.counter);
    const suffix   = el.dataset.suffix || '';
    const duration = 2000;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      el.dataset.counted = '1';
      const start = performance.now();
      (function tick(now) {
        const p    = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(ease * end) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(performance.now());
    }, { threshold: 0.5 });
    obs.observe(el);
  });
}
document.addEventListener('DOMContentLoaded', startCounters);

/* ── WHATSAPP FLOAT ── */
/* Already handled via CSS; nothing extra needed */

/* ── MARQUEE (pause on hover already in CSS) ── */

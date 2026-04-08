/* ===============================================================
   content-loader.js
   Applies saved admin overrides to every page.
   =============================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'lw_site_data';
  var SESSION_KEY = 'lw_admin_session';

  /* ── Helpers ── */
  function load() {
    try { var d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : {}; }
    catch (e) { return {}; }
  }

  function get(obj, path) {
    if (!obj) return undefined;
    return path.split('.').reduce(function (o, k) { return o != null ? o[k] : undefined; }, obj);
  }

  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function relPath() {
    return window.location.pathname.indexOf('/galerij/') !== -1 ? '../' : '';
  }

  function isLoggedIn() { return !!sessionStorage.getItem(SESSION_KEY); }

  /* ── Apply text / image overrides ── */
  function applyOverrides(data) {
    document.querySelectorAll('[data-lw]').forEach(function (el) {
      var val = get(data, el.dataset.lw);
      if (val !== undefined && val !== null && val !== '') el.textContent = val;
    });
    document.querySelectorAll('[data-lw-src]').forEach(function (el) {
      var val = get(data, el.dataset.lwSrc);
      if (val) el.src = val;
    });
    document.querySelectorAll('[data-lw-video]').forEach(function (el) {
      var val = get(data, el.dataset.lwVideo);
      if (val) {
        var src = el.querySelector('source');
        if (src) { src.src = val; el.load(); }
      }
    });
  }

  /* ── Rebuild portfolio grid (portfolio.html) ── */
  function rebuildPortfolioGrid(projects) {
    var grid = document.getElementById('portfolio-grid');
    if (!grid || !projects || !projects.length) return;

    grid.innerHTML = projects.map(function (p, i) {
      var mediaHtml = p.video
        ? '<video muted loop playsinline data-video><source src="' + esc(p.video) + '" type="video/mp4"/></video>'
        : '<img src="' + esc(p.img || '') + '" alt="' + esc(p.title) + '" style="width:100%;height:100%;object-fit:cover;display:block"/>';
      return '<div class="portfolio-card reveal" data-project="' + i + '" style="transition-delay:' + ((i % 2) * 0.15) + 's">'
        + '<div class="portfolio-video-wrap">'
        + mediaHtml
        + '<div class="portfolio-overlay"></div>'
        + '<div class="portfolio-play-btn" data-playbtn' + (!p.video ? ' style="display:none"' : '') + '>'
        + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ivory)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-playicon><polygon points="5 3 19 12 5 21 5 3"/></svg>'
        + '</div>'
        + '<div class="portfolio-cat-tag"><span>' + esc(p.cat) + '</span></div>'
        + '</div>'
        + '<span class="portfolio-meta">' + esc(p.loc) + (p.year ? ' &middot; ' + esc(p.year) : '') + '</span>'
        + '<h3 class="portfolio-title">' + esc(p.title) + '</h3>'
        + '<div class="portfolio-details-link"><span>Details bekijken</span>'
        + '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></div>'
        + '</div>';
    }).join('');

    /* expose new data globally so modal works */
    window.__lwProjects = projects;

    /* re-attach play/pause */
    grid.querySelectorAll('.portfolio-card').forEach(function (card) {
      var vid = card.querySelector('[data-video]');
      var btn = card.querySelector('[data-playbtn]');
      var icon = card.querySelector('[data-playicon]');
      var pauseSVG = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      var playSVG = '<polygon points="5 3 19 12 5 21 5 3"/>';
      if (btn && vid) btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (vid.paused) { vid.play(); icon.innerHTML = pauseSVG; }
        else { vid.pause(); icon.innerHTML = playSVG; }
      });
      card.addEventListener('click', function () {
        var idx = parseInt(card.dataset.project, 10);
        var p = window.__lwProjects[idx];
        if (p && typeof window.__lwOpenModal === 'function') window.__lwOpenModal(p);
      });
    });
  }

  /* ── Rebuild homepage featured projects ── */
  function rebuildHomeFeatured(projects) {
    var grid = document.getElementById('home-projects-grid');
    if (!grid || !projects || !projects.length) return;
    var featured = projects.slice(0, 3);
    var ratios = ['3/4', '4/5', '4/5'];
    var delays = ['0s', '0.15s', '0.3s'];
    grid.innerHTML = featured.map(function (p, i) {
      return '<a href="portfolio.html" class="project-card reveal" style="aspect-ratio:' + (ratios[i] || '4/5') + ';transition-delay:' + delays[i] + '">'
        + '<img src="' + esc(p.img || 'https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=1400') + '" alt="' + esc(p.title) + '" loading="lazy"/>'
        + '<div class="project-card-overlay"></div>'
        + '<div class="project-card-body">'
        + '<span class="project-cat">' + esc(p.cat) + ' &middot; ' + esc(p.loc) + '</span>'
        + '<h3 class="project-title">' + esc(p.title) + '</h3>'
        + '<div class="project-cta"><span>Bekijk</span>'
        + '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>'
        + '</div></a>';
    }).join('');
  }

  /* ── Admin bar (when logged in) ── */
  function injectAdminBar() {
    var rel = relPath();
    var style = document.createElement('style');
    style.textContent = '@keyframes lwPulse{0%,100%{opacity:1}50%{opacity:.3}} #lw-admin-bar *{box-sizing:border-box;font-family:"Jost",sans-serif}';
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.id = 'lw-admin-bar';
    bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:999999;background:rgba(12,9,7,.97);backdrop-filter:blur(20px);border-top:1px solid rgba(196,163,90,.35);padding:10px 32px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap';
    bar.innerHTML = '<div style="display:flex;align-items:center;gap:10px">'
      + '<div style="width:7px;height:7px;border-radius:50%;background:#C4A35A;animation:lwPulse 2s infinite"></div>'
      + '<span style="font-size:9px;letter-spacing:.35em;text-transform:uppercase;color:#C4A35A">Owner admin actief</span>'
      + '</div>'
      + '<div style="display:flex;align-items:center;gap:12px">'
      + '<a href="' + rel + 'admin.html" style="font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:#F5EFE6;background:rgba(196,163,90,.15);border:1px solid rgba(196,163,90,.4);padding:8px 20px;text-decoration:none;transition:background .3s;cursor:none" onmouseenter="this.style.background=\'rgba(196,163,90,.3)\'" onmouseleave="this.style.background=\'rgba(196,163,90,.15)\'">✏️ Dashboard</a>'
      + '<button onclick="sessionStorage.removeItem(\'' + SESSION_KEY + '\');location.reload()" style="font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:rgba(245,239,230,.4);background:none;border:1px solid rgba(245,239,230,.15);padding:8px 20px;cursor:none;transition:all .3s" onmouseenter="this.style.borderColor=\'rgba(245,239,230,.5)\';this.style.color=\'#F5EFE6\'" onmouseleave="this.style.borderColor=\'rgba(245,239,230,.15)\';this.style.color=\'rgba(245,239,230,.4)\'">Uitloggen</button>'
      + '</div>';
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '52px';
  }

  /* ── Tiny login icon (always visible, unless logged in) ── */
  function injectLoginIcon() {
    var rel = relPath();
    var btn = document.createElement('a');
    btn.href = rel + 'admin.html';
    btn.title = 'Owner login';
    btn.style.cssText = 'position:fixed;bottom:28px;left:24px;z-index:99998;width:28px;height:28px;opacity:.18;transition:opacity .3s;cursor:none;display:flex;align-items:center;justify-content:center';
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4A35A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
    btn.addEventListener('mouseenter', function () { btn.style.opacity = '.65'; });
    btn.addEventListener('mouseleave', function () { btn.style.opacity = '.18'; });
    document.body.appendChild(btn);
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    /* skip on admin page itself */
    if (window.location.pathname.indexOf('admin.html') !== -1) return;

    var data = load();

    if (data && Object.keys(data).length) {
      applyOverrides(data);
      if (data.portfolio && data.portfolio.length) {
        rebuildPortfolioGrid(data.portfolio);
        rebuildHomeFeatured(data.portfolio);
      }
    }

    if (isLoggedIn()) {
      injectAdminBar();
    } else {
      injectLoginIcon();
    }
  });
})();

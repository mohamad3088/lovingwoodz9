/* ================================================================
   admin.js — owner dashboard logic
   ================================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'lw_site_data';
  var SESSION_KEY = 'lw_admin_session';
  var CREDS = { user: 'lovingwoodz', pass: 'woodz234' };

  /* ── Default content ── */
  var DEFAULTS = {
    home: {
      heroLabel:          'Est. 2010 · Geleen, Nederland',
      heroTitle1:         'Timeless',
      heroTitle2:         'Woodcraft.',
      philosophyTitle:    'De kracht',
      philosophyEmphasis: 'van hout.',
      philosophyText:     'Ik geloof in hout, niet alleen omdat het mooi is maar omdat het leeft, het verbindt, het vertelt verhalen. Dat gebruiken we om interieurs te maken die echt iets voor je doen. Wij maken interieurs voor de mooiste momenten in je leven.',
      ctaTitle:           'Start a',
      ctaEmphasis:        'conversation.',
      processTitle:       'Van idee tot',
      processEmphasis:    'meesterwerk.',
      heroVideo:          'images/home1.mp4',
      philosophyVideo:    'images/tv.mp4',
      ctaVideo:           'images/home.mp4'
    },
    portfolio: [
      { id: '1', title: 'The Slat Wall Suite',  cat: 'Woonkamer', loc: 'Amsterdam, NL', year: '2024', video: 'images/zwartkeuken.mp4', img: 'https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=1400', desc: 'Een totaalconcept waarbij verticale houten lamellen de ruimte definiëren. In dit project vloeit de wand naadloos over in een op maat gemaakt tv-meubel van massief eiken.', gallery: ['https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1400','https://images.unsplash.com/photo-1507652313519-d4c9174996dd?q=80&w=1400'] },
      { id: '2', title: 'Fluted Oak Kitchen',   cat: 'Keuken',    loc: 'Rotterdam, NL', year: '2024', video: 'images/kast.mp4',       img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400', desc: 'Een harmonieus samenspel tussen verticale eiken lamellen en modern marmer. De tactiele ervaring van het hout staat centraal in dit project.', gallery: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400'] },
      { id: '3', title: 'Tambour Media Wall',   cat: 'Wandmeubel', loc: 'Rotterdam, NL', year: '2023', video: 'images/home1.mp4',    img: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1400', desc: 'Dit zwevende meubel in Amerikaans Notenhout dient als het visuele anker van de woonkamer. Tijdloze elegantie in een hedendaagse setting.', gallery: [] },
      { id: '4', title: 'Minimalist Vanity',    cat: 'Badkamer',  loc: 'Utrecht, NL',   year: '2023', video: 'images/tv.mp4',        img: 'https://images.unsplash.com/photo-1620626011761-9963d7521477?q=80&w=1400', desc: 'Een oase van rust gecreëerd door gerookt eiken. Het meubel vloeit naadloos over in de architectuur van de ruimte.', gallery: [] }
    ],
    about: {
      pullQuote:  'Interieurs voor de mooiste momenten in je leven.',
      pullAuthor: '— Thijs, Founder',
      storyP1:    'Het begon ooit in het schuurtje naast mijn ouderlijke huis. Tussen het stof en wat oud gereedschap maakte ik vroeger al mijn eerste projectjes. Geen grote plannen, maar altijd nieuwsgierig. Daar heb ik geleerd hoe iets eenvoudigs als hout karakter krijgt als je het met aandacht maakt.',
      storyP2:    'Ik ontdekte al vroeg mijn ambitie om dingen te bedenken en te ontwerpen. In mijn eerste opleiding Bouwkunde leerde ik vervolgens alles over de samenhang tussen ontwerp en maken. Daar kregen mijn ideeën verder vorm en mijn ontwerpen werden tastbaar.',
      storyP3:    'Interieurs hebben voor mij altijd iets speciaals gehad. Het is het gevoel dat je krijgt als je ergens binnenloopt. Het gevoel dat je iets unieks ervaart. Dat gevoel ontwerp ik.',
      mainImg:    'https://images.squarespace-cdn.com/content/v1/595d4778be6594bb746dd8ca/7cbb9564-aac9-4d40-b715-d78aaa859d2c/interiorbythijs-lovingwoodz-luxehouteninterieurs.jpg?format=750w'
    },
    services: {
      s1title: 'Maatwerk Keukens',   s1sub: 'Het hart van je huis',    s1desc: 'Keukens die rust uitstralen. Wij combineren warme houtsoorten met moderne functionaliteit. Elke keuken is een uniek ontwerp — van de eerste schets tot de laatste handgreep.',   s1img: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400',
      s2title: 'Unieke Meubels',      s2sub: 'Verhalen in hout',        s2desc: 'Van eettafels die generaties meegaan tot zwevende badkamermeubels. Elk stuk is een persoonlijk verhaal — gemaakt voor jou, om te duren.',                                               s2img: 'https://images.unsplash.com/photo-1620626011761-9963d7521477?q=80&w=1400',
      s3title: 'Totaal Interieur',    s3sub: 'Van vloer tot plafond',   s3desc: 'Wandpanelen, kastenwanden en vloeren die naadloos op elkaar aansluiten. Een volledig coherent interieur dat ademt als één geheel.',                                                     s3img: 'https://images.unsplash.com/photo-1615873968403-89e068628265?q=80&w=1400'
    }
  };

  /* ── Storage ── */
  function load() {
    try { var d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : deepCopy(DEFAULTS); }
    catch (e) { return deepCopy(DEFAULTS); }
  }
  function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
  function deepCopy(o) { return JSON.parse(JSON.stringify(o)); }

  /* ── Toast ── */
  function toast(msg) {
    var el = document.getElementById('admin-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(function () { el.classList.remove('show'); }, 2800);
  }

  /* ── Generate IDs ── */
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  /* ── State ── */
  var data = load();
  var editingProjectId = null; /* null = new project */

  /* ── DOM helpers ── */
  function $(id) { return document.getElementById(id); }
  function val(id) { var el = $(id); return el ? el.value.trim() : ''; }
  function setVal(id, v) { var el = $(id); if (el) el.value = v || ''; }

  function updateImgPreview(inputId, previewId) {
    var inp = $(inputId); var prev = $(previewId);
    if (!inp || !prev) return;
    inp.addEventListener('input', function () {
      var src = inp.value.trim();
      prev.innerHTML = src
        ? '<img src="' + src + '" alt="preview" onerror="this.style.display=\'none\'">'
        : '';
    });
  }

  /* ─────────────────────────────────────────
     LOGIN
  ───────────────────────────────────────── */
  function initLogin() {
    if (sessionStorage.getItem(SESSION_KEY)) {
      showDashboard();
      return;
    }
    var form = $('login-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var u = val('login-user'); var p = val('login-pass');
      var err = $('login-error');
      if (u === CREDS.user && p === CREDS.pass) {
        sessionStorage.setItem(SESSION_KEY, '1');
        showDashboard();
      } else {
        if (err) { err.textContent = 'Onjuiste inloggegevens. Probeer opnieuw.'; err.classList.add('show'); }
      }
    });
  }

  function showDashboard() {
    $('login-screen').style.display = 'none';
    $('dashboard').style.display = 'flex';
    initDashboard();
  }

  /* ─────────────────────────────────────────
     DASHBOARD INIT
  ───────────────────────────────────────── */
  function initDashboard() {
    /* Tab switching */
    document.querySelectorAll('.nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tab = btn.dataset.tab;
        document.querySelectorAll('.nav-btn').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var panel = $('tab-' + tab);
        if (panel) panel.classList.add('active');
      });
    });

    /* Logout */
    var logoutBtn = $('sidebar-logout');
    if (logoutBtn) logoutBtn.addEventListener('click', function () {
      if (confirm('Wil je uitloggen?')) {
        sessionStorage.removeItem(SESSION_KEY);
        location.reload();
      }
    });

    /* Preview link */
    var previewBtn = $('sidebar-preview');
    if (previewBtn) previewBtn.addEventListener('click', function () {
      window.open('index.html', '_blank');
    });

    /* Image previews */
    ['home-hero-video','home-phil-video','home-cta-video'].forEach(function (id) {
      var inp = $(id); if (!inp) return;
      inp.addEventListener('input', function () {
        var pv = $(id + '-preview');
        if (pv) pv.innerHTML = inp.value ? '<video src="' + inp.value + '" muted style="width:100%;height:100%;object-fit:cover"></video>' : '';
      });
    });
    ['about-main-img','s1-img','s2-img','s3-img'].forEach(function (id) {
      updateImgPreview(id, id + '-preview');
    });

    initHomeTab();
    initPortfolioTab();
    initAboutTab();
    initServicesTab();
    initSettingsTab();

    /* activate first tab */
    var first = document.querySelector('.nav-btn[data-tab="home"]');
    if (first) first.click();
  }

  /* ─────────────────────────────────────────
     HOME TAB
  ───────────────────────────────────────── */
  function initHomeTab() {
    var h = data.home || {};
    setVal('home-heroLabel',   h.heroLabel);
    setVal('home-heroTitle1',  h.heroTitle1);
    setVal('home-heroTitle2',  h.heroTitle2);
    setVal('home-philTitle',   h.philosophyTitle);
    setVal('home-philEmphasis',h.philosophyEmphasis);
    setVal('home-philText',    h.philosophyText);
    setVal('home-ctaTitle',    h.ctaTitle);
    setVal('home-ctaEmphasis', h.ctaEmphasis);
    setVal('home-procTitle',   h.processTitle);
    setVal('home-procEmphasis',h.processEmphasis);
    setVal('home-hero-video',  h.heroVideo);
    setVal('home-phil-video',  h.philosophyVideo);
    setVal('home-cta-video',   h.ctaVideo);

    var saveBtn = $('home-save');
    if (saveBtn) saveBtn.addEventListener('click', function () {
      data.home = {
        heroLabel:          val('home-heroLabel'),
        heroTitle1:         val('home-heroTitle1'),
        heroTitle2:         val('home-heroTitle2'),
        philosophyTitle:    val('home-philTitle'),
        philosophyEmphasis: val('home-philEmphasis'),
        philosophyText:     val('home-philText'),
        ctaTitle:           val('home-ctaTitle'),
        ctaEmphasis:        val('home-ctaEmphasis'),
        processTitle:       val('home-procTitle'),
        processEmphasis:    val('home-procEmphasis'),
        heroVideo:          val('home-hero-video'),
        philosophyVideo:    val('home-phil-video'),
        ctaVideo:           val('home-cta-video')
      };
      save(data);
      toast('✓ Startpagina opgeslagen');
    });
  }

  /* ─────────────────────────────────────────
     PORTFOLIO TAB
  ───────────────────────────────────────── */
  function initPortfolioTab() {
    renderProjectList();

    var addBtn = $('add-project-btn');
    if (addBtn) addBtn.addEventListener('click', function () {
      editingProjectId = null;
      clearProjectForm();
      openProjectForm('Nieuw project toevoegen');
    });

    var cancelBtn = $('pf-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', closeProjectForm);

    var pfSave = $('pf-save');
    if (pfSave) pfSave.addEventListener('click', saveProject);

    /* Gallery helper: live preview of gallery images */
    var galleryInput = $('pf-gallery');
    if (galleryInput) galleryInput.addEventListener('input', updateGalleryPreview);
    var imgInput = $('pf-img');
    if (imgInput) { updateImgPreview('pf-img', 'pf-img-preview'); }
  }

  function renderProjectList() {
    var list = $('portfolio-list');
    if (!list) return;
    var projects = data.portfolio || [];
    if (!projects.length) {
      list.innerHTML = '<div class="empty-state">Nog geen projecten. Voeg je eerste project toe.</div>';
      return;
    }
    list.innerHTML = projects.map(function (p, i) {
      var thumb = p.img
        ? '<img src="' + p.img + '" alt="" onerror="this.style.display=\'none\'">'
        : (p.video ? '<video src="' + p.video + '" muted style="width:100%;height:100%;object-fit:cover"></video>' : '');
      return '<div class="pj-card" data-id="' + p.id + '">'
        + '<span class="drag-handle"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg></span>'
        + '<div class="pj-thumb">' + thumb + '</div>'
        + '<div class="pj-info"><div class="pj-title">' + p.title + '</div><div class="pj-meta">' + p.cat + ' &middot; ' + p.loc + ' &middot; ' + p.year + '</div></div>'
        + '<div class="pj-actions">'
        + '<button class="pj-edit-btn" data-edit="' + i + '">Edit</button>'
        + '<button class="pj-del-btn" data-del="' + i + '">Verwijder</button>'
        + '</div></div>';
    }).join('');

    list.querySelectorAll('.pj-edit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.dataset.edit, 10);
        editProject(idx);
      });
    });
    list.querySelectorAll('.pj-del-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.dataset.del, 10);
        deleteProject(idx);
      });
    });
  }

  function openProjectForm(title) {
    var panel = $('project-form-panel');
    var t = $('pf-form-title');
    if (t) t.textContent = title;
    if (panel) panel.classList.add('open');
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function closeProjectForm() {
    var panel = $('project-form-panel');
    if (panel) panel.classList.remove('open');
    editingProjectId = null;
  }
  function clearProjectForm() {
    ['pf-title','pf-cat','pf-loc','pf-year','pf-video','pf-img','pf-desc','pf-gallery'].forEach(function (id) { setVal(id, ''); });
    var prev = $('pf-img-preview'); if (prev) prev.innerHTML = '';
    var gprev = $('pf-gallery-preview'); if (gprev) gprev.innerHTML = '';
  }
  function editProject(idx) {
    var p = data.portfolio[idx];
    if (!p) return;
    editingProjectId = p.id;
    setVal('pf-title', p.title);
    setVal('pf-cat',   p.cat);
    setVal('pf-loc',   p.loc);
    setVal('pf-year',  p.year);
    setVal('pf-video', p.video);
    setVal('pf-img',   p.img);
    setVal('pf-desc',  p.desc);
    setVal('pf-gallery', (p.gallery || []).join('\n'));
    /* show previewss */
    var prev = $('pf-img-preview');
    if (prev) prev.innerHTML = p.img ? '<img src="' + p.img + '" alt="">' : '';
    updateGalleryPreview();
    openProjectForm('Project bewerken');
  }
  function saveProject() {
    var title = val('pf-title');
    if (!title) { alert('Vul een projectnaam in.'); return; }
    var project = {
      id:      editingProjectId || uid(),
      title:   title,
      cat:     val('pf-cat'),
      loc:     val('pf-loc'),
      year:    val('pf-year'),
      video:   val('pf-video'),
      img:     val('pf-img'),
      desc:    val('pf-desc'),
      gallery: val('pf-gallery').split('\n').map(function (s) { return s.trim(); }).filter(Boolean)
    };
    if (editingProjectId) {
      var idx = data.portfolio.findIndex(function (p) { return p.id === editingProjectId; });
      if (idx !== -1) data.portfolio[idx] = project;
    } else {
      data.portfolio.push(project);
    }
    save(data);
    closeProjectForm();
    renderProjectList();
    toast('✓ Project opgeslagen');
  }
  function deleteProject(idx) {
    var p = data.portfolio[idx];
    if (!p) return;
    if (!confirm('Project "' + p.title + '" verwijderen?')) return;
    data.portfolio.splice(idx, 1);
    save(data);
    renderProjectList();
    toast('✓ Project verwijderd');
  }
  function updateGalleryPreview() {
    var inp = $('pf-gallery'); var prev = $('pf-gallery-preview');
    if (!inp || !prev) return;
    var urls = inp.value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    prev.innerHTML = urls.map(function (u) {
      return '<div style="width:80px;height:60px;overflow:hidden;background:var(--dark);flex-shrink:0">'
        + '<img src="' + u + '" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display=\'none\'">'
        + '</div>';
    }).join('');
  }

  /* ─────────────────────────────────────────
     ABOUT TAB
  ───────────────────────────────────────── */
  function initAboutTab() {
    var ab = data.about || {};
    setVal('ab-quote',   ab.pullQuote);
    setVal('ab-author',  ab.pullAuthor);
    setVal('ab-story1',  ab.storyP1);
    setVal('ab-story2',  ab.storyP2);
    setVal('ab-story3',  ab.storyP3);
    setVal('about-main-img', ab.mainImg);
    var pv = $('about-main-img-preview');
    if (pv && ab.mainImg) pv.innerHTML = '<img src="' + ab.mainImg + '" alt="">';
    updateImgPreview('about-main-img', 'about-main-img-preview');

    var saveBtn = $('about-save');
    if (saveBtn) saveBtn.addEventListener('click', function () {
      data.about = {
        pullQuote:  val('ab-quote'),
        pullAuthor: val('ab-author'),
        storyP1:    val('ab-story1'),
        storyP2:    val('ab-story2'),
        storyP3:    val('ab-story3'),
        mainImg:    val('about-main-img')
      };
      save(data);
      toast('✓ Over ons opgeslagen');
    });
  }

  /* ─────────────────────────────────────────
     SERVICES TAB
  ───────────────────────────────────────── */
  function initServicesTab() {
    var sv = data.services || {};
    setVal('s1-title', sv.s1title); setVal('s1-sub', sv.s1sub); setVal('s1-desc', sv.s1desc); setVal('s1-img', sv.s1img);
    setVal('s2-title', sv.s2title); setVal('s2-sub', sv.s2sub); setVal('s2-desc', sv.s2desc); setVal('s2-img', sv.s2img);
    setVal('s3-title', sv.s3title); setVal('s3-sub', sv.s3sub); setVal('s3-desc', sv.s3desc); setVal('s3-img', sv.s3img);
    ['s1-img','s2-img','s3-img'].forEach(function (id) {
      var pv = $(id + '-preview');
      var val2 = document.getElementById(id);
      if (pv && val2 && val2.value) pv.innerHTML = '<img src="' + val2.value + '" alt="">';
    });

    var saveBtn = $('services-save');
    if (saveBtn) saveBtn.addEventListener('click', function () {
      data.services = {
        s1title: val('s1-title'), s1sub: val('s1-sub'), s1desc: val('s1-desc'), s1img: val('s1-img'),
        s2title: val('s2-title'), s2sub: val('s2-sub'), s2desc: val('s2-desc'), s2img: val('s2-img'),
        s3title: val('s3-title'), s3sub: val('s3-sub'), s3desc: val('s3-desc'), s3img: val('s3-img')
      };
      save(data);
      toast('✓ Diensten opgeslagen');
    });
  }

  /* ─────────────────────────────────────────
     SETTINGS TAB (reset)
  ───────────────────────────────────────── */
  function initSettingsTab() {
    var resetBtn = $('reset-all');
    if (resetBtn) resetBtn.addEventListener('click', function () {
      if (confirm('⚠️ Weet je zeker dat je ALLE aanpassingen wilt resetten naar de standaardwaarden? Dit kan niet ongedaan worden gemaakt.')) {
        localStorage.removeItem(STORAGE_KEY);
        toast('✓ Reset voltooid. Pagina herladen…');
        setTimeout(function () { location.reload(); }, 1500);
      }
    });
  }

  /* ── Bootstrap ── */
  document.addEventListener('DOMContentLoaded', function () {
    initLogin();
  });
})();

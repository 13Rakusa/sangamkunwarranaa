/* ============================================================
   Site behaviour — Sangam Kunwar Rana portfolio
   ------------------------------------------------------------
   Renders the editable content from content.js into the page
   and wires up navigation, filters, clocks, dates, animations
   and link tracking. Content edits belong in content.js.
   ============================================================ */
(function () {
  'use strict';

  var content = window.SITE_CONTENT || {};

  function qs(selector, scope) { return (scope || document).querySelector(selector); }
  function qsa(selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); }
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function fill(id, value) {
    var node = document.getElementById(id);
    if (node && value != null) node.textContent = value;
  }

  /* ----------------------------------------------------------
     Navigation (mobile menu)
     ---------------------------------------------------------- */
  function initNav() {
    var toggle = qs('.menu-toggle');
    var nav = qs('.site-nav');

    function setOpen(open) {
      if (!toggle || !nav) return;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('nav-open', open);
    }

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        setOpen(!document.body.classList.contains('nav-open'));
      });

      qsa('.nav-link', nav).forEach(function (link) {
        link.addEventListener('click', function () { setOpen(false); });
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') setOpen(false);
      });

      document.addEventListener('click', function (event) {
        if (!document.body.classList.contains('nav-open')) return;
        if (nav.contains(event.target) || toggle.contains(event.target)) return;
        setOpen(false);
      });
    }

    /* Close the menu if the viewport grows past the breakpoint. */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 940) setOpen(false);
    });
  }

  /* ----------------------------------------------------------
     Dates — Bikram Sambat + Gregorian ribbon
     ---------------------------------------------------------- */
  function initDates() {
    var now = new Date();
    var bsNode = document.getElementById('bs-date');
    var adNode = document.getElementById('ad-date');

    if (adNode) {
      try {
        adNode.textContent = now.toLocaleDateString('en-GB', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
      } catch (e) {
        adNode.textContent = now.toDateString();
      }
    }

    if (bsNode && window.NepaliDateConverter) {
      try {
        var bs = window.NepaliDateConverter.ad2bs(now);
        if (bs) bsNode.textContent = bs.str + ', ' + bs.weekdayNe;
      } catch (e) {
        bsNode.textContent = 'विक्रम संवत्';
      }
    }
  }

  /* ----------------------------------------------------------
     Hero
     ---------------------------------------------------------- */
  function initHero() {
    fill('hero-intro', content.heroIntro);
    fill('hero-location', content.heroLocation);

    if (content.birthDate) {
      var born = new Date(content.birthDate + 'T00:00:00');
      if (!isNaN(born.getTime())) {
        var now = new Date();
        var age = now.getFullYear() - born.getFullYear();
        var monthDiff = now.getMonth() - born.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < born.getDate())) age--;
        if (age > 0 && age < 120) fill('hero-age', 'Age ' + age);
      }
    }
  }

  /* ----------------------------------------------------------
     Focus strip
     ---------------------------------------------------------- */
  function renderFocus() {
    var grid = document.getElementById('focus-grid');
    if (!grid || !content.focus) return;

    content.focus.forEach(function (item, index) {
      var cell = el('div', 'focus-item reveal');
      cell.appendChild(el('span', 'focus-index', String(index + 1).padStart(2, '0')));
      cell.appendChild(el('h3', null, item.title));
      cell.appendChild(el('p', null, item.text));
      grid.appendChild(cell);
    });
  }

  /* ----------------------------------------------------------
     About grid
     ---------------------------------------------------------- */
  function renderAbout() {
    fill('about-statement', content.aboutStatement);

    var grid = document.getElementById('about-grid');
    if (!grid || !content.aboutCards) return;

    content.aboutCards.forEach(function (card) {
      var node = el('article', 'about-card reveal');
      node.appendChild(el('p', 'kicker', card.kicker));
      node.appendChild(el('h3', null, card.title));
      node.appendChild(el('p', 'about-card-text', card.text));
      grid.appendChild(node);
    });
  }

  /* ----------------------------------------------------------
     Career roadmap
     ---------------------------------------------------------- */
  function renderRoadmap() {
    var list = document.getElementById('roadmap-list');
    if (!list || !content.roadmap) return;

    content.roadmap.forEach(function (stage) {
      var item = el('article', 'roadmap-item reveal');

      var head = el('div', 'roadmap-stage');
      head.appendChild(el('span', 'stage-tag', stage.stage));
      head.appendChild(el('span', 'stage-period', stage.period));
      item.appendChild(head);

      item.appendChild(el('h3', null, stage.title));

      var ul = el('ul', 'roadmap-list-items');
      (stage.items || []).forEach(function (entry) {
        ul.appendChild(el('li', null, entry));
      });
      item.appendChild(ul);

      list.appendChild(item);
    });
  }

  /* ----------------------------------------------------------
     Education
     ---------------------------------------------------------- */
  function renderEducation() {
    var list = document.getElementById('education-list');
    if (!list || !content.education) return;

    content.education.forEach(function (entry) {
      var item = el('article', 'edu-item reveal');
      item.appendChild(el('div', 'edu-period', entry.period));

      var body = el('div', 'edu-body');
      body.appendChild(el('h3', null, entry.title));
      body.appendChild(el('p', 'edu-org', entry.org));
      if (entry.note) body.appendChild(el('p', 'edu-note', entry.note));
      item.appendChild(body);

      list.appendChild(item);
    });
  }

  /* ----------------------------------------------------------
     Skills / capability map
     ---------------------------------------------------------- */
  function renderSkills() {
    var board = document.getElementById('skills-board');
    if (!board || !content.skills) return;

    content.skills.forEach(function (column, index) {
      var node = el('div', 'skill-column reveal');

      var head = el('header', 'skill-column-head');
      head.appendChild(el('span', 'skill-count', String(index + 1).padStart(2, '0')));
      head.appendChild(el('h3', null, column.label));
      if (column.caption) head.appendChild(el('p', 'skill-caption', column.caption));
      node.appendChild(head);

      var ul = el('ul', 'skill-list');
      (column.items || []).forEach(function (skill) {
        var li = el('li', null);
        li.appendChild(el('span', 'skill-dot', null));
        li.appendChild(el('span', null, skill));
        ul.appendChild(li);
      });
      node.appendChild(ul);

      board.appendChild(node);
    });
  }

  /* ----------------------------------------------------------
     Projects + filters
     ---------------------------------------------------------- */
  function renderProjects() {
    var grid = document.getElementById('project-grid');
    var filterBar = document.getElementById('project-filters');
    if (!grid || !content.projects) return;

    var filters = content.projectFilters && content.projectFilters.length
      ? content.projectFilters
      : ['All'];
    var activeFilter = filters[0];

    function projectCard(project, index) {
      var card = el('article', 'project-card reveal');
      card.setAttribute('data-category', project.category);

      var head = el('div', 'project-head');
      head.appendChild(el('span', 'project-index', String(index + 1).padStart(2, '0')));
      head.appendChild(el('span', 'project-tag', project.category));
      card.appendChild(head);

      card.appendChild(el('h3', null, project.title));
      card.appendChild(el('p', 'project-summary', project.summary));
      card.appendChild(el('span', 'project-meta', project.meta || ''));
      return card;
    }

    function applyFilter(filter) {
      activeFilter = filter;
      qsa('.filter-btn', filterBar).forEach(function (btn) {
        var isActive = btn.getAttribute('data-filter') === filter;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      grid.innerHTML = '';
      content.projects.forEach(function (project, index) {
        if (filter === 'All' || project.category === filter) {
          grid.appendChild(projectCard(project, index));
        }
      });
      observeReveals();
    }

    if (filterBar) {
      filters.forEach(function (filter, index) {
        var li = el('li');
        var btn = el('button', index === 0 ? 'filter-btn is-active' : 'filter-btn', filter);
        btn.type = 'button';
        btn.setAttribute('data-filter', filter);
        btn.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
        btn.addEventListener('click', function () { applyFilter(filter); });
        li.appendChild(btn);
        filterBar.appendChild(li);
      });
    }

    applyFilter(activeFilter);
  }

  /* ----------------------------------------------------------
     Contact
     ---------------------------------------------------------- */
  function renderContact() {
    var wrap = document.getElementById('contact-links');
    if (!wrap || !content.contact) return;

    content.contact.forEach(function (entry) {
      var label = el('span', 'contact-label', entry.label);
      var value = el('span', 'contact-value', entry.value);

      if (entry.href) {
        var link = el('a', 'contact-link reveal');
        link.href = entry.href;
        var isExternal = /^(https?:)?\/\//.test(entry.href);
        if (isExternal) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        var arrow = el('span', 'arrow', isExternal ? '↗' : '→');
        arrow.setAttribute('aria-hidden', 'true');
        value.appendChild(arrow);
        link.appendChild(label);
        link.appendChild(value);
        wrap.appendChild(link);
      } else {
        var row = el('div', 'contact-link contact-link-static reveal');
        row.appendChild(label);
        row.appendChild(value);
        wrap.appendChild(row);
      }
    });
  }

  /* ----------------------------------------------------------
     World clocks
     ---------------------------------------------------------- */
  function initClocks() {
    var cards = qsa('.clock-card');
    if (!cards.length) return;

    function pad(n) { return String(n).padStart(2, '0'); }

    function update() {
      cards.forEach(function (card) {
        var zone = card.getAttribute('data-time-zone');
        if (!zone) return;
        var timeNode = qs('.clock-time', card);
        var dateNode = qs('.clock-date', card);
        var now = new Date();

        try {
          var parts = new Intl.DateTimeFormat('en-GB', {
            timeZone: zone,
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false, year: 'numeric', month: '2-digit', day: '2-digit'
          }).formatToParts(now);
          var get = function (type) {
            for (var i = 0; i < parts.length; i++) if (parts[i].type === type) return parts[i].value;
            return '';
          };
          if (timeNode) {
            var hh = get('hour') === '24' ? '00' : get('hour');
            timeNode.textContent = hh + ':' + get('minute') + ':' + get('second');
            timeNode.setAttribute('datetime', get('year') + '-' + get('month') + '-' + get('day') + 'T' + hh + ':' + get('minute') + ':' + get('second'));
          }
          if (dateNode) {
            dateNode.textContent = new Intl.DateTimeFormat('en-GB', {
              timeZone: zone, weekday: 'short', day: 'numeric', month: 'short'
            }).format(now);
          }
        } catch (e) {
          if (timeNode) timeNode.textContent = '—';
        }
      });
    }

    update();
    setInterval(update, 1000);
  }

  /* ----------------------------------------------------------
     Footer year, reveal animations, link tracking
     ---------------------------------------------------------- */
  function initYear() {
    qsa('[data-current-year]').forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  var revealObserver = null;

  function observeReveals() {
    var nodes = qsa('.reveal:not(.is-visible)');
    if (!nodes.length) return;

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }
    nodes.forEach(function (node) { revealObserver.observe(node); });
  }

  function initTracking() {
    document.addEventListener('click', function (event) {
      var target = event.target;
      while (target && target !== document.body && !(target instanceof HTMLAnchorElement)) {
        target = target.parentElement;
      }
      if (!(target instanceof HTMLAnchorElement)) return;
      var label = target.getAttribute('data-track');
      if (!label) return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'portfolio_click', label: label, timestamp: new Date().toISOString() });
    });
  }

  /* ----------------------------------------------------------
     Boot
     ---------------------------------------------------------- */
  function init() {
    initNav();
    initDates();
    initHero();
    renderFocus();
    renderAbout();
    renderRoadmap();
    renderEducation();
    renderSkills();
    renderProjects();
    renderContact();
    initClocks();
    initYear();
    initTracking();
    observeReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

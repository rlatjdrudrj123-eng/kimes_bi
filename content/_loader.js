/* ===========================================================================
 * Content loader (i18n)
 * ---------------------------------------------------------------------------
 * Each section has two JSON files, one per locale:
 *   content/<section-id>.en.json
 *   content/<section-id>.ko.json
 *
 * They are fetched in parallel and merged into:
 *   window.CONTENT[<section-id>] = { en: {...}, ko: {...} }
 *
 * Components read the current locale via window.SITE_LANG and re-render when
 * window.setSiteLang() fires the 'site-lang-change' event. The selection is
 * persisted in localStorage so refreshes preserve language.
 *
 * Adding a new section:
 *   1. Create content/<id>.en.json AND content/<id>.ko.json.
 *   2. Add <id> to FILES below.
 *   3. Component: const c = useSectionContent(<id>) — returns the current
 *      locale's object (re-renders on toggle).
 *   4. Add a matching collection entry in admin/config.yml with i18n: true.
 * ========================================================================= */

(function () {
  const FILES = [
    'intro',
    'family',
    'color',
    'typography',
    'logo',
    'spacing',
  ];

  const LOCALES = ['en', 'ko'];
  const LANG_STORAGE_KEY = 'kimes_ds_lang_v1';

  // Initial language: respect saved choice → otherwise browser preference
  // (anything Korean → 'ko') → otherwise English.
  function detectInitial() {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved && LOCALES.includes(saved)) return saved;
    } catch (e) {}
    const nav = (typeof navigator !== 'undefined' && navigator.language) || '';
    if (/^ko/i.test(nav)) return 'ko';
    return 'en';
  }

  window.SITE_LOCALES = LOCALES;
  window.SITE_LANG = detectInitial();
  window.setSiteLang = function (lang) {
    if (!LOCALES.includes(lang) || lang === window.SITE_LANG) return;
    window.SITE_LANG = lang;
    try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) {}
    window.dispatchEvent(new CustomEvent('site-lang-change', { detail: { lang } }));
  };

  window.CONTENT = {};
  window.CONTENT_READY = Promise.all(
    FILES.flatMap(name => LOCALES.map(loc =>
      fetch(`content/${name}.${loc}.json`, { cache: 'no-store' })
        .then(r => {
          if (!r.ok) throw new Error(`content/${name}.${loc}.json: HTTP ${r.status}`);
          return r.json();
        })
        .then(json => {
          if (!window.CONTENT[name]) window.CONTENT[name] = {};
          window.CONTENT[name][loc] = json;
        })
        .catch(err => {
          // Don't break the whole site if one locale of one section fails —
          // components fall through to whatever data they do have, with the
          // other locale as a fallback.
          console.warn('[content-loader]', err.message || err);
        })
    ))
  ).then(() => window.CONTENT);

  // Convenience helper: returns the current-locale object for a section,
  // falling back to the other locale if the current one is missing.
  window.getSectionContent = function (id) {
    const sec = window.CONTENT && window.CONTENT[id];
    if (!sec) return {};
    return sec[window.SITE_LANG] || sec.en || sec.ko || {};
  };
})();

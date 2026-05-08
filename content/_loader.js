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
    'bi-audit',
    'a11y',
    'asset-library',
    'color-proportion',
    'gradients',
    'typography-in-use',
    'logo-rules',
    'logo-lockup',
    'iconography',
    'motion',
    'social-templates',
  ];

  // Non-i18n shared files (single locale, single source). admin/config.yml의
  // "Downloads & Assets" 컬렉션이 편집하는 자산 다운로드 URL · status 토글
  // 데이터는 한·영 동일하게 적용되므로 로케일 분기 없음.
  const SHARED_FILES = [
    'downloads',
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

  /* -------------------------------------------------------------------------
   * Brand selector — main page is KIMES; co-events (mc / bd / in) are
   * brand-filtered views of the same sections. SITE_BRAND drives which
   * brand's content is shown in brand-specific sections.
   * ----------------------------------------------------------------------- */
  const BRANDS = ['kimes', 'mc', 'bd', 'in'];
  const BRAND_STORAGE_KEY = 'kimes_ds_brand_v1';
  function detectInitialBrand() {
    try {
      const m = (location.hash || '').match(/brand=([a-z]+)/);
      if (m && BRANDS.includes(m[1])) return m[1];
      const saved = sessionStorage.getItem(BRAND_STORAGE_KEY);
      if (saved && BRANDS.includes(saved)) return saved;
    } catch (e) {}
    return 'kimes';
  }
  window.SITE_BRANDS = BRANDS;
  window.SITE_BRAND  = detectInitialBrand();
  window.setSiteBrand = function (brand) {
    if (!BRANDS.includes(brand) || brand === window.SITE_BRAND) return;
    window.SITE_BRAND = brand;
    try { sessionStorage.setItem(BRAND_STORAGE_KEY, brand); } catch (e) {}
    window.dispatchEvent(new CustomEvent('site-brand-change', { detail: { brand } }));
  };

  window.CONTENT = {};
  window.CONTENT_READY = Promise.all([
    // i18n 섹션: 로케일별 두 파일.
    ...FILES.flatMap(name => LOCALES.map(loc =>
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
    )),
    // 공유 (non-i18n) 파일: 단일 파일.
    // 로드 후 부수 효과로 window.KIMES_EVENT.assets.status를 downloads.json의
    // status로 동기화 — 어드민에서 status 토글 시 사이트 전체 다운로드 버튼이
    // 일괄 활성화되도록.
    ...SHARED_FILES.map(name =>
      fetch(`content/${name}.json`, { cache: 'no-store' })
        .then(r => {
          if (!r.ok) throw new Error(`content/${name}.json: HTTP ${r.status}`);
          return r.json();
        })
        .then(json => {
          window.CONTENT[name] = json;
          if (name === 'downloads' && json.status &&
              window.KIMES_EVENT && window.KIMES_EVENT.assets) {
            window.KIMES_EVENT.assets.status = json.status;
          }
        })
        .catch(err => {
          console.warn('[content-loader]', err.message || err);
        })
    ),
  ]).then(() => window.CONTENT);

  // Convenience helper: returns the current-locale object for a section,
  // falling back to the other locale if the current one is missing.
  window.getSectionContent = function (id) {
    const sec = window.CONTENT && window.CONTENT[id];
    if (!sec) return {};
    return sec[window.SITE_LANG] || sec.en || sec.ko || {};
  };
})();

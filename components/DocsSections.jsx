// Sections for the KIMES Design System docs site

const { useState, useEffect, useRef } = React;
// Component refs from Wordmarks.jsx — read off window because each Babel
// script gets its own scope and top-level identifiers from another file
// aren't visible here without an explicit handoff.
const KimesWordmark      = window.KimesWordmark;
const MedicomtekWordmark = window.MedicomtekWordmark;
const BeautyDermaWordmark = window.BeautyDermaWordmark;
const InspireWordmark    = window.InspireWordmark;
const InlineLogo         = window.InlineLogo;

// Maps a content/*.json `wordmark` string to the corresponding wordmark
// React element. The mapping lives in JSX (not JSON) because each variant
// requires React props that can't be expressed cleanly in JSON.
function wordmarkFromRef(ref, height) {
  switch (ref) {
    case 'kimes':                return <KimesWordmark height={height} />;
    case 'medicomtek':           return <MedicomtekWordmark height={height} />;
    case 'beautyderma-stack':    return <BeautyDermaWordmark height={height} variant="stack" />;
    case 'inspire-tagline-lime': return <InspireWordmark height={height} variant="tagline" tone="lime" />;
    default:                     return <KimesWordmark height={height} />;
  }
}

/* ---------- i18n hooks ---------- */
// Subscribes to the global SITE_LANG. Re-renders any component using it
// whenever window.setSiteLang() fires the 'site-lang-change' event.
function useSiteLang() {
  const [lang, setLang] = useState(window.SITE_LANG || 'en');
  useEffect(() => {
    function onChange(e) { setLang(e.detail.lang); }
    window.addEventListener('site-lang-change', onChange);
    return () => window.removeEventListener('site-lang-change', onChange);
  }, []);
  return lang;
}

// Subscribes to the global SITE_BRAND. 'kimes' is the main view; 'mc', 'bd',
// 'in' are brand-filtered views of the same sections.
function useSiteBrand() {
  const [brand, setBrand] = useState(window.SITE_BRAND || 'kimes');
  useEffect(() => {
    function onChange(e) { setBrand(e.detail.brand); }
    window.addEventListener('site-brand-change', onChange);
    return () => window.removeEventListener('site-brand-change', onChange);
  }, []);
  return brand;
}

// Brand context — every brand-keyed section (BrandFamily, ColorTokens,
// ColorProportion, Gradients, LogoCatalog, LogoOnBackgrounds, AssetLibrary)
// filters its data by the current Context value. The default is 'kimes',
// so the main page shows only KIMES content. Each <CoEventPage> renders
// inside a Provider that overrides the brand to mc / bd / in, so the same
// section components render that brand's content inside the co-event
// summary blocks at the bottom of the page.
const BrandContext = React.createContext('kimes');
function useBrandFilter() { return React.useContext(BrandContext); }

// NAV id → family/color/logo data id, used by CoEventPage to wire each
// summary section (#medicomtek / #beautyderma / #inspire) to its data.
const NAV_BRAND_MAP = {
  medicomtek:  'mc',
  beautyderma: 'bd',
  inspire:     'in',
};

// Returns the current-locale data for a section. Falls back to the other
// locale if the current one is missing — preferable to rendering blanks.
function useSectionContent(id) {
  const lang = useSiteLang();
  const sec = (window.CONTENT && window.CONTENT[id]) || {};
  return sec[lang] || sec.en || sec.ko || {};
}

// Two-button language toggle, shown in the sidebar below the brand mark.
function LangToggle() {
  const lang = useSiteLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => window.setSiteLang('en')}
        aria-pressed={lang === 'en'}
      >EN</button>
      <button
        className={`lang-btn ${lang === 'ko' ? 'active' : ''}`}
        onClick={() => window.setSiteLang('ko')}
        aria-pressed={lang === 'ko'}
      >한국어</button>
    </div>
  );
}

/* ---------- Sidebar ---------- */
const NAV = [
  {
    title: 'Foundations',
    page: 'Brand Foundations.html',
    items: [
      { id: 'intro', label: 'Introduction' },
      { id: 'family', label: 'Brand family' },
      { id: 'color', label: 'Color tokens' },
      { id: 'color-proportion', label: 'Color proportion' },
      { id: 'gradients', label: 'Gradients' },
      { id: 'typography', label: 'Typography' },
      { id: 'typography-in-use', label: 'Typography in use' },
      { id: 'logo', label: 'Logo' },
      { id: 'logo-rules', label: 'Logo rules' },
      { id: 'logo-lockup', label: 'Logo lockup' },
      { id: 'iconography', label: 'Iconography' },
      { id: 'spacing', label: 'Spacing & grid' },
      { id: 'asset-library', label: 'Asset library' },
      { id: 'motion', label: 'Motion' },
      { id: 'a11y', label: 'Accessibility' },
      { id: 'social-templates', label: 'Social templates' },
      { id: 'bi-audit', label: 'BI audit' },
    ],
  },
  {
    title: 'Co-events',
    // Same page as Foundations — items are in-page anchors, not inert.
    page: 'Brand Foundations.html',
    items: [
      { id: 'medicomtek',  label: 'MedicomteK' },
      { id: 'beautyderma', label: 'Beauty&Derma' },
      { id: 'inspire',     label: 'INSPIRE Digital Health' },
    ],
  },
  {
    title: 'Applications',
    page: 'Brand Foundations.html',
    items: [
      { id: 'social-templates', label: 'Social media templates' },
      { id: 'print',            label: 'Print collateral' },
      { id: 'signage',          label: 'Event signage' },
    ],
  },
];

// The page each NAV group lives on, computed from the current location so
// in-page anchor links stay relative and cross-page links hop to the right file.
// Aliases: when deployed as index.html (or root '/'), treat the page as
// 'Brand Foundations.html' so sidebar anchors work without rewriting NAV.
function currentPage() {
  const f = (location.pathname.split('/').pop() || '').replace(/[?#].*$/, '');
  const decoded = decodeURIComponent(f);
  if (!decoded || decoded === 'index.html' || decoded === 'index.htm') {
    return 'Brand Foundations.html';
  }
  return decoded;
}

function Sidebar({ active }) {
  const here = currentPage();
  // Foundations and Co-events both live on the main page. Co-events items
  // are in-page anchors to the compact brand summary sections rendered at
  // the bottom of <main> (#medicomtek / #beautyderma / #inspire).
  return (
    <aside className="sidebar">
      <div className="brand-mark">
        <KimesWordmark height={24} />
        <div>
          <div className="name">Design System</div>
          <div className="sub">v 2026.0</div>
        </div>
      </div>
      <LangToggle />
      {NAV.map(group => {
        const onThisPage = group.page === here;
        return (
          <div className="nav-group" key={group.title}>
            <h6>{group.title}</h6>
            {group.items.map(item => {
              const inert = !onThisPage;
              const showSoon = item.soon || inert;
              const href = onThisPage ? `#${item.id}` : 'javascript:void(0)';
              const isActive = onThisPage && active === item.id;
              return (
                <a
                  key={item.id}
                  href={href}
                  className={`nav-link ${isActive ? 'active' : ''} ${showSoon ? 'soon' : ''}`}
                  onClick={inert ? (e) => e.preventDefault() : undefined}
                  title={inert ? 'Available in extended deployment' : undefined}
                >
                  <span>{item.label}</span>
                  {showSoon && <span className="soon-pill">Soon</span>}
                </a>
              );
            })}
          </div>
        );
      })}
    </aside>
  );
}

/* ---------- Hero / Intro ---------- */
function Hero() {
  const c = useSectionContent('intro');
  return (
    <section id="intro" className="section hero">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h1>{c.title}</h1>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <div className="meta">
        {(c.meta || []).map((m, i) => (
          <div key={i}><span>{m.label}</span><span>{m.value}</span></div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Brand family ---------- */
function BrandFamily() {
  const c = useSectionContent('family');
  const brand = useBrandFilter();
  const brands = (c.brands || []).filter(b => b.id === brand);
  const badges = c.badges || { signature: 'Slash-cut family', independent: 'Independent identity' };
  return (
    <section id="family" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <div className="family-grid">
        {brands.map(b => (
          <div key={b.id} className="family-card">
            <div className={`preview ${b.bgClass || 'bg-white'}`}>
              {wordmarkFromRef(b.wordmark, b.wordmarkSize)}
            </div>
            <div className="body">
              <div className="head">
                <span className="name">{b.name}</span>
                {b.signature ? (
                  <span className="badge signature">{badges.signature}</span>
                ) : (
                  <span className="badge">{badges.independent}</span>
                )}
              </div>
              <p className="desc-line">{b.desc}</p>
              <div className="swatches">
                <span className="dot" style={{ background: b.primary }} title={b.primary} />
                <span className="dot" style={{ background: b.secondary }} title={b.secondary} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Color tokens ---------- */
function ColorTokens() {
  const c = useSectionContent('color');
  const brand = useBrandFilter();
  const groups = (c.groups || []).filter(g => g.id === brand);
  const h = c.tableHeaders || { token: 'Token', hex: 'HEX', rgb: 'RGB', cmyk: 'CMYK', usage: 'Usage' };
  return (
    <section id="color" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      {groups.map(g => (
        <div key={g.id} className="tokens-group">
          <div className="group-head">
            <span className="ind" style={{ background: g.indicator }} />
            <span className="group-name">{g.name}</span>
            <span className="group-sub">{g.note}</span>
          </div>
          <table className="token-table">
            <thead>
              <tr>
                <th></th>
                <th>{h.token}</th>
                <th>{h.hex}</th>
                <th>{h.rgb}</th>
                <th>{h.cmyk}</th>
                <th>{h.usage}</th>
              </tr>
            </thead>
            <tbody>
              {(g.rows || []).map(r => (
                <tr key={r.token}>
                  <td className="swatch-cell"><div className="sw" style={{ background: r.hex }} /></td>
                  <td className="name-cell">{r.token}</td>
                  <td className="mono">{(r.hex || '').toUpperCase()}</td>
                  <td className="mono">{r.rgb}</td>
                  <td className="mono">{r.cmyk}</td>
                  <td className="usage">{r.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}

/* ---------- Typography ---------- */
function Typography() {
  const c = useSectionContent('typography');
  const tabs = c.tabs || { latin: 'Latin · Montserrat', kr: '한글 · Pretendard' };
  const [tab, setTab] = useState('latin');
  const scale = tab === 'latin' ? (c.scaleLatin || []) : (c.scaleKr || []);
  const fontFamily = tab === 'latin' ? "'Montserrat', sans-serif" : "'Pretendard Variable', 'Pretendard', sans-serif";
  const fontLabel = tab === 'latin' ? 'Montserrat' : 'Pretendard';

  return (
    <section id="typography" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />

      <div className="type-tabs" role="tablist">
        <button className={tab === 'latin' ? 'active' : ''} onClick={() => setTab('latin')}>{tabs.latin}</button>
        <button className={tab === 'kr' ? 'active' : ''} onClick={() => setTab('kr')}>{tabs.kr}</button>
      </div>

      <table className="type-table">
        <tbody>
          {scale.map(t => (
            <tr key={t.token}>
              <td className="label-col">
                <span className="token-name">{t.token}</span>
                <span className="meta">
                  {t.label}<br />
                  {t.size}px / {t.weight} / {t.lh}<br />
                  {fontLabel}
                </span>
              </td>
              <td className="specimen-col">
                <div style={{
                  fontFamily,
                  fontSize: `${t.size}px`,
                  fontWeight: t.weight,
                  lineHeight: t.lh,
                  letterSpacing: t.size >= 30 ? '-0.015em' : '0',
                  color: 'var(--ink)',
                }}>
                  {t.sample}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ---------- Logo usage ---------- */
function LogoBlock({ name, rules, color, size, Comp, hasWhiteVariant }) {
  // Tiles: white / gray / black / brand-color.
  // For brands with a dedicated white-on-dark SVG (KIMES), pass
  // hasWhiteVariant — the Black + Brand tiles render variant="white".
  // Otherwise we fall back to a CSS knockout (invert) to keep parity.
  const tiles = [
    { bg: 'White', cls: 'bg-white', dark: false },
    { bg: 'Gray', cls: 'bg-gray', dark: false },
    { bg: 'Black', cls: 'bg-black', dark: true },
    { bg: 'Brand', cls: 'bg-brand', style: { background: color }, dark: true },
  ];
  return (
    <div className="logo-block">
      <div className="head">
        <h4>{name}</h4>
        <span className="rules">{rules}</span>
      </div>
      <div className="logo-grid">
        {tiles.map(t => (
          <div key={t.bg} className={`logo-tile ${t.cls}`} style={t.style}>
            <span className="bg-label">{t.bg}</span>
            {t.dark && hasWhiteVariant ? (
              <Comp height={size} variant="white" />
            ) : t.dark ? (
              <span style={{ filter: 'brightness(0) invert(1)', display: 'inline-flex' }}>
                <Comp height={size} />
              </span>
            ) : (
              <Comp height={size} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoVariants() {
  // Each row lists every approved lockup variant for one brand, captioned
  // with the file name + a short description so designers can quickly find
  // the right SVG in /assets/logos/.
  const rows = [
    {
      brand: 'KIMES',
      tint: '#E60012',
      items: [
        { svg: 'kimes',      file: 'kimes-logo.svg',       label: 'Primary', desc: 'Wordmark only',    h: 44 },
        { svg: 'kimes2026',  file: 'kimes-2026-logo.svg',  label: '2026',    desc: 'Wordmark + year',  h: 44 },
        { svg: 'kimesWhite', file: 'kimes-white-logo.svg', label: 'White',   desc: 'On dark surfaces', h: 36, dark: true },
      ],
    },
    {
      brand: 'MedicomteK',
      tint: '#036EB8',
      items: [
        { svg: 'mc',     file: 'medicomtek-logo.svg',      label: 'Primary', desc: 'Wordmark only',   h: 28 },
        { svg: 'mc2026', file: 'medicomtek-2026-logo.svg', label: '2026',    desc: 'Wordmark + year', h: 36 },
      ],
    },
    {
      brand: 'Beauty\u2009&\u2009Derma',
      tint: '#5D3B8B',
      items: [
        { svg: 'bdSeoul', file: 'beautyderma-seoul-logo.svg',        label: 'Horizontal',   desc: 'Single-line lockup', h: 16 },
        { svg: 'bdStack', file: 'beautyderma-seoul-stack-logo.svg',  label: '3-line stack', desc: 'Vertical lockup',    h: 80 },
        { svg: 'bdWhite', file: 'beautyderma-busan-white-logo.svg',  label: 'White',        desc: 'On dark surfaces',   h: 16, dark: true },
      ],
    },
    {
      brand: 'INSPIRE Digital Health — Gray',
      tint: '#595757',
      note: 'On light surfaces',
      items: [
        { svg: 'inShort',   file: 'inspire-logo.svg',         label: 'Short',   desc: 'INSPIRE wordmark only',   h: 32 },
        { svg: 'inStack',   file: 'inspire-stack-logo.svg',   label: '2-line',  desc: 'Stacked with descriptor', h: 56 },
        { svg: 'inTagline', file: 'inspire-tagline-logo.svg', label: 'Tagline', desc: 'With Digital Health',     h: 28 },
      ],
    },
    {
      brand: 'INSPIRE Digital Health — Lime',
      tint: '#BFD633',
      note: 'On dark / gray surfaces',
      darkTiles: true,
      items: [
        { svg: 'inLimeShort',   file: 'inspire-lime-logo.svg',         label: 'Short',   desc: 'INSPIRE wordmark only',   h: 32 },
        { svg: 'inLimeStack',   file: 'inspire-lime-stack-logo.svg',   label: '2-line',  desc: 'Stacked with descriptor', h: 56 },
        { svg: 'inLimeTagline', file: 'inspire-lime-tagline-logo.svg', label: 'Tagline', desc: 'With Digital Health',     h: 28 },
      ],
    },
  ];

  return (
    <div id="logo-variants" className="subsection">
      <h3>Logo variants</h3>
      <p className="desc">
        Every approved lockup, sourced from the official SVG artwork in
        <code> /assets/logos/</code>. Use only these files — never recreate the
        wordmarks in CSS or set them as text. The slash-cut detail on the
        KIMES and MedicomteK <code>i</code> only renders correctly from the SVG.
      </p>
      <div className="variants-list">
        {rows.map(row => (
          <div className="variants-row" key={row.brand}>
            <div className="variants-head">
              <span className="tint" style={{ background: row.tint }} />
              <span className="brand">{row.brand}</span>
              {row.note && <span className="brand-note">{row.note}</span>}
            </div>
            <div className="variants-tiles">
              {row.items.map(item => (
                <div key={item.file} className={`variant-tile ${(item.dark || row.darkTiles) ? 'dark' : ''}`}>
                  <div className="variant-art">
                    <InlineLogo
                      name={item.svg}
                      height={item.h}
                      ariaLabel={`${row.brand} ${item.label}`}
                    />
                  </div>
                  <div className="variant-meta">
                    <span className="vlabel">{item.label}</span>
                    <span className="vdesc">{item.desc}</span>
                    <span className="vfile">{item.file}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Logo catalog ---------- */

function LogoCatalog() {
  const c = useSectionContent('logo');
  const brand = useBrandFilter();
  const brands = (c.brands || []).filter(b => b.id === brand);
  const fs = c.familySignature || { title: '', body: '' };
  return (
    <section id="logo" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />

      {brands.map(brand => (
        <div className="logo-cat-row" key={brand.id}>
          <div className="logo-cat-head">
            <span className="dot" style={{ background: brand.color }}></span>
            <span className="brand">{brand.name}</span>
          </div>
          <div className="logo-cat-tiles">
            {(brand.items || []).map(item => (
              <div key={item.file} className={`logo-cat-tile ${item.dark ? 'dark' : ''}`}>
                <div className="logo-cat-art">
                  <InlineLogo name={item.svg} height={item.h} ariaLabel={`${brand.name} ${item.label}`} />
                </div>
                <div className="logo-cat-meta">
                  <span className="vlabel">{item.label}</span>
                  <span className="vfile">{item.file}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {brand === 'kimes' && (
        <div className="family-signature">
          <div className="fs-zoom">
            <InlineLogo name="kimes" height={120} ariaLabel="KIMES slash-cut detail" />
          </div>
          <div className="fs-body">
            <h4>{fs.title}</h4>
            <p dangerouslySetInnerHTML={{ __html: fs.body || '' }} />
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Spacing & grid ---------- */
function SpacingGrid() {
  const c = useSectionContent('spacing');
  const scale = c.scale || { title: '', desc: '', tokens: [] };
  const grid  = c.grid  || { title: '', desc: '', breakpoints: [] };
  return (
    <section id="spacing" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />

      <div className="subsection">
        <h3>{scale.title}</h3>
        <p className="desc" dangerouslySetInnerHTML={{ __html: scale.desc || '' }} />
        <div>
          {(scale.tokens || []).map(s => (
            <div key={s.token} className="spacing-row">
              <div className="name">{s.token}</div>
              <div className="value">{s.value}px</div>
              <div className="bar" style={{ width: `${s.value}px` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="subsection">
        <h3>{grid.title}</h3>
        <p className="desc" dangerouslySetInnerHTML={{ __html: grid.desc || '' }} />
        <div className="grid-spec">
          {(grid.breakpoints || []).map(bp => (
            <div className="card" key={bp.label}>
              <div className="label">{bp.label}</div>
              <div className="val">{bp.cols}</div>
              <div className="meta">{bp.meta}</div>
            </div>
          ))}
        </div>
        <div className="grid-vis">
          <div className="cols">
            {Array.from({ length: 12 }).map((_, i) => <div key={i} className="col" />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Co-event summary page ----------------------------
 * Each <CoEventPage brandId="mc"> renders a focused brand profile at the
 * bottom of the main page, anchored at #medicomtek / #beautyderma /
 * #inspire so the Co-events sidebar group can scroll to it. Inside, we
 * provide BrandContext = brandId, then re-use the same section components
 * that the KIMES main page uses — they read the Context and filter their
 * data to that brand. The navIds array drives which sub-sections appear.
 * --------------------------------------------------------------- */
function CoEventPage({ brandId, navId, sections }) {
  const fam = useSectionContent('family');
  const brandData = (fam.brands || []).find(b => b.id === brandId);
  if (!brandData) return null;

  // Page header already shows brand name / description; the inner sections
  // pick up the design specifics. Override `sections` prop if a co-event
  // needs a different ordering.
  const SECTIONS = sections || ['color', 'color-proportion', 'gradients', 'logo', 'logo-rules', 'asset-library'];
  // Look up each section component by name on window. AssetLibrary,
  // ColorProportion, Gradients, LogoRules etc. live in their own .jsx
  // files and self-register on window when they load.
  const COMPS = {
    'color':            window.ColorTokens,
    'color-proportion': window.ColorProportion,
    'gradients':        window.Gradients,
    'logo':             window.LogoCatalog,
    'logo-rules':       window.LogoRules,
    'asset-library':    window.AssetLibrary,
  };

  return (
    <BrandContext.Provider value={brandId}>
      <section id={navId} className="section co-event-page">
        <div className="section-eyebrow">동시개최행사 · Co-event</div>
        <h2>{brandData.name}</h2>
        <p className="lede">{brandData.desc}</p>
        <div className="co-event-meta">
          <span className="dot" style={{ background: brandData.primary }}   title={brandData.primary} />
          <span className="dot" style={{ background: brandData.secondary }} title={brandData.secondary} />
          <span className={`badge ${brandData.signature ? 'signature' : ''}`}>
            {brandData.signature ? 'Slash-cut family' : 'Independent identity'}
          </span>
        </div>
        <div className="co-event-body">
          {SECTIONS.map(s => {
            const Comp = COMPS[s];
            return Comp ? <Comp key={s} /> : null;
          })}
        </div>
      </section>
    </BrandContext.Provider>
  );
}

/* ---------- Active section tracker ---------- */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join(',')]);
  return active;
}

Object.assign(window, {
  Sidebar,
  Hero,
  BrandFamily,
  ColorTokens,
  Typography,
  LogoCatalog,
  // Back-compat: previous render call used <LogoUsage />.
  LogoUsage: LogoCatalog,
  SpacingGrid,
  CoEventPage,
  useActiveSection,
  useSiteLang,
  useSectionContent,
  // Brand filter — section components below DocsSections.jsx grab these
  // off window so they can join the same Context as the local sections.
  BrandContext,
  useBrandFilter,
  NAV_BRAND_MAP,
  NAV,
});

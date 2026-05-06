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
    title: 'Components',
    page: 'Components.html',
    items: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'cards', label: 'Cards' },
      { id: 'forms', label: 'Forms', soon: true },
      { id: 'navigation', label: 'Navigation', soon: true },
    ],
  },
  {
    title: 'Applications',
    page: 'Applications - Social Media.html',
    items: [
      { id: 'social', label: 'Social media templates' },
      { id: 'print', label: 'Print collateral', soon: true },
      { id: 'signage', label: 'Event signage', soon: true },
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
  // For groups not matching the current page, treat all items as inert
  // ("Soon") since this deployment ships only the Brand Foundations page.
  // Editors can extend the deployment by adding the Components.html and
  // Applications - Social Media.html pages alongside index.html later.
  return (
    <aside className="sidebar">
      <div className="brand-mark">
        <KimesWordmark height={24} />
        <div>
          <div className="name">Design System</div>
          <div className="sub">v 2026.0</div>
        </div>
      </div>
      {NAV.map(group => {
        const onThisPage = group.page === here;
        return (
          <div className="nav-group" key={group.title}>
            <h6>{group.title}</h6>
            {group.items.map(item => {
              const inert = !onThisPage; // Cross-page nav not deployed.
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
  const c = (window.CONTENT && window.CONTENT.intro) || {};
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
  const c = (window.CONTENT && window.CONTENT.family) || {};
  const brands = c.brands || [];
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
  const c = (window.CONTENT && window.CONTENT.color) || {};
  const groups = c.groups || [];
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
const TYPE_SCALE = [
  { token: '--type-display', size: 56, weight: 800, lh: 1.05, label: 'Display', sample: 'Korea\'s largest medical exhibition' },
  { token: '--type-h1', size: 40, weight: 800, lh: 1.1, label: 'H1', sample: 'KIMES 2026 — registration is open' },
  { token: '--type-h2', size: 30, weight: 700, lh: 1.2, label: 'H2', sample: 'Exhibitor categories & floor plan' },
  { token: '--type-h3', size: 22, weight: 700, lh: 1.3, label: 'H3', sample: 'Imaging & diagnostic equipment' },
  { token: '--type-body-lg', size: 17, weight: 400, lh: 1.55, label: 'Body large', sample: 'KIMES brings together over 1,300 exhibitors and 80,000 trade visitors at COEX every March.' },
  { token: '--type-body', size: 15, weight: 400, lh: 1.55, label: 'Body', sample: 'KIMES brings together over 1,300 exhibitors and 80,000 trade visitors at COEX every March.' },
  { token: '--type-caption', size: 12, weight: 500, lh: 1.5, label: 'Caption', sample: 'COEX, Seoul · 19—22 March 2026' },
];

const TYPE_SCALE_KR = [
  { token: '--type-display', size: 56, weight: 800, lh: 1.05, label: 'Display', sample: '한국 최대 의료기기·병원설비 전시회' },
  { token: '--type-h1', size: 40, weight: 800, lh: 1.1, label: 'H1', sample: 'KIMES 2026 사전등록 개시' },
  { token: '--type-h2', size: 30, weight: 700, lh: 1.2, label: 'H2', sample: '참가업체 카테고리 안내' },
  { token: '--type-h3', size: 22, weight: 700, lh: 1.3, label: 'H3', sample: '영상진단 의료기기' },
  { token: '--type-body-lg', size: 17, weight: 400, lh: 1.55, label: 'Body large', sample: 'KIMES는 매년 3월 코엑스에서 1,300여 개사 및 8만여 명의 전문 관람객이 참여하는 한국 최대의 의료·병원기기 전시회입니다.' },
  { token: '--type-body', size: 15, weight: 400, lh: 1.55, label: 'Body', sample: 'KIMES는 매년 3월 코엑스에서 1,300여 개사 및 8만여 명의 전문 관람객이 참여하는 한국 최대의 의료·병원기기 전시회입니다.' },
  { token: '--type-caption', size: 12, weight: 500, lh: 1.5, label: 'Caption', sample: '코엑스 · 2026년 3월 19일 — 22일' },
];

function Typography() {
  const [tab, setTab] = useState('latin');
  const scale = tab === 'latin' ? TYPE_SCALE : TYPE_SCALE_KR;
  const fontFamily = tab === 'latin' ? "'Montserrat', sans-serif" : "'Pretendard Variable', 'Pretendard', sans-serif";
  const fontLabel = tab === 'latin' ? 'Montserrat' : 'Pretendard';

  return (
    <section id="typography" className="section">
      <div className="section-eyebrow">06 — Typography</div>
      <h2>Typography</h2>
      <p className="lede">
        Latin text is set in <b>Montserrat</b> — the family used in the KIMES
        and MedicomteK wordmarks. Korean text is set in <b>Pretendard</b>,
        chosen for its harmonious metrics with Montserrat at matching sizes.
        Numerals always use Montserrat Bold.
      </p>

      <div className="type-tabs" role="tablist">
        <button className={tab === 'latin' ? 'active' : ''} onClick={() => setTab('latin')}>Latin · Montserrat</button>
        <button className={tab === 'kr' ? 'active' : ''} onClick={() => setTab('kr')}>한글 · Pretendard</button>
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
const LOGO_CATALOG = [
  {
    id: 'kimes', name: 'KIMES', color: '#E60012',
    items: [
      { svg: 'kimes',      file: 'kimes-logo.svg',       label: 'Primary',   h: 32 },
      { svg: 'kimes2026',  file: 'kimes-2026-logo.svg',  label: 'With year', h: 32 },
      { svg: 'kimesWhite', file: 'kimes-white-logo.svg', label: 'White',     h: 26, dark: true },
    ],
  },
  {
    id: 'mc', name: 'MedicomteK', color: '#036EB8',
    items: [
      { svg: 'mc',      file: 'medicomtek-logo.svg',         label: 'Primary',   h: 22 },
      { svg: 'mc2026',  file: 'medicomtek-2026-logo.svg',    label: 'With year', h: 28 },
      { svg: 'mcWhite', file: 'medicomtek-white-logo.svg',   label: 'White',     h: 22, dark: true },
    ],
  },
  {
    id: 'bd', name: 'Beauty\u2009&\u2009Derma', color: '#5D3B8B',
    items: [
      { svg: 'bdSeoul', file: 'beautyderma-seoul-logo.svg',       label: 'Horizontal',   h: 14 },
      { svg: 'bdStack', file: 'beautyderma-seoul-stack-logo.svg', label: '3-line stack', h: 60 },
      { svg: 'bdWhite', file: 'beautyderma-busan-white-logo.svg', label: 'White',        h: 14, dark: true },
    ],
  },
  {
    id: 'in', name: 'INSPIRE Digital Health', color: '#595757',
    items: [
      { svg: 'inShort',       file: 'inspire-logo.svg',              label: 'Short',           h: 26 },
      { svg: 'inStack',       file: 'inspire-stack-logo.svg',        label: '2-line stack',    h: 48 },
      { svg: 'inTagline',     file: 'inspire-tagline-logo.svg',      label: 'Tagline (gray)',  h: 22 },
      { svg: 'inLimeTagline', file: 'inspire-lime-tagline-logo.svg', label: 'Tagline (lime)',  h: 22, dark: true },
    ],
  },
];

function LogoCatalog() {
  return (
    <section id="logo" className="section">
      <div className="section-eyebrow">08 — Logo</div>
      <h2>Logo</h2>
      <p className="lede">
        The complete catalog of approved logo files. Use only these SVGs from
        <code> /assets/logos/</code> — never recreate the wordmarks in CSS or
        set them as text. The slash-cut <code>i</code> only renders correctly
        from the SVG.
      </p>

      {LOGO_CATALOG.map(brand => (
        <div className="logo-cat-row" key={brand.id}>
          <div className="logo-cat-head">
            <span className="dot" style={{ background: brand.color }}></span>
            <span className="brand">{brand.name}</span>
          </div>
          <div className="logo-cat-tiles">
            {brand.items.map(item => (
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

      <div className="family-signature">
        <div className="fs-zoom">
          <InlineLogo name="kimes" height={120} ariaLabel="KIMES slash-cut detail" />
        </div>
        <div className="fs-body">
          <h4>Family signature</h4>
          <p>
            KIMES and MedicomteK share a common slash-cut detail on the
            <code> i</code> — the visual signature of the KIMES medical-equipment
            family. Beauty&amp;Derma and INSPIRE Digital Health are independent
            identities with their own visual systems.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Spacing & grid ---------- */
const SPACING = [
  { token: '--space-1', value: 8 },
  { token: '--space-2', value: 16 },
  { token: '--space-3', value: 24 },
  { token: '--space-4', value: 32 },
  { token: '--space-5', value: 48 },
  { token: '--space-6', value: 64 },
  { token: '--space-7', value: 80 },
];

function SpacingGrid() {
  return (
    <section id="spacing" className="section">
      <div className="section-eyebrow">12 — Spacing &amp; grid</div>
      <h2>Spacing &amp; grid</h2>
      <p className="lede">
        A single 8-unit spacing scale governs all rhythm. The page grid is a
        12-column track at desktop, scaling down to 8 columns on tablet and
        4 on mobile.
      </p>

      <div className="subsection">
        <h3>Spacing scale</h3>
        <p className="desc">
          Multiples of 8px. Use semantic tokens like <code>--space-3</code> rather
          than raw pixel values — consistent rhythm across all surfaces.
        </p>
        <div>
          {SPACING.map(s => (
            <div key={s.token} className="spacing-row">
              <div className="name">{s.token}</div>
              <div className="value">{s.value}px</div>
              <div className="bar" style={{ width: `${s.value}px` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="subsection">
        <h3>Grid system</h3>
        <p className="desc">
          12-column responsive grid with a 1280px max width on desktop.
        </p>
        <div className="grid-spec">
          <div className="card">
            <div className="label">Desktop ≥ 1024px</div>
            <div className="val">12</div>
            <div className="meta">columns · 24px gutter · 1280px max</div>
          </div>
          <div className="card">
            <div className="label">Tablet 640–1023px</div>
            <div className="val">8</div>
            <div className="meta">columns · 20px gutter</div>
          </div>
          <div className="card">
            <div className="label">Mobile &lt; 640px</div>
            <div className="val">4</div>
            <div className="meta">columns · 16px gutter</div>
          </div>
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
  useActiveSection,
  NAV,
});

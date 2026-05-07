/* eslint-disable */
const useSectionContent = window.useSectionContent;
const useSiteLang = window.useSiteLang;

/**
 * Color proportion — section 04.
 *
 * Five subsections:
 *   04.1  Brand-by-brand proportions
 *   04.2  Comparison view
 *   04.3  Application examples (mock posters)
 *   04.4  Acceptable deviation
 *   04.5  Don'ts
 *
 * The proportion bars are pure CSS (flex children with width:%), using
 * exact brand hex values. White segments get a thin border so they
 * remain visible against the page background.
 */

/* ---------- Brand proportion data ----------------------------- */

// Brand filter: each subsection iterates only the current brand from
// PROPORTIONS / mocks. Hooked off window — DocsSections.jsx defines it.
const useBrandFilter = window.useBrandFilter;

const PROPORTIONS = [
  {
    id: 'kimes',
    name: 'KIMES',
    accent: '#E60012',
    tone: '강렬한 산업 전시회',
    toneEn: 'Bold industrial trade show',
    segments: [
      { hex: '#FFFFFF', name: 'White', kr: '화이트', pct: 60, role: 'Background, breathing space', krRole: '배경, 여백' },
      { hex: '#231815', name: 'Black', kr: '블랙',   pct: 25, role: 'Text, structure',              krRole: '텍스트, 구조' },
      { hex: '#E60012', name: 'Red',   kr: '레드',   pct: 15, role: 'Accent, headlines, CTAs',      krRole: '액센트, 헤드라인, CTA' },
    ],
  },
  {
    id: 'mc',
    name: 'MedicomteK',
    accent: '#036EB8',
    tone: '전문적·기술적',
    toneEn: 'Professional / technical',
    segments: [
      { hex: '#FFFFFF', name: 'White', kr: '화이트', pct: 65, role: 'Background', krRole: '배경' },
      { hex: '#231815', name: 'Black', kr: '블랙',   pct: 20, role: 'Text',       krRole: '텍스트' },
      { hex: '#036EB8', name: 'Blue',  kr: '블루',   pct: 15, role: 'Accent',     krRole: '액센트' },
    ],
  },
  {
    id: 'bd',
    name: 'Beauty\u2009&\u2009Derma',
    accent: '#5D3B8B',
    tone: '우아함·전문성',
    toneEn: 'Elegant / refined',
    segments: [
      { hex: '#FFFFFF', name: 'White',         kr: '화이트',     pct: 60, role: 'Background',                  krRole: '배경' },
      { hex: '#BAB1D7', name: 'Light purple',  kr: '라이트 퍼플', pct: 25, role: 'Soft fills, large surfaces',  krRole: '부드러운 채움, 넓은 표면' },
      { hex: '#5D3B8B', name: 'Purple',        kr: '퍼플',       pct: 10, role: 'Text, headlines',             krRole: '텍스트, 헤드라인' },
      { hex: '#231815', name: 'Black',         kr: '블랙',       pct:  5, role: 'Body text',                    krRole: '본문' },
    ],
  },
  {
    id: 'in',
    name: 'INSPIRE Digital Health',
    accent: '#BFD633',
    tone: '혁신·디지털',
    toneEn: 'Innovation / digital',
    segments: [
      { hex: '#595757', name: 'Gray',  kr: '그레이', pct: 50, role: 'Primary surface', krRole: '주요 표면' },
      { hex: '#FFFFFF', name: 'White', kr: '화이트', pct: 35, role: 'Text on gray',    krRole: '그레이 위 텍스트' },
      { hex: '#BFD633', name: 'Lime',  kr: '라임',   pct: 15, role: 'Highlights, CTAs', krRole: '하이라이트, CTA' },
    ],
  },
];

/* ---------- Reusable proportion bar --------------------------- */

function ProportionBar({ segments, height = 48, showLabels = true, idPrefix = '' }) {
  const lang = useSiteLang();
  const tName = (s) => lang === 'ko' && s.kr ? s.kr : s.name;
  const tRole = (s) => lang === 'ko' && s.krRole ? s.krRole : s.role;
  return (
    <div className="cp-bar-wrap">
      <div className="cp-bar" style={{ height }}>
        {segments.map((s, i) => {
          const isWhite = s.hex.toUpperCase() === '#FFFFFF';
          return (
            <div
              key={`${idPrefix}${i}`}
              className={`cp-seg ${isWhite ? 'is-white' : ''}`}
              style={{ width: `${s.pct}%`, background: s.hex }}
              title={`${tName(s)} — ${s.pct}%`}
            >
              {s.pct >= 18 && (
                <span className="cp-seg-pct" style={{ color: pickContrastInk(s.hex) }}>
                  {s.pct}%
                </span>
              )}
            </div>
          );
        })}
      </div>
      {showLabels && (
        <div className="cp-bar-labels">
          {segments.map((s, i) => (
            <div key={`l${idPrefix}${i}`} className="cp-bar-label" style={{ width: `${s.pct}%` }}>
              <span className="cp-sw" style={{ background: s.hex, borderColor: s.hex.toUpperCase() === '#FFFFFF' ? '#e1e5ea' : 'transparent' }} />
              <span className="cp-name">{tName(s)}</span>
              <span className="cp-pct">{s.pct}%</span>
              <span className="cp-role">{tRole(s)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Cheap luminance-based contrast picker for in-segment % labels.
function pickContrastInk(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.55 ? 'rgba(35,24,21,0.75)' : 'rgba(255,255,255,0.95)';
}

/* ============================================================
   04.1 — Brand-by-brand proportions
   ============================================================ */
function BrandByBrand() {
  const brand = useBrandFilter();
  const lang  = useSiteLang();
  const c = useSectionContent('color-proportion');
  const sub = (c.subsections && c.subsections.brandByBrand) || {};
  const items = PROPORTIONS.filter(b => b.id === brand);
  return (
    <div id="cp-brand-by-brand" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="cp-brand-list">
        {items.map(b => (
          <div className="cp-brand-card" key={b.id}>
            <div className="cp-brand-head">
              <span className="cp-dot" style={{ background: b.accent }} />
              <span className="cp-brand-name">{b.name}</span>
              <span className="cp-tone">{lang === 'ko' ? b.tone : b.toneEn}</span>
            </div>
            <ProportionBar segments={b.segments} idPrefix={`${b.id}-`} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   04.2 — Comparison view
   ============================================================ */
function ComparisonView() {
  const brand = useBrandFilter();
  const c = useSectionContent('color-proportion');
  const sub = (c.subsections && c.subsections.comparison) || {};
  const items = PROPORTIONS.filter(b => b.id === brand);
  const summary = c.comparisonNotes || [];
  return (
    <div id="cp-compare" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="cp-compare-grid">
        {items.map(b => {
          const note = summary.find(s => s.id === b.id)?.text;
          return (
            <div className="cp-compare-row" key={b.id}>
              <div className="cp-compare-label">
                <span className="cp-dot" style={{ background: b.accent }} />
                <span className="cp-compare-name">{b.name}</span>
                <span className="cp-compare-note">{note}</span>
              </div>
              <ProportionBar
                segments={b.segments}
                height={28}
                showLabels={false}
                idPrefix={`cmp-${b.id}-`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   04.3 — Application examples (mock posters)
   ============================================================ */
function ApplicationMocks() {
  const brand = useBrandFilter();
  // Each mock is a 4:5 ratio card. Zones are sized to mirror the
  // proportion table for that brand. Pure color blocks — no copy.
  const lang = useSiteLang();
  const tr = (en, ko) => lang === 'ko' && ko ? ko : en;
  const allMocks = [
    {
      id: 'kimes',
      name: 'KIMES',
      zones: [
        { h: 60, bg: '#FFFFFF', label: tr('IMAGE / HEADLINE', '\uc774\ubbf8\uc9c0 / \ud5e4\ub4dc\ub77c\uc778') },
        { h: 15, bg: '#E60012', label: tr('EYEBROW',          '\uc5d0\uc774\ube0c\ub85c\uc6b0') },
        { h: 25, bg: '#231815', label: tr('FOOTER',           '\ud478\ud130'),       ink: '#fff' },
      ],
    },
    {
      id: 'mc',
      name: 'MedicomteK',
      zones: [
        { h: 65, bg: '#FFFFFF', label: tr('CONTENT', '\ucf58\ud150\uce20') },
        { h: 15, bg: '#036EB8', label: tr('ACCENT',  '\uc561\uc13c\ud2b8') },
        { h: 20, bg: '#231815', label: tr('FOOTER',  '\ud478\ud130'), ink: '#fff' },
      ],
    },
    {
      id: 'bd',
      name: 'Beauty\u2009&\u2009Derma',
      zones: [
        { h: 25, bg: '#BAB1D7', label: tr('SOFT BG',  '\uc18c\ud504\ud2b8 \ubc30\uacbd') },
        { h: 60, bg: '#FFFFFF', label: tr('CONTENT',  '\ucf58\ud150\uce20') },
        { h: 10, bg: '#5D3B8B', label: tr('HEADLINE', '\ud5e4\ub4dc\ub77c\uc778'), ink: '#fff' },
        { h:  5, bg: '#231815', label: '',         ink: '#fff' },
      ],
    },
    {
      id: 'in',
      name: 'INSPIRE',
      zones: [
        { h: 50, bg: '#595757', label: tr('SURFACE',      '\ud45c\uba74'),       ink: '#fff' },
        { h: 35, bg: '#FFFFFF', label: tr('CONTENT CARD', '\ucf58\ud150\uce20 \uce74\ub4dc') },
        { h: 15, bg: '#BFD633', label: tr('CTA',          'CTA') },
      ],
    },
  ];
  const mocks = allMocks.filter(m => m.id === brand);

  const c = useSectionContent('color-proportion');
  const sub = (c.subsections && c.subsections.applicationMocks) || {};
  return (
    <div id="cp-mocks" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="cp-mock-row">
        {mocks.map(m => (
          <div className="cp-mock" key={m.id}>
            <div className="cp-mock-frame" role="img" aria-label={`${m.name} proportion mock`}>
              {m.zones.map((z, i) => (
                <div
                  key={i}
                  className="cp-mock-zone"
                  style={{
                    height: `${z.h}%`,
                    background: z.bg,
                    color: z.ink || 'rgba(35,24,21,0.55)',
                    borderTop: i > 0 && z.bg.toUpperCase() === '#FFFFFF'
                      ? '1px solid #e1e5ea' : 'none',
                  }}
                >
                  {z.label && <span className="cp-mock-tag">{z.label}</span>}
                </div>
              ))}
            </div>
            <div className="cp-mock-label">{m.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   04.4 — Acceptable deviation
   ============================================================ */
function AcceptableDeviation() {
  const brand = useBrandFilter();
  // Demos are KIMES-specific (red proportion ratios) — hide on co-event
  // pages where they'd misrepresent the brand colors.
  if (brand !== 'kimes') return null;
  const c = useSectionContent('color-proportion');
  const sub = (c.subsections && c.subsections.acceptableDeviation) || {};
  const examples = sub.examples || [];
  // Build a 3-segment bar where red = pct, black = 25% scaled, white = remainder.
  function buildSegs(redPct) {
    const blackPct = Math.max(10, 25 * (1 - (redPct - 15) / 50));
    const whitePct = Math.max(10, 100 - redPct - blackPct);
    // Renormalize
    const total = redPct + blackPct + whitePct;
    return [
      { hex: '#FFFFFF', name: 'White', pct: +(whitePct * 100 / total).toFixed(0), role: '' },
      { hex: '#231815', name: 'Black', pct: +(blackPct * 100 / total).toFixed(0), role: '' },
      { hex: '#E60012', name: 'Red',   pct: redPct, role: '' },
    ];
  }

  return (
    <div id="cp-deviation" className="subsection">
      <h3>{sub.title}</h3>
      <div className="cp-rule">
        <p>
          {sub.intro} <strong>{sub.introStrong}</strong>.
        </p>
        <ul>
          {(sub.bullets || []).map((b, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
          ))}
        </ul>
      </div>
      <div className="cp-dev-grid">
        {examples.map(e => (
          <div className={`cp-dev-card ${e.ok ? 'ok' : 'bad'}`} key={e.pct}>
            <div className="cp-dev-head">
              <span className={`verdict ${e.ok ? 'ok' : 'avoid'}`}>{e.ok ? '✓' : '✗'}</span>
              <span className="cp-dev-pct">{e.pct}{sub.redLabel || '% red'}</span>
            </div>
            <div className="cp-dev-bar">
              <ProportionBar
                segments={buildSegs(e.pct)}
                height={32}
                showLabels={false}
                idPrefix={`dev-${e.pct}-`}
              />
            </div>
            <div className="cp-dev-note">{e.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   04.5 — Don'ts
   ============================================================ */
function ColorProportionDonts() {
  const brand = useBrandFilter();
  // Mini-mocks are KIMES red examples — hide on co-event pages.
  if (brand !== 'kimes') return null;
  const c = useSectionContent('color-proportion');
  const sub = (c.subsections && c.subsections.donts) || {};
  // Mini-mocks demonstrating each wrong proportion. Use abstract zones.
  const lang = useSiteLang();
  const items = [
    {
      id: 'equal',
      ko: '균등 분할',
      en: 'Equal split (33/33/33)',
      sub: 'No hierarchy, brand identity diluted',
      krSub: '위계 없음, 브랜드 아이덴티티 희석',
      zones: [
        { h: 33, bg: '#FFFFFF' },
        { h: 34, bg: '#231815' },
        { h: 33, bg: '#E60012' },
      ],
    },
    {
      id: 'flood',
      ko: '브랜드 컬러 과다',
      en: 'Brand color as background fill',
      sub: '>40% — overwhelming, off-brand',
      krSub: '40% 초과 — 압도적이고 브랜드답지 않음',
      zones: [
        { h: 60, bg: '#E60012' },
        { h: 25, bg: '#FFFFFF' },
        { h: 15, bg: '#231815' },
      ],
    },
    {
      id: 'mix',
      ko: '브랜드 컬러 혼용',
      en: 'Multiple brand colors mixed',
      sub: 'KIMES red + MedicomteK blue confuses identity',
      krSub: 'KIMES 레드 + MedicomteK 블루는 아이덴티티 혼선',
      zones: [
        { h: 35, bg: '#E60012' },
        { h: 30, bg: '#FFFFFF' },
        { h: 35, bg: '#036EB8' },
      ],
    },
    {
      id: 'trace',
      ko: '브랜드 컬러 부족',
      en: 'Brand color reduced to under 5%',
      sub: 'Invisible — no brand presence',
      krSub: '안 보임 — 브랜드 존재감 없음',
      zones: [
        { h: 70, bg: '#FFFFFF' },
        { h: 27, bg: '#231815' },
        { h:  3, bg: '#E60012' },
      ],
    },
  ];
  return (
    <div id="cp-donts" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="cp-donts-grid">
        {items.map(item => (
          <div className="cp-dont-cell" key={item.id}>
            <span className="cp-dont-x" aria-hidden="true">✗</span>
            <div className="cp-dont-art">
              {item.zones.map((z, i) => (
                <div key={i}
                  className="cp-dont-zone"
                  style={{
                    height: `${z.h}%`,
                    background: z.bg,
                    borderTop: i > 0 && z.bg.toUpperCase() === '#FFFFFF'
                      ? '1px solid #e1e5ea' : 'none',
                  }}
                />
              ))}
            </div>
            <div className="cp-dont-meta">
              <span className="vlabel">{lang === 'ko' ? item.ko : item.en}</span>
              <span className="vdesc">{lang === 'ko' ? item.krSub : item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Page wrapper
   ============================================================ */
function ColorProportion() {
  const c = useSectionContent('color-proportion');
  return (
    <section id="color-proportion" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <BrandByBrand />
      <ComparisonView />
      <ApplicationMocks />
      <AcceptableDeviation />
      <ColorProportionDonts />
    </section>
  );
}

window.ColorProportion = ColorProportion;

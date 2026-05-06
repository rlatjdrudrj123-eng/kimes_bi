/* eslint-disable */
const useSectionContent = window.useSectionContent;

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
const useSiteBrand = window.useSiteBrand;

const PROPORTIONS = [
  {
    id: 'kimes',
    name: 'KIMES',
    accent: '#E60012',
    tone: '강렬한 산업 전시회',
    toneEn: 'Bold industrial trade show',
    segments: [
      { hex: '#FFFFFF', name: 'White', pct: 60, role: 'Background, breathing space' },
      { hex: '#231815', name: 'Black', pct: 25, role: 'Text, structure' },
      { hex: '#E60012', name: 'Red',   pct: 15, role: 'Accent, headlines, CTAs' },
    ],
  },
  {
    id: 'mc',
    name: 'MedicomteK',
    accent: '#036EB8',
    tone: '전문적·기술적',
    toneEn: 'Professional / technical',
    segments: [
      { hex: '#FFFFFF', name: 'White', pct: 65, role: 'Background' },
      { hex: '#231815', name: 'Black', pct: 20, role: 'Text' },
      { hex: '#036EB8', name: 'Blue',  pct: 15, role: 'Accent' },
    ],
  },
  {
    id: 'bd',
    name: 'Beauty\u2009&\u2009Derma',
    accent: '#5D3B8B',
    tone: '우아함·전문성',
    toneEn: 'Elegant / refined',
    segments: [
      { hex: '#FFFFFF', name: 'White',         pct: 60, role: 'Background' },
      { hex: '#BAB1D7', name: 'Light purple',  pct: 25, role: 'Soft fills, large surfaces' },
      { hex: '#5D3B8B', name: 'Purple',        pct: 10, role: 'Text, headlines' },
      { hex: '#231815', name: 'Black',         pct:  5, role: 'Body text' },
    ],
  },
  {
    id: 'in',
    name: 'INSPIRE Digital Health',
    accent: '#BFD633',
    tone: '혁신·디지털',
    toneEn: 'Innovation / digital',
    segments: [
      { hex: '#595757', name: 'Gray',  pct: 50, role: 'Primary surface' },
      { hex: '#FFFFFF', name: 'White', pct: 35, role: 'Text on gray' },
      { hex: '#BFD633', name: 'Lime',  pct: 15, role: 'Highlights, CTAs' },
    ],
  },
];

/* ---------- Reusable proportion bar --------------------------- */

function ProportionBar({ segments, height = 48, showLabels = true, idPrefix = '' }) {
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
              title={`${s.name} — ${s.pct}%`}
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
              <span className="cp-name">{s.name}</span>
              <span className="cp-pct">{s.pct}%</span>
              <span className="cp-role">{s.role}</span>
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
  const brand = useSiteBrand();
  const items = PROPORTIONS.filter(b => b.id === brand);
  return (
    <div id="cp-brand-by-brand" className="subsection">
      <h3>04.1 — Brand-by-brand proportions</h3>
      <p className="desc">
        Each brand has a recommended split between background, structure,
        and accent. Bar widths match the percentages exactly.
      </p>
      <div className="cp-brand-list">
        {items.map(b => (
          <div className="cp-brand-card" key={b.id}>
            <div className="cp-brand-head">
              <span className="cp-dot" style={{ background: b.accent }} />
              <span className="cp-brand-name">{b.name}</span>
              <span className="cp-tone">{b.tone}</span>
              <span className="cp-tone-en">— {b.toneEn}</span>
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
  const brand = useSiteBrand();
  const items = PROPORTIONS.filter(b => b.id === brand);
  const summary = [
    { id: 'kimes', text: 'red-accent industrial — 15% accent' },
    { id: 'mc',    text: 'blue-accent technical — 15% accent' },
    { id: 'bd',    text: 'purple-dominant elegant — 40% color combined' },
    { id: 'in',    text: 'gray-dominant digital — 50% gray' },
  ];
  return (
    <div id="cp-compare" className="subsection">
      <h3>04.2 — Comparison view</h3>
      <p className="desc">
        Stacked side by side, the proportional differences become obvious —
        each brand has a distinct visual personality.
      </p>
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
  const brand = useSiteBrand();
  // Each mock is a 4:5 ratio card. Zones are sized to mirror the
  // proportion table for that brand. Pure color blocks — no copy.
  const allMocks = [
    {
      id: 'kimes',
      name: 'KIMES',
      zones: [
        { h: 60, bg: '#FFFFFF', label: 'IMAGE / HEADLINE' },
        { h: 15, bg: '#E60012', label: 'EYEBROW' },
        { h: 25, bg: '#231815', label: 'FOOTER',  ink: '#fff' },
      ],
    },
    {
      id: 'mc',
      name: 'MedicomteK',
      zones: [
        { h: 65, bg: '#FFFFFF', label: 'CONTENT' },
        { h: 15, bg: '#036EB8', label: 'ACCENT' },
        { h: 20, bg: '#231815', label: 'FOOTER', ink: '#fff' },
      ],
    },
    {
      id: 'bd',
      name: 'Beauty\u2009&\u2009Derma',
      zones: [
        { h: 25, bg: '#BAB1D7', label: 'SOFT BG' },
        { h: 60, bg: '#FFFFFF', label: 'CONTENT' },
        { h: 10, bg: '#5D3B8B', label: 'HEADLINE', ink: '#fff' },
        { h:  5, bg: '#231815', label: '',         ink: '#fff' },
      ],
    },
    {
      id: 'in',
      name: 'INSPIRE',
      zones: [
        { h: 50, bg: '#595757', label: 'SURFACE',     ink: '#fff' },
        { h: 35, bg: '#FFFFFF', label: 'CONTENT CARD' },
        { h: 15, bg: '#BFD633', label: 'CTA' },
      ],
    },
  ];
  const mocks = allMocks.filter(m => m.id === brand);

  return (
    <div id="cp-mocks" className="subsection">
      <h3>04.3 — Application examples</h3>
      <p className="desc">
        How each proportion looks in a real layout. Zones are abstract — the
        idea is the proportional rhythm, not the content.
      </p>
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
  // KIMES base: 60 / 25 / 15 (white / black / red)
  // We vary the red percentage and rebalance the rest.
  const examples = [
    { pct: 12, ok: true,  note: 'Within range — slightly understated' },
    { pct: 18, ok: true,  note: 'Within range — slightly emphasized' },
    { pct:  5, ok: false, note: 'Too little — looks generic, no brand presence' },
    { pct: 45, ok: false, note: 'Too much — feels aggressive, off-brand' },
  ];
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
      <h3>04.4 — Acceptable deviation</h3>
      <div className="cp-rule">
        <p>
          These proportions are recommendations, not strict ratios. Acceptable
          deviation is <strong>±5% per color</strong>.
        </p>
        <ul>
          <li>Designs that drop the brand color below <strong>10%</strong> lose brand recognition.</li>
          <li>Designs that exceed <strong>30%</strong> feel aggressive and off-brand.</li>
        </ul>
      </div>
      <div className="cp-dev-grid">
        {examples.map(e => (
          <div className={`cp-dev-card ${e.ok ? 'ok' : 'bad'}`} key={e.pct}>
            <div className="cp-dev-head">
              <span className={`verdict ${e.ok ? 'ok' : 'avoid'}`}>{e.ok ? '✓' : '✗'}</span>
              <span className="cp-dev-pct">{e.pct}% red</span>
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
  // Mini-mocks demonstrating each wrong proportion. Use abstract zones.
  const items = [
    {
      id: 'equal',
      ko: '균등 분할',
      en: 'Equal split (33/33/33)',
      sub: 'No hierarchy, brand identity diluted',
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
      zones: [
        { h: 70, bg: '#FFFFFF' },
        { h: 27, bg: '#231815' },
        { h:  3, bg: '#E60012' },
      ],
    },
  ];
  return (
    <div id="cp-donts" className="subsection">
      <h3>04.5 — Don&rsquo;ts</h3>
      <p className="desc">
        Four common proportion mistakes. None of these read as on-brand —
        each breaks the recommended hierarchy in a different way.
      </p>
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
              <span className="vlabel">{item.ko}</span>
              <span className="vdesc">{item.en}</span>
              <span className="vdesc">{item.sub}</span>
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

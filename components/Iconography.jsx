/* eslint-disable */
const useSectionContent = window.useSectionContent;

/**
 * Iconography — section 11.
 *
 * Six subsections: construction, 14 KIMES exhibition categories,
 * UI utility icons, color application, sizing scale, don'ts.
 *
 * All icons are inline SVG drawn on a 24×24 grid with stroke="currentColor"
 * and stroke-width="1.5" — the brand standard. They inherit color from
 * their parent context.
 */

/* ============================================================
   Icon primitives
   ============================================================ */

// Single icon component — wraps SVG props consistently.
function Ic({ size = 24, children, style, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ============================================================
   14 official KIMES category icons
   Each on a 24×24 grid, 1px inner padding (22×22 visual).
   ============================================================ */

const CATEGORY_ICONS = {
  // 01 — 영상진단기기 (Imaging) — radiograph / chest x-ray frame
  imaging: (
    <Ic>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M12 7v10" />
      <path d="M9 9c1 1.5 1 4.5 0 6" />
      <path d="M15 9c-1 1.5-1 4.5 0 6" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </Ic>
  ),

  // 02 — 진찰 및 진단 (Examination) — stethoscope
  stethoscope: (
    <Ic>
      <path d="M5 3v6a4 4 0 0 0 8 0V3" />
      <path d="M5 3h2" />
      <path d="M11 3h2" />
      <path d="M9 13v2.5a4.5 4.5 0 0 0 9 0V12" />
      <circle cx="18" cy="10" r="2" />
    </Ic>
  ),

  // 03 — 수술 (Surgery) — scalpel
  scalpel: (
    <Ic>
      <path d="M3 21l8-8" />
      <path d="M11 13l4-10 6 4-10 6z" />
      <path d="M11 13l4 4" />
    </Ic>
  ),

  // 04 — 병원설비 (Hospital equipment) — hospital bed
  hospitalBed: (
    <Ic>
      <path d="M3 18V8" />
      <path d="M3 13h18v5" />
      <path d="M21 18v-2" />
      <circle cx="8" cy="10" r="2" />
      <path d="M11 13v-3h7a2 2 0 0 1 2 2v1" />
    </Ic>
  ),

  // 05 — 피부미용 (Beauty / dermatology) — droplet on face
  beauty: (
    <Ic>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8c-1.5 1.8-2.5 3.2-2.5 4.5a2.5 2.5 0 0 0 5 0c0-1.3-1-2.7-2.5-4.5z" />
      <path d="M9 16c1 .8 4 .8 6 0" />
    </Ic>
  ),

  // 06 — 치료 (Treatment) — pulse / waveform
  treatment: (
    <Ic>
      <path d="M3 12h3l2-5 4 10 2-5h7" />
    </Ic>
  ),

  // 07 — 물리치료/재활 (Rehabilitation) — running figure
  rehab: (
    <Ic>
      <circle cx="14" cy="5" r="1.5" />
      <path d="M9 11l4-2 3 3 3 1" />
      <path d="M9 11l-2 4 3 1 2 5" />
      <path d="M5 19l3-1" />
    </Ic>
  ),

  // 08 — 한의학 (Korean medicine) — acupuncture needle / mortar
  oriental: (
    <Ic>
      <path d="M4 14c0-3 3-6 8-6s8 3 8 6" />
      <path d="M4 14h16" />
      <path d="M7 14v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3" />
      <path d="M12 4v4" />
      <path d="M10 6h4" />
    </Ic>
  ),

  // 09 — 의료 IT (Medical IT) — monitor with pulse line
  medicalIT: (
    <Ic>
      <rect x="3" y="4" width="18" height="13" rx="1" />
      <path d="M7 11h2l1.5-3 2 6 1.5-3h3" />
      <path d="M9 21h6" />
      <path d="M12 17v4" />
    </Ic>
  ),

  // 10 — 부품/소재 (Parts / materials) — gear
  parts: (
    <Ic>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </Ic>
  ),

  // 11 — 일회용 의료용품 (Disposable medical) — syringe
  syringe: (
    <Ic>
      <path d="M16 3l5 5" />
      <path d="M14 5l5 5" />
      <path d="M5 21l-2-2 11-11 4 4-11 11z" />
      <path d="M9 13l2 2" />
    </Ic>
  ),

  // 12 — 서비스/비즈니스 (Services / business) — handshake
  business: (
    <Ic>
      <path d="M3 11l4-4 4 2 2-2 4 1 4 4" />
      <path d="M11 9l3 3a1.5 1.5 0 0 1 0 2l-1 1a1.5 1.5 0 0 1-2 0l-2-2" />
      <path d="M9 13l2 2" />
      <path d="M3 11l3 8" />
      <path d="M21 12l-3 7" />
    </Ic>
  ),

  // 13 — 임상/검사 (Clinical / lab) — test tubes
  lab: (
    <Ic>
      <path d="M8 3v10a3 3 0 0 0 6 0V3" />
      <path d="M7 3h8" />
      <path d="M8 9h6" />
      <path d="M16 21h5" />
      <path d="M18.5 21V11" />
      <path d="M17 11h3" />
    </Ic>
  ),

  // 14 — 바이오/제약 (Bio / pharma) — capsule
  pharma: (
    <Ic>
      <path d="M5 14l9-9a4.95 4.95 0 0 1 7 7l-9 9a4.95 4.95 0 0 1-7-7z" />
      <path d="M9.5 9.5l5 5" />
    </Ic>
  ),
};

const CATEGORIES = [
  { num: '01', key: 'imaging',       ko: '영상진단기기 및 용품',     en: 'Imaging diagnostics' },
  { num: '02', key: 'stethoscope',   ko: '진찰 및 진단 관련기기',     en: 'Examination & diagnosis' },
  { num: '03', key: 'scalpel',       ko: '수술 관련 기기',           en: 'Surgical instruments' },
  { num: '04', key: 'hospitalBed',   ko: '병원설비 및 응급장비',     en: 'Hospital & emergency' },
  { num: '05', key: 'beauty',        ko: '피부미용 / 뷰티케어',      en: 'Beauty & skincare' },
  { num: '06', key: 'treatment',     ko: '치료 관련 기기',           en: 'Therapeutic devices' },
  { num: '07', key: 'rehab',         ko: '물리치료 / 재활 / 예방',    en: 'Rehabilitation' },
  { num: '08', key: 'oriental',      ko: '한의학 관련',              en: 'Oriental medicine' },
  { num: '09', key: 'medicalIT',     ko: '의료 IT 시스템',           en: 'Medical IT systems' },
  { num: '10', key: 'parts',         ko: '부품 / 소재',              en: 'Parts & materials' },
  { num: '11', key: 'syringe',       ko: '일회용 의료용품',          en: 'Disposable supplies' },
  { num: '12', key: 'business',      ko: '서비스 및 비즈니스',       en: 'Services & business' },
  { num: '13', key: 'lab',           ko: '임상 및 검사',             en: 'Clinical & testing' },
  { num: '14', key: 'pharma',        ko: '바이오 / 제약',            en: 'Bio & pharmaceuticals' },
];

/* ============================================================
   Utility icons
   ============================================================ */

const UTILITY_ICONS = {
  search:      <Ic><circle cx="11" cy="11" r="6" /><path d="M16 16l4 4" /></Ic>,
  menu:        <Ic><path d="M4 6h16M4 12h16M4 18h16" /></Ic>,
  close:       <Ic><path d="M5 5l14 14M19 5L5 19" /></Ic>,
  arrowRight:  <Ic><path d="M5 12h14M13 5l7 7-7 7" /></Ic>,
  download:    <Ic><path d="M12 4v12M6 10l6 6 6-6" /><path d="M5 20h14" /></Ic>,
  calendar:    <Ic><rect x="3" y="5" width="18" height="16" rx="1" /><path d="M3 9h18M8 3v4M16 3v4" /></Ic>,
  location:    <Ic><path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></Ic>,
  mail:        <Ic><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 7l9 6 9-6" /></Ic>,
  filter:      <Ic><path d="M3 5h18l-7 8v6l-4 2v-8L3 5z" /></Ic>,
  check:       <Ic><path d="M4 12l5 5L20 6" /></Ic>,
};

const UTILITIES = [
  { key: 'search',     label: 'search' },
  { key: 'menu',       label: 'menu' },
  { key: 'close',      label: 'close' },
  { key: 'arrowRight', label: 'arrow-right' },
  { key: 'download',   label: 'download' },
  { key: 'calendar',   label: 'calendar' },
  { key: 'location',   label: 'location' },
  { key: 'mail',       label: 'mail' },
  { key: 'filter',     label: 'filter' },
  { key: 'check',      label: 'check' },
];

/* ============================================================
   11.1 — Construction principles
   ============================================================ */
function Construction() {
  // Demo icon (stethoscope) drawn on a visible 24×24 grid.
  return (
    <div id="ic-construction" className="subsection">
      <h3>11.1 — Construction principles</h3>
      <p className="desc">
        All KIMES icons share one geometry: a 24×24 grid, 1.5px stroke,
        rounded caps and joins, single-color via <code>currentColor</code>.
      </p>

      <div className="ic-construct">
        <div className="ic-construct-stage">
          <svg viewBox="0 0 24 24" width="280" height="280" className="ic-grid-svg">
            {/* gridlines: 24 columns / rows at 1px each */}
            <g stroke="#E1E5EA" strokeWidth="0.05" fill="none">
              {[...Array(25)].map((_, i) => (
                <line key={`v${i}`} x1={i} y1="0" x2={i} y2="24" />
              ))}
              {[...Array(25)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i} x2="24" y2={i} />
              ))}
              {/* major guides at 1px padding edge */}
              <rect x="1" y="1" width="22" height="22" stroke="#FCA5A5" strokeWidth="0.08" strokeDasharray="0.4,0.3" fill="none" />
            </g>
            {/* the icon itself — stethoscope */}
            <g stroke="#231815" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M5 3v6a4 4 0 0 0 8 0V3" />
              <path d="M5 3h2" />
              <path d="M11 3h2" />
              <path d="M9 13v2.5a4.5 4.5 0 0 0 9 0V12" />
              <circle cx="18" cy="10" r="2" />
            </g>
          </svg>
          <div className="ic-construct-axes">
            <span className="x-label">24</span>
            <span className="y-label">24</span>
          </div>
        </div>

        <div className="ic-construct-spec">
          <table className="ic-spec-table">
            <tbody>
              <tr><th>Grid</th><td>24×24 (scalable to any size)</td></tr>
              <tr><th>Stroke</th><td>1.5px · rounded caps and joins</td></tr>
              <tr><th>Style</th><td>Outline default · filled for active state</td></tr>
              <tr><th>Color</th><td><code>currentColor</code> — inherits from parent</td></tr>
              <tr><th>Padding</th><td>1px on all sides (22×22 visual area)</td></tr>
              <tr><th>Corners</th><td>Rounded — match overall geometry</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   11.2 — 14 official categories
   ============================================================ */
function CategoryIcons() {
  return (
    <div id="ic-categories" className="subsection">
      <h3>11.2 — Exhibition category icons</h3>
      <p className="desc">
        KIMES 2026 spans 14 official exhibition categories. Each has a
        dedicated icon used on signage, floor plans, the website, and the
        printed catalog index.
      </p>
      <div className="ic-cat-grid">
        {CATEGORIES.map(c => (
          <div className="ic-cat-tile" key={c.key}>
            <div className="ic-cat-num">{c.num}</div>
            <div className="ic-cat-art">
              {React.cloneElement(CATEGORY_ICONS[c.key], { size: 48 })}
            </div>
            <div className="ic-cat-meta">
              <div className="ic-cat-ko">{c.ko}</div>
              <div className="ic-cat-en">{c.en}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   11.3 — UI utility icons
   ============================================================ */
function UtilityIcons() {
  return (
    <div id="ic-utility" className="subsection">
      <h3>11.3 — UI utility icons</h3>
      <p className="desc">
        Ten utility icons cover the most common interface affordances —
        search, navigation, action, and feedback. Same construction rules
        as category icons.
      </p>
      <div className="ic-util-grid">
        {UTILITIES.map(u => (
          <div className="ic-util-tile" key={u.key}>
            <div className="ic-util-art">
              {React.cloneElement(UTILITY_ICONS[u.key], { size: 32 })}
            </div>
            <div className="ic-util-name">{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   11.4 — Color application
   ============================================================ */
function ColorApplication() {
  const samples = [
    { label: 'Default text',       color: '#231815', bg: '#fff' },
    { label: 'Muted gray K40',     color: '#A7A9AC', bg: '#fff' },
    { label: 'KIMES Red',          color: '#E60012', bg: '#fff' },
    { label: 'MedicomteK Blue',    color: '#036EB8', bg: '#fff' },
    { label: 'White on KIMES Red', color: '#fff',    bg: '#E60012' },
  ];
  return (
    <div id="ic-color" className="subsection">
      <h3>11.4 — Color application</h3>
      <p className="desc">
        Icons inherit color from their parent text or active brand theme.
        No gradients, shadows, or multi-color fills.
      </p>
      <div className="ic-color-grid">
        {samples.map((s, i) => (
          <div className="ic-color-tile" key={i}>
            <div className="ic-color-stage" style={{ background: s.bg, color: s.color }}>
              {React.cloneElement(UTILITY_ICONS.search, { size: 32 })}
            </div>
            <div className="ic-color-meta">
              <div className="ic-color-name">{s.label}</div>
              <div className="ic-color-hex mono">{s.color}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="ic-color-rule">
        Rule — single-color fill via <code>currentColor</code>. No gradients,
        no shadows, no multi-color illustration.
      </div>
    </div>
  );
}

/* ============================================================
   11.5 — Sizing scale
   ============================================================ */
function SizingScale() {
  const sizes = [
    { px: 16, use: 'Inline with body text' },
    { px: 20, use: 'Inline with larger text / buttons' },
    { px: 24, use: 'Default — buttons, navigation' },
    { px: 32, use: 'Section headers' },
    { px: 48, use: 'Category cards' },
    { px: 64, use: 'Hero scale' },
  ];
  return (
    <div id="ic-sizing" className="subsection">
      <h3>11.5 — Sizing scale</h3>
      <p className="desc">
        Six standard sizes from inline (16px) to hero (64px+). The same SVG
        scales without retracing — that&rsquo;s the value of the 24×24 grid.
      </p>
      <div className="ic-size-row">
        {sizes.map(s => (
          <div className="ic-size-cell" key={s.px}>
            <div className="ic-size-stage" style={{ height: 80 }}>
              {React.cloneElement(CATEGORY_ICONS.stethoscope, { size: s.px })}
            </div>
            <div className="ic-size-meta">
              <div className="ic-size-px mono">{s.px}px</div>
              <div className="ic-size-use">{s.use}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   11.6 — Don'ts
   ============================================================ */
function IconDonts() {
  // Stethoscope render with a deliberately wrong styling per cell.
  const items = [
    {
      label: 'Gradient on icon',
      desc: 'Single-color fill only.',
      art: () => (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="iconGrBad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E60012" />
              <stop offset="100%" stopColor="#036EB8" />
            </linearGradient>
          </defs>
          <g stroke="url(#iconGrBad)">
            <path d="M5 3v6a4 4 0 0 0 8 0V3" />
            <path d="M5 3h2" />
            <path d="M11 3h2" />
            <path d="M9 13v2.5a4.5 4.5 0 0 0 9 0V12" />
            <circle cx="18" cy="10" r="2" />
          </g>
        </svg>
      ),
    },
    {
      label: 'Drop shadow',
      desc: 'Icons are flat — no shadows.',
      art: () => (
        <div style={{ filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.4))', color: '#231815' }}>
          {React.cloneElement(CATEGORY_ICONS.stethoscope, { size: 56 })}
        </div>
      ),
    },
    {
      label: 'Mixing outline + filled',
      desc: 'Pick one style per surface.',
      art: () => (
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', color: '#231815' }}>
          {React.cloneElement(CATEGORY_ICONS.stethoscope, { size: 36 })}
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#231815" stroke="none" aria-hidden="true">
            <path d="M5 3h-2v6a6 6 0 0 0 5 5.9v.1a5 5 0 0 0 5 5 5 5 0 0 0 5-5v-3.1a3 3 0 1 0-2 0V15a3 3 0 0 1-3 3 3 3 0 0 1-3-3v-.1a6 6 0 0 0 5-5.9V3h-2v6a4 4 0 0 1-8 0V3z" />
          </svg>
        </div>
      ),
    },
    {
      label: 'Multi-color fill',
      desc: 'One color per icon, ever.',
      art: () => (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 3v6a4 4 0 0 0 8 0V3" stroke="#E60012" />
          <path d="M5 3h2" stroke="#036EB8" />
          <path d="M11 3h2" stroke="#5D3B8B" />
          <path d="M9 13v2.5a4.5 4.5 0 0 0 9 0V12" stroke="#BFD633" />
          <circle cx="18" cy="10" r="2" stroke="#231815" />
        </svg>
      ),
    },
    {
      label: 'Stretched non-uniformly',
      desc: 'Always preserve the 1:1 aspect.',
      art: () => (
        <div style={{ transform: 'scaleX(1.6)', color: '#231815' }}>
          {React.cloneElement(CATEGORY_ICONS.stethoscope, { size: 56 })}
        </div>
      ),
    },
    {
      label: 'Below 16px size',
      desc: 'Strokes break and detail disappears.',
      art: () => (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, color: '#231815' }}>
          {React.cloneElement(CATEGORY_ICONS.stethoscope, { size: 10 })}
          {React.cloneElement(CATEGORY_ICONS.stethoscope, { size: 12 })}
        </div>
      ),
    },
  ];
  return (
    <div id="ic-donts" className="subsection">
      <h3>11.6 — Don&rsquo;ts</h3>
      <p className="desc">
        Six common mistakes. Stay flat, stay single-color, stay 16px+.
      </p>
      <div className="ic-donts-grid">
        {items.map(it => (
          <div className="ic-dont-cell" key={it.label}>
            <span className="tu-dont-x">✗</span>
            <div className="ic-dont-stage">{it.art()}</div>
            <div className="ic-dont-meta">
              <div className="vlabel">{it.label}</div>
              <div className="vdesc">{it.desc}</div>
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
function Iconography() {
  const c = useSectionContent('iconography');
  return (
    <section id="iconography" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <Construction />
      <CategoryIcons />
      <UtilityIcons />
      <ColorApplication />
      <SizingScale />
      <IconDonts />
    </section>
  );
}

window.Iconography = Iconography;
window.KimesIcons = { CATEGORY_ICONS, UTILITY_ICONS, CATEGORIES, UTILITIES };

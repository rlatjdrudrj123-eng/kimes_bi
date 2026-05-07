/* eslint-disable */
const useSectionContent = window.useSectionContent;
const useBrandFilter    = window.useBrandFilter;
const useSiteLang       = window.useSiteLang;

/**
 * Logo rules — slimmed-down usage guide.
 *
 * Four subsections:
 *   06.1  Clear space & minimum size  (4 brands, one example each)
 *   06.2  Background usage            (Quick reference table + 4×3 brand × context grid)
 *   06.3  Photographic backgrounds    (3 example scenarios)
 *   06.4  Misuse                      (12-cell don't grid using CSS transforms on KIMES SVG)
 */

const LBG_BRANDS = [
  {
    id: 'kimes', name: 'KIMES', color: '#E60012',
    full: 'kimes',  white: 'kimesWhite', h: 26,
  },
  {
    id: 'mc', name: 'MedicomteK', color: '#005BAC',
    full: 'mc',     white: 'mcWhite', h: 18,
  },
  {
    id: 'bd', name: 'Beauty\u2009&\u2009Derma', color: '#5D3B8B',
    full: 'bdSeoul', white: 'bdWhite', h: 12,
  },
  {
    id: 'in', name: 'INSPIRE Digital Health', color: '#595757',
    full: 'inTagline', white: 'inLimeTagline', h: 18,
  },
];

/* ============================================================
   06.1 — Clear space & minimum size
   ============================================================ */
function ClearSpaceAndMin() {
  const brand = useBrandFilter();
  const c = useSectionContent('logo-rules');
  const sub = (c.subsections && c.subsections.clearSpace) || {};
  const lang = useSiteLang();
  // Per-brand first-letter cap-height ratio (clear space = 1× of that letter).
  const allExamples = [
    { id: 'kimes', name: 'KIMES',          svg: 'kimes',     min: '80px / 24mm',  h: 36, anchor: 'cap-height of K', krAnchor: 'K의 cap-height' },
    { id: 'mc',    name: 'MedicomteK',     svg: 'mc',        min: '120px / 30mm', h: 24, anchor: 'cap-height of M', krAnchor: 'M의 cap-height' },
    { id: 'bd',    name: 'Beauty&Derma',   svg: 'bdSeoul',   min: '140px / 36mm', h: 14, anchor: 'cap-height of b', krAnchor: 'b의 cap-height' },
    { id: 'in',    name: 'INSPIRE',        svg: 'inTagline', min: '160px / 40mm', h: 22, anchor: 'cap-height of I', krAnchor: 'I의 cap-height' },
  ];
  const examples = allExamples.filter(e => e.id === brand);
  return (
    <div id="logo-rules-clearspace" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="rules-clearspace-grid">
        {examples.map(e => (
          <div className="rules-cs-card" key={e.id}>
            <div className="rules-cs-stage">
              <span className="cs-bracket cs-tl" aria-hidden="true"></span>
              <span className="cs-bracket cs-tr" aria-hidden="true"></span>
              <span className="cs-bracket cs-bl" aria-hidden="true"></span>
              <span className="cs-bracket cs-br" aria-hidden="true"></span>
              <div className="rules-cs-art">
                <InlineLogo name={e.svg} height={e.h} ariaLabel={e.name} />
              </div>
            </div>
            <div className="rules-cs-meta">
              <span className="vlabel">{e.name}</span>
              <span className="vdesc">{sub.clearSpaceLabel} {lang === 'ko' && e.krAnchor ? e.krAnchor : e.anchor}</span>
              <span className="vdesc">{sub.minSizeLabel} {e.min}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   06.2 — Background usage
   ============================================================ */
function BackgroundUsage() {
  const brand = useBrandFilter();
  const lang  = useSiteLang();
  const ROWS = [
    { bg: 'Light solid (0–30%)',     krBg: '밝은 단색 (0–30%)',     logo: 'Full color',                 krLogo: '풀 컬러',                   v: 'ok' },
    { bg: 'Mid-tone (40–60%)',       krBg: '중간 톤 (40–60%)',      logo: 'Avoid — request approval',   krLogo: '회피 — 사전 승인 요청',     v: 'avoid' },
    { bg: 'Dark solid (70–100%)',    krBg: '어두운 단색 (70–100%)', logo: 'White reversed',             krLogo: '화이트 반전',               v: 'ok' },
    { bg: "Brand's own color",       krBg: '브랜드 자체 색',         logo: 'White reversed',             krLogo: '화이트 반전',               v: 'ok' },
    { bg: 'One-color print (light)', krBg: '단색 인쇄 (밝은)',       logo: 'Full black',                 krLogo: '풀 블랙',                   v: 'ok' },
    { bg: 'Subordinate context',     krBg: '하위 컨텍스트',          logo: 'Gray K40',                   krLogo: '그레이 K40',                v: 'ok' },
    { bg: 'Dark photo',              krBg: '어두운 사진',            logo: 'White reversed',             krLogo: '화이트 반전',               v: 'ok' },
    { bg: 'Light photo',             krBg: '밝은 사진',              logo: 'Full color',                 krLogo: '풀 컬러',                   v: 'ok' },
    { bg: 'Busy photo',              krBg: '복잡한 사진',            logo: 'Place on solid plate first', krLogo: '먼저 단색 플레이트 위에',  v: 'avoid' },
  ];
  const c = useSectionContent('logo-rules');
  const sub = (c.subsections && c.subsections.background) || {};
  const headers = sub.headers || {};
  return (
    <div id="logo-rules-bg" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>

      <div className="lbg-quickref-wrap">
        <table className="lbg-quickref">
          <thead>
            <tr>
              <th>{headers.bg}</th>
              <th>{headers.logo}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(r => (
              <tr key={r.bg}>
                <td>{lang === 'ko' && r.krBg ? r.krBg : r.bg}</td>
                <td>{lang === 'ko' && r.krLogo ? r.krLogo : r.logo}</td>
                <td><span className={`verdict ${r.v}`}>{r.v === 'ok' ? '✓' : '✗'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rules-bg-matrix">
        <div className="rules-bg-mxhead">
          <span></span>
          <span className="head-label">White</span>
          <span className="head-label">Black</span>
          <span className="head-label">Brand color</span>
        </div>
        {LBG_BRANDS.filter(b => b.id === brand).map(b => (
          <div className="rules-bg-mxrow" key={b.id}>
            <div className="rules-bg-mxlabel">
              <span className="dot" style={{ background: b.color }}></span>
              <span>{b.name}</span>
            </div>
            <div className="rules-bg-cell" style={{ background: '#fff' }}>
              <InlineLogo name={b.full} height={b.h} ariaLabel={`${b.name} on white`} />
            </div>
            <div className="rules-bg-cell" style={{ background: '#000' }}>
              <InlineLogo name={b.white} height={b.h} ariaLabel={`${b.name} on black`} />
            </div>
            <div className="rules-bg-cell" style={{ background: b.color }}>
              <InlineLogo name={b.white} height={b.h} ariaLabel={`${b.name} on brand color`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   06.3 — Photographic backgrounds
   ============================================================ */
function PhotographicUsage() {
  const brand = useBrandFilter();
  // The photo demos use KIMES wordmarks. Skip on co-event pages until per-
  // brand photo examples exist.
  if (brand !== 'kimes') return null;
  const c = useSectionContent('logo-rules');
  const sub = (c.subsections && c.subsections.photographic) || {};
  const lang = useSiteLang();
  const cases = [
    { id: 'light', label: 'Light / uncluttered', krLabel: '밝은 / 단순',  verdict: 'ok',    rule: 'Full color logo',                       krRule: '풀 컬러 로고',                cls: 'photo-light' },
    { id: 'busy',  label: 'Busy / complex',      krLabel: '복잡한',        verdict: 'avoid', rule: 'Place on a solid color plate first',   krRule: '먼저 단색 플레이트 위에 배치', cls: 'photo-busy'  },
    { id: 'dark',  label: 'Dark / low-key',      krLabel: '어두운',        verdict: 'ok',    rule: 'White reversed logo',                  krRule: '화이트 반전 로고',            cls: 'photo-dark'  },
  ];
  return (
    <div id="logo-rules-photo" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="lbg-photo-row">
        {cases.map(c => (
          <div key={c.id} className={`lbg-photo-card ${c.verdict}`}>
            <div className={`lbg-photo-stage ${c.cls}`}>
              <span className="lbg-photo-tag">{lang === 'ko' ? '사진 — ' : 'PHOTO — '}{(lang === 'ko' && c.krLabel ? c.krLabel : c.label).toUpperCase()}</span>
              {c.id !== 'busy' && (
                <div className="lbg-photo-logo">
                  <InlineLogo
                    name={c.id === 'dark' ? 'kimesWhite' : 'kimes'}
                    height={28}
                    ariaLabel="KIMES on photo"
                  />
                </div>
              )}
              {c.id === 'busy' && (
                <div className="lbg-photo-strike"><span>✗</span></div>
              )}
            </div>
            <div className="lbg-photo-meta">
              <span className={`verdict ${c.verdict}`}>
                {c.verdict === 'ok' ? sub.allowedLabel : sub.avoidLabel}
              </span>
              <span className="vlabel">{lang === 'ko' && c.krLabel ? c.krLabel : c.label}</span>
              <span className="vdesc">{lang === 'ko' && c.krRule ? c.krRule : c.rule}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   06.4 — Misuse
   ============================================================ */
function Misuse() {
  const brand = useBrandFilter();
  // The misuse grid uses KIMES SVG with CSS transforms. Skip on co-events
  // until per-brand misuse demos exist.
  if (brand !== 'kimes') return null;
  const c = useSectionContent('logo-rules');
  const sub = (c.subsections && c.subsections.misuse) || {};
  const lang = useSiteLang();
  // Each entry renders the KIMES primary SVG with one CSS treatment that
  // demonstrates an incorrect modification.
  const items = [
    {
      id: 'recolor',
      ko: '색상 변경',
      en: 'Color change',
      render: () => (
        <span style={{ filter: 'hue-rotate(110deg) saturate(1.4)' }}>
          <InlineLogo name="kimes" height={28} />
        </span>
      ),
    },
    {
      id: 'no-cut',
      ko: '슬래시 컷 제거',
      en: 'Slash-cut removed',
      render: () => (
        // Cover the slash-cut triangle with a solid red patch, leaving a
        // plain rectangular i-stem.
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <InlineLogo name="kimes" height={28} />
          <span aria-hidden="true" style={{
            position: 'absolute',
            left: '23.4%', top: 0,
            width: '5.8%', height: '24%',
            background: '#E60012',
          }}/>
        </div>
      ),
    },
    {
      id: 'stretch-x',
      ko: '가로 늘림',
      en: 'Stretched horizontally',
      render: () => (
        <span style={{ display: 'inline-block', transform: 'scaleX(1.45)', transformOrigin: 'center' }}>
          <InlineLogo name="kimes" height={26} />
        </span>
      ),
    },
    {
      id: 'stretch-y',
      ko: '세로 늘림',
      en: 'Stretched vertically',
      render: () => (
        <span style={{ display: 'inline-block', transform: 'scaleY(1.6)', transformOrigin: 'center' }}>
          <InlineLogo name="kimes" height={22} />
        </span>
      ),
    },
    {
      id: 'shadow',
      ko: '그림자 효과',
      en: 'Drop shadow',
      render: () => (
        <span style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.45))' }}>
          <InlineLogo name="kimes" height={28} />
        </span>
      ),
    },
    {
      id: 'outline',
      ko: '외곽선 추가',
      en: 'Outline added',
      render: () => (
        <span style={{ filter: 'drop-shadow(1px 0 0 #000) drop-shadow(-1px 0 0 #000) drop-shadow(0 1px 0 #000) drop-shadow(0 -1px 0 #000)' }}>
          <InlineLogo name="kimes" height={28} />
        </span>
      ),
    },
    {
      id: 'rotate',
      ko: '회전',
      en: 'Rotated',
      render: () => (
        <span style={{ display: 'inline-block', transform: 'rotate(15deg)' }}>
          <InlineLogo name="kimes" height={28} />
        </span>
      ),
    },
    {
      id: 'bevel',
      ko: '입체 효과',
      en: '3D / bevel effect',
      render: () => (
        <span style={{
          filter: 'drop-shadow(1px 1px 0 rgba(255,255,255,0.9)) drop-shadow(2px 3px 4px rgba(0,0,0,0.4))',
        }}>
          <InlineLogo name="kimes" height={28} />
        </span>
      ),
    },
    {
      id: 'gradient',
      ko: '그라데이션',
      en: 'Gradient fill',
      render: () => (
        <span style={{
          display: 'inline-block',
          background: 'linear-gradient(90deg, #E60012, #FFAB00, #6B40D1)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          // Using brightness 0 + invert via mask isn't trivial here; fall back
          // to overlaying the gradient through mix-blend-mode
        }}>
          <span style={{ filter: 'saturate(0) brightness(0)', mixBlendMode: 'lighten' }}>
            <InlineLogo name="kimes" height={28} />
          </span>
          <span style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, #E60012, #FFAB00, #6B40D1)',
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
          }}/>
        </span>
      ),
    },
    {
      id: 'badge',
      ko: '원형 배지',
      en: 'Inside a badge',
      render: () => (
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 92, height: 92, borderRadius: '50%',
          background: '#F5F5F5',
          border: '2px solid #E60012',
        }}>
          <InlineLogo name="kimes" height={20} />
        </span>
      ),
    },
    {
      id: 'cut-recolor',
      ko: '슬래시 컷 색상 변경',
      en: 'Slash-cut recolored',
      render: () => (
        // Cover the black slash-cut triangle with a different color.
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <InlineLogo name="kimes" height={28} />
          <span aria-hidden="true" style={{
            position: 'absolute',
            left: '23.4%', top: 0,
            width: '5.8%', height: '14%',
            background: '#FFAB00',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 50%)',
          }}/>
        </div>
      ),
    },
    {
      id: 'retype',
      ko: '활자체 재조판',
      en: 'Re-typeset in plain font',
      render: () => (
        <span style={{
          fontFamily: 'Montserrat, system-ui, sans-serif',
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: '0.02em',
          color: '#231815',
        }}>KIMES</span>
      ),
    },
  ];

  return (
    <div id="logo-rules-misuse" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="rules-misuse-grid">
        {items.map(item => (
          <div className="rules-misuse-cell" key={item.id}>
            <span className="misuse-x" aria-hidden="true">✗</span>
            <div className="rules-misuse-art">{item.render()}</div>
            <div className="rules-misuse-meta">
              <span className="vlabel">{lang === 'ko' ? item.ko : item.en}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="rules-misuse-callout">
        <p>
          {sub.calloutKr}
          <br />
          <em>{sub.calloutEn}</em>
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Page wrapper
   ============================================================ */
function LogoRules() {
  const c = useSectionContent('logo-rules');
  return (
    <section id="logo-rules" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <ClearSpaceAndMin />
      <BackgroundUsage />
      <PhotographicUsage />
      <Misuse />
    </section>
  );
}

// Keep the previous export name for back-compat, plus the new name.
Object.assign(window, { LogoRules, LogoOnBackgrounds: LogoRules });

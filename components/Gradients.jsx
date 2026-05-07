/* eslint-disable */
const useSectionContent = window.useSectionContent;
const useBrandFilter    = window.useBrandFilter;
const useSiteLang       = window.useSiteLang;

/**
 * Gradients — section 05.
 * Digital-only auxiliary surface treatment.
 *
 * Five subsections: brand gradient set, application examples,
 * allowed contexts, don'ts.
 */

const GR_BRANDS = [
  {
    key: 'kimes',
    label: 'KIMES Gradient',
    dot: '#E60012',
    css: 'linear-gradient(135deg, #E60012 0%, #231815 100%)',
    desc: 'Red to Black, 135°. Use behind dark hero sections — adds depth without overpowering the wordmark.',
    krDesc: '레드 → 블랙, 135°. 다크 히어로 섹션 뒤에 사용 — 워드마크를 압도하지 않으면서 깊이감 부여.',
    krHeadline: '한국 최대 의료 전시회',
    krCta: '사전등록',
    logoWhite: 'kimesWhite',
    headline: 'Korea\u2019s largest medical exhibition',
    cta: 'Register now',
  },
  {
    key: 'mc',
    label: 'MedicomteK Gradient',
    dot: '#036EB8',
    css: 'linear-gradient(135deg, #036EB8 0%, #042C53 100%)',
    desc: 'Blue to Deep Navy, 135°. Use for tech and digital surfaces — webinars, system pages, product video.',
    krDesc: '블루 → 딥 네이비, 135°. 테크·디지털 표면용 — 웨비나, 시스템 페이지, 제품 영상.',
    krHeadline: '의료 혁신을 연결합니다',
    krCta: '플랫폼 둘러보기',
    logoWhite: 'mcWhite',
    headline: 'Connecting medical innovation',
    cta: 'Explore platform',
  },
  {
    key: 'bd',
    label: 'Beauty&Derma Gradient',
    dot: '#5D3B8B',
    css: 'linear-gradient(135deg, #5D3B8B 0%, #BAB1D7 100%)',
    desc: 'Deep Purple to Light Purple, 135°. Use for soft, elegant surfaces — campaign covers, treatment pages.',
    krDesc: '딥 퍼플 → 라이트 퍼플, 135°. 부드럽고 우아한 표면용 — 캠페인 커버, 시술 안내 페이지.',
    krHeadline: '뷰티, 과학을 만나다',
    krCta: '더 알아보기',
    logoWhite: 'bdWhite',
    headline: 'Beauty meets science',
    cta: 'Learn more',
  },
  {
    key: 'in',
    label: 'INSPIRE Gradient',
    dot: '#BFD633',
    css: 'linear-gradient(135deg, #595757 0%, #BFD633 100%)',
    desc: 'Gray to Lime, 135°. Use for innovation and digital surfaces — startup features, lab content.',
    krDesc: '그레이 → 라임, 135°. 이노베이션·디지털 표면용 — 스타트업 피처, 랩 콘텐츠.',
    krHeadline: '헬스가 이노베이션을 만나는 곳',
    krCta: '함께하기',
    logoWhite: 'inLimeTagline',
    headline: 'Where health meets innovation',
    cta: 'Get involved',
  },
];

/* ============================================================
   05.1 — Brand gradient set
   ============================================================ */
function GradientSet() {
  const brand = useBrandFilter();
  const lang  = useSiteLang();
  const c = useSectionContent('gradients');
  const sub = (c.subsections && c.subsections.set) || {};
  const items = GR_BRANDS.filter(b => b.key === brand);
  return (
    <div id="gr-set" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="gr-set-grid">
        {items.map(b => (
          <div className="gr-card" key={b.key}>
            <div className="gr-block" style={{ background: b.css }}>
              <span className="gr-block-tag">135°</span>
            </div>
            <div className="gr-card-meta">
              <div className="gr-card-head">
                <span className="al-dot" style={{ background: b.dot }} aria-hidden="true"></span>
                <span className="gr-card-label">{b.label}</span>
              </div>
              <code className="gr-css">{b.css}</code>
              <p className="gr-card-desc">{lang === 'ko' && b.krDesc ? b.krDesc : b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   05.2 — Application examples (4 web-hero mocks)
   ============================================================ */
function GradientApplications() {
  const brand = useBrandFilter();
  const lang  = useSiteLang();
  const c = useSectionContent('gradients');
  const sub = (c.subsections && c.subsections.applications) || {};
  const items = GR_BRANDS.filter(b => b.key === brand);
  return (
    <div id="gr-applications" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="gr-app-grid">
        {items.map(b => (
          <div className="gr-app" key={b.key}>
            <div className="gr-app-stage" style={{ background: b.css }}>
              <div className="gr-app-content">
                <div className="gr-app-logo">
                  <InlineLogo name={b.logoWhite} height={26} />
                </div>
                <div className="gr-app-headline">{lang === 'ko' && b.krHeadline ? b.krHeadline : b.headline}</div>
                <div className="gr-app-cta">
                  <span>{lang === 'ko' && b.krCta ? b.krCta : b.cta}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="gr-app-cap">{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   05.3 — Allowed contexts
   ============================================================ */
const GR_CONTEXTS = [
  { ctx: 'Web hero / landing',          allowed: true,  note: 'Primary surface for gradients' },
  { ctx: 'App splash / background',     allowed: true,  note: 'Behind logo, never on logo' },
  { ctx: 'Video intro / outro',         allowed: true,  note: 'Animate slowly — 4–6s loop' },
  { ctx: 'SNS animated thumbnail',      allowed: true,  note: 'Instagram, LinkedIn, YouTube' },
  { ctx: 'Print poster',                allowed: false, note: 'Flat color only — CMYK reproduction' },
  { ctx: 'Print invitation / brochure', allowed: false, note: 'Flat color only' },
  { ctx: 'Logo background',             allowed: false, note: 'Solid only — see Logo rules' },
  { ctx: 'Business card',               allowed: false, note: 'Flat color only' },
  { ctx: 'Booth signage',               allowed: false, note: 'Flat color only — large-format inkjet' },
  { ctx: 'Email body',                  allowed: false, note: 'Email clients render gradients inconsistently' },
];

function AllowedContexts() {
  const c = useSectionContent('gradients');
  const sub = (c.subsections && c.subsections.contexts) || {};
  const headers = sub.headers || {};
  const rows = c.contexts || [];
  return (
    <div id="gr-contexts" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="gr-ctx-table">
        <div className="gr-ctx-head">
          <span>{headers.context}</span>
          <span>{headers.allowed}</span>
          <span>{headers.note}</span>
        </div>
        {rows.map(r => (
          <div className={`gr-ctx-row ${r.allowed ? 'ok' : 'no'}`} key={r.ctx}>
            <span className="gr-ctx-name">{r.ctx}</span>
            <span className="gr-ctx-allowed">
              <span className={`verdict ${r.allowed ? 'ok' : 'avoid'}`}>{r.allowed ? '✓' : '✗'}</span>
              <span className="gr-ctx-allowed-text">{r.allowed ? sub.yes : sub.no}</span>
            </span>
            <span className="gr-ctx-note">{r.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   05.4 — Don'ts
   ============================================================ */
function GradientDonts() {
  const brand = useBrandFilter();
  // The wrong-gradient examples render KIMES red. Hide on co-events.
  if (brand !== 'kimes') return null;
  const c = useSectionContent('gradients');
  const sub = (c.subsections && c.subsections.donts) || {};
  const donts = c.donts || [];
  return (
    <div id="gr-donts" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="gr-donts-grid">
        <div className="gr-dont-cell">
          <span className="tu-dont-x">✗</span>
          <div className="gr-dont-stage" style={{
            background: 'linear-gradient(135deg, #E60012 0%, #BFD633 50%, #036EB8 100%)',
          }}></div>
          <div className="gr-dont-meta">
            <div className="vlabel">{(donts[0] && donts[0].label) || '3+ colors'}</div>
            <div className="vdesc">{(donts[0] && donts[0].desc) || ''}</div>
          </div>
        </div>

        <div className="gr-dont-cell">
          <span className="tu-dont-x">✗</span>
          <div className="gr-dont-stage" style={{
            background: 'radial-gradient(circle at 30% 30%, #E60012 0%, #231815 80%)',
          }}></div>
          <div className="gr-dont-meta">
            <div className="vlabel">{(donts[1] && donts[1].label) || 'Radial gradient'}</div>
            <div className="vdesc">{(donts[1] && donts[1].desc) || ''}</div>
          </div>
        </div>

        <div className="gr-dont-cell">
          <span className="tu-dont-x">✗</span>
          <div className="gr-dont-stage gr-dont-stage-light">
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: '-0.01em',
              backgroundImage: 'linear-gradient(135deg, #E60012 0%, #231815 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              KIMES 2026
            </span>
          </div>
          <div className="gr-dont-meta">
            <div className="vlabel">{(donts[2] && donts[2].label) || 'Gradient on type'}</div>
            <div className="vdesc">{(donts[2] && donts[2].desc) || ''}</div>
          </div>
        </div>

        <div className="gr-dont-cell">
          <span className="tu-dont-x">✗</span>
          <div className="gr-dont-stage gr-dont-stage-light gr-dont-logo">
            <svg viewBox="0 0 218.94 45.27" height="32" aria-hidden="true">
              <defs>
                <linearGradient id="grBadLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E60012" />
                  <stop offset="100%" stopColor="#036EB8" />
                </linearGradient>
              </defs>
              <g fill="url(#grBadLogo)">
                <polygon points="51.29 44.81 64 44.81 64 13.33 51.29 22.76 51.29 44.81" />
                <path d="M28.01.52l-15.31,18.56V.52H0v44.29h12.7v-12.31l2.61-2.93,14.4,15.24h17.39l-23.91-22.73L44.49.52h-16.48Z" />
                <path d="M200.83,17.72c-7.17-.91-8.01-2.08-8.01-3.78,0-1.82,1.24-3.78,5.86-3.78,4.95,0,8.27.78,14.79,4.04l4.49-8.99c-7.17-4.1-12.44-5.21-19.35-5.21-9.31,0-19.15,4.88-18.95,14.2.13,7.62,5.28,11.27,17.07,13.16,7.49,1.37,8.92,2.28,8.92,4.23,0,1.82-.72,3.65-6.12,3.65-5.99,0-11.07-2.02-15.89-4.95l-4.89,8.21c4.82,4.3,13.87,6.77,20.78,6.77,10.36,0,19.48-4.89,19.41-14.2-.06-9.05-8.21-12.12-18.11-13.35" />
                <polygon points="168.87 27.23 168.87 17.52 149.72 17.52 149.72 10.68 173.17 10.68 173.17 .52 137.02 .52 137.02 44.81 174.47 44.81 174.47 34.72 149.72 34.72 149.72 27.23 168.87 27.23" />
                <polygon points="70.93 .52 70.93 44.81 83.7 44.81 83.7 17.2 96.4 37.19 104.08 37.19 117.11 17.2 117.11 44.81 129.94 44.81 129.94 .52 116.98 .52 100.24 24.82 84.02 .52 70.93 .52" />
              </g>
            </svg>
          </div>
          <div className="gr-dont-meta">
            <div className="vlabel">{(donts[3] && donts[3].label) || 'Gradient on logo'}</div>
            <div className="vdesc">{(donts[3] && donts[3].desc) || ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Page wrapper
   ============================================================ */
function Gradients() {
  const c = useSectionContent('gradients');
  return (
    <section id="gradients" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <GradientSet />
      <GradientApplications />
      <AllowedContexts />
      <GradientDonts />
    </section>
  );
}

window.Gradients = Gradients;

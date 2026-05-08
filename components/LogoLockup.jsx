/* eslint-disable */
const useSectionContent = window.useSectionContent;

/**
 * Logo lockup — section 07.
 *
 * Five subsections:
 *   07.1  KIMES + sub-brands (3 patterns)
 *   07.2  KIMES + external partner (3 patterns)
 *   07.3  Spacing & alignment rules
 *   07.4  Don'ts (8 misuse cells)
 *   07.5  Approval callout
 *
 * Reuses InlineLogo registry from LogoSvgs.js. External partner logos
 * are rendered as neutral gray placeholder boxes with "PARTNER LOGO"
 * labels — never invent fake partner brands.
 */

const InlineLogo  = window.InlineLogo;
const useSiteLang = window.useSiteLang;
function trL(en, ko, lang) { return lang === 'ko' && ko ? ko : en; }

/* --- Reusable helpers ----------------------------------------- */

// Neutral partner-logo placeholder. Width/height are explicit pixels so
// proportions stay predictable inside lockup rows.
function PartnerPlaceholder({ width = 140, height = 32, label = 'PARTNER LOGO' }) {
  return (
    <div
      className="lk-partner"
      style={{ width, height }}
      role="img"
      aria-label={label}
    >
      <span>{label}</span>
    </div>
  );
}

// Vertical divider line between logos in a horizontal lockup. Height
// scales relative to the tallest logo via a CSS variable on the parent.
function LkDivider({ tone = 'soft' }) {
  return <span className={`lk-divider lk-divider-${tone}`} aria-hidden="true" />;
}

// Annotation: thin red dashed bracket above a region with a small mono
// label inside (e.g. "2X", "1X"). Positioned absolutely; parent must be
// position: relative.
function LkAnnotation({ children, top = -20, left = '50%' }) {
  return (
    <span className="lk-anno" style={{ top, left, transform: 'translateX(-50%)' }}>
      {children}
    </span>
  );
}

/* ============================================================
   07.1 — KIMES + sub-brands
   ============================================================ */
function KimesSubBrandLockups() {
  const c = useSectionContent('logo-lockup');
  const sub = (c.subsections && c.subsections.internal) || {};
  return (
    <div id="lockup-internal" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>

      {/* Pattern A — equal-weight horizontal */}
      <div className="lk-card">
        <div className="lk-card-head">
          <span className="lk-pat">Pattern A</span>
          <span className="lk-pat-name">Horizontal row — equal weight</span>
        </div>
        <div className="lk-stage" style={{ '--lk-h': '34px' }}>
          <div className="lk-row">
            <InlineLogo name="kimes" height={34} ariaLabel="KIMES" />
            <LkDivider />
            <InlineLogo name="mc" height={22} ariaLabel="MedicomteK" />
            <LkDivider />
            <InlineLogo name="bdSeoul" height={14} ariaLabel="BEAUTY&DERMA SEOUL" />
            <LkDivider />
            <InlineLogo name="inTagline" height={22} ariaLabel="INSPIRE Digital Health" />
          </div>
          <div className="lk-anno-row" aria-hidden="true">
            <span>2X</span><span>2X</span><span>2X</span>
          </div>
        </div>
        <div className="lk-meta">
          <div>
            <span className="lk-rule">Spacing</span>
            <span>Gap between logos = 2X</span>
          </div>
          <div>
            <span className="lk-rule">Divider</span>
            <span>1px #E1E5EA, height 1.2× tallest logo</span>
          </div>
          <div>
            <span className="lk-rule">Use case</span>
            <span>Program covers, web footer, all-event banners</span>
          </div>
        </div>
      </div>

      {/* Pattern B — KIMES primary, sub-brands secondary */}
      <div className="lk-card">
        <div className="lk-card-head">
          <span className="lk-pat">Pattern B</span>
          <span className="lk-pat-name">KIMES primary · sub-brands secondary</span>
        </div>
        <div className="lk-stage lk-stage-tall" style={{ '--lk-h': '52px' }}>
          <div className="lk-stack">
            <div className="lk-row lk-row-center">
              <InlineLogo name="kimes" height={52} ariaLabel="KIMES" />
            </div>
            <div className="lk-row lk-row-center lk-row-secondary">
              <InlineLogo name="mc" height={20} ariaLabel="MedicomteK" />
              <span className="lk-bullet" aria-hidden="true">·</span>
              <InlineLogo name="bdSeoul" height={12} ariaLabel="BEAUTY&DERMA SEOUL" />
              <span className="lk-bullet" aria-hidden="true">·</span>
              <InlineLogo name="inTagline" height={20} ariaLabel="INSPIRE Digital Health" />
            </div>
          </div>
        </div>
        <div className="lk-meta">
          <div>
            <span className="lk-rule">Size ratio</span>
            <span>KIMES : sub-brand = 1 : 0.6</span>
          </div>
          <div>
            <span className="lk-rule">Vertical gap</span>
            <span>1.5X between KIMES and sub-brand row</span>
          </div>
          <div>
            <span className="lk-rule">Use case</span>
            <span>Hero banners, main event signage where KIMES leads</span>
          </div>
        </div>
      </div>

      {/* Pattern C — vertical stack */}
      <div className="lk-card">
        <div className="lk-card-head">
          <span className="lk-pat">Pattern C</span>
          <span className="lk-pat-name">Vertical stack — portrait formats</span>
        </div>
        <div className="lk-stage lk-stage-tall lk-stage-portrait" style={{ '--lk-h': '40px' }}>
          <div className="lk-stack lk-stack-tight">
            <div className="lk-row lk-row-center">
              <InlineLogo name="kimes" height={40} ariaLabel="KIMES" />
            </div>
            <div className="lk-row lk-row-center"><InlineLogo name="mc" height={18} ariaLabel="MedicomteK" /></div>
            <div className="lk-row lk-row-center"><InlineLogo name="bdSeoul" height={12} ariaLabel="BEAUTY&DERMA SEOUL" /></div>
            <div className="lk-row lk-row-center"><InlineLogo name="inTagline" height={18} ariaLabel="INSPIRE Digital Health" /></div>
          </div>
        </div>
        <div className="lk-meta">
          <div>
            <span className="lk-rule">Alignment</span>
            <span>Optical center (vertical axis)</span>
          </div>
          <div>
            <span className="lk-rule">Vertical gap</span>
            <span>1X between each logo</span>
          </div>
          <div>
            <span className="lk-rule">Use case</span>
            <span>Story / vertical banners, mobile, portrait poster</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   07.2 — KIMES + external partner
   ============================================================ */
function ExternalPartnerLockups() {
  const c = useSectionContent('logo-lockup');
  const sub = (c.subsections && c.subsections.external) || {};
  return (
    <div id="lockup-external" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>

      {/* Pattern A — equal partnership */}
      <div className="lk-card">
        <div className="lk-card-head">
          <span className="lk-pat">Pattern A</span>
          <span className="lk-pat-name">Equal partnership</span>
        </div>
        <div className="lk-stage" style={{ '--lk-h': '34px' }}>
          <div className="lk-row">
            <InlineLogo name="kimes" height={34} ariaLabel="KIMES" />
            <LkDivider tone="strong" />
            <PartnerPlaceholder width={160} height={34} />
          </div>
        </div>
        <div className="lk-meta">
          <div>
            <span className="lk-rule">Size ratio</span>
            <span>1 : 1 (equal heights)</span>
          </div>
          <div>
            <span className="lk-rule">Divider</span>
            <span>1px #231815, height = logo height</span>
          </div>
          <div>
            <span className="lk-rule">Use case</span>
            <span>Co-host or equal-weight sponsor</span>
          </div>
        </div>
      </div>

      {/* Pattern B — hosted relationship */}
      <div className="lk-card">
        <div className="lk-card-head">
          <span className="lk-pat">Pattern B</span>
          <span className="lk-pat-name">Hosted — “PRESENTED BY”</span>
        </div>
        <div className="lk-stage lk-stage-tall" style={{ '--lk-h': '46px' }}>
          <div className="lk-stack lk-stack-tight">
            <div className="lk-row lk-row-center lk-row-meta">
              <span className="lk-tag">PRESENTED BY · 주최</span>
            </div>
            <div className="lk-row lk-row-center">
              <PartnerPlaceholder width={130} height={22} />
            </div>
            <div className="lk-row lk-row-center" style={{ marginTop: 16 }}>
              <InlineLogo name="kimes" height={46} ariaLabel="KIMES" />
            </div>
          </div>
        </div>
        <div className="lk-meta">
          <div>
            <span className="lk-rule">Size ratio</span>
            <span>KIMES : partner = 1 : 0.5</span>
          </div>
          <div>
            <span className="lk-rule">Hierarchy</span>
            <span>Partner above (small) · KIMES below (primary)</span>
          </div>
          <div>
            <span className="lk-rule">Use case</span>
            <span>Hosted by a parent org or association</span>
          </div>
        </div>
      </div>

      {/* Pattern C — multi-sponsor tier */}
      <div className="lk-card">
        <div className="lk-card-head">
          <span className="lk-pat">Pattern C</span>
          <span className="lk-pat-name">Multi-sponsor tier</span>
        </div>
        <div className="lk-stage lk-stage-tall" style={{ '--lk-h': '52px' }}>
          <div className="lk-tier">
            <div className="lk-tier-row lk-tier-host">
              <InlineLogo name="kimes" height={52} ariaLabel="KIMES" />
            </div>
            <div className="lk-tier-row">
              <span className="lk-tag">TITLE SPONSOR · 타이틀 스폰서</span>
              <PartnerPlaceholder width={150} height={28} />
            </div>
            <div className="lk-tier-row">
              <span className="lk-tag">PARTNERS · 파트너스</span>
              <div className="lk-tier-partners">
                <PartnerPlaceholder width={92} height={22} />
                <PartnerPlaceholder width={92} height={22} />
                <PartnerPlaceholder width={92} height={22} />
              </div>
            </div>
          </div>
        </div>
        <div className="lk-meta">
          <div>
            <span className="lk-rule">Tier 1</span>
            <span>KIMES (primary)</span>
          </div>
          <div>
            <span className="lk-rule">Tier 2</span>
            <span>Title sponsor (medium, ~55% of KIMES)</span>
          </div>
          <div>
            <span className="lk-rule">Tier 3</span>
            <span>Partners (small, ~42% of KIMES, equal among themselves)</span>
          </div>
          <div>
            <span className="lk-rule">Use case</span>
            <span>Sponsor walls, programs, web sponsor pages</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   07.3 — Spacing & alignment rules
   ============================================================ */
function LockupRulesTable() {
  const lang = useSiteLang();
  const rows = [
    { rule: 'Gap between logos (same row)',     krRule: '같은 행 로고 간 간격',        spec: 'Minimum 2X',                                          krSpec: '최소 2X' },
    { rule: 'Divider thickness',                krRule: '구분선 두께',                  spec: '1px solid — #231815 (strong) or #E1E5EA (soft)',     krSpec: '1px 실선 — #231815 (강) 또는 #E1E5EA (약)' },
    { rule: 'Divider height',                   krRule: '구분선 높이',                  spec: '1.2× tallest logo height',                            krSpec: '가장 큰 로고 높이의 1.2배' },
    { rule: 'Vertical alignment',               krRule: '수직 정렬',                    spec: 'Optical center (not baseline) — adjust per logo',     krSpec: '시각적 중앙 (베이스라인 아님) — 로고별 조정' },
    { rule: 'Size ratio (KIMES : sub-brand)',   krRule: '크기 비율 (KIMES : 서브)',     spec: '1 : 0.6 in Pattern B',                                krSpec: '패턴 B에서 1 : 0.6' },
    { rule: 'Size ratio (KIMES : partner)',     krRule: '크기 비율 (KIMES : 파트너)',   spec: '1 : 1 (equal) or 1 : 0.5 (hosted)',                  krSpec: '1 : 1 (동등) 또는 1 : 0.5 (주최형)' },
    { rule: 'Clear space',                      krRule: '클리어 스페이스',               spec: '1X around the entire lockup, not individual logos',   krSpec: '개별 로고가 아닌 락업 전체 주변 1X' },
  ];
  const c = useSectionContent('logo-lockup');
  const sub = (c.subsections && c.subsections.rules) || {};
  const headers = sub.headers || {};
  return (
    <div id="lockup-rules" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="lk-table-wrap">
        <table className="lk-table">
          <thead>
            <tr>
              <th>{headers.rule}</th>
              <th>{headers.spec}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.rule}>
                <td>{trL(r.rule, r.krRule, lang)}</td>
                <td>{trL(r.spec, r.krSpec, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   07.4 — Don'ts
   ============================================================ */
function LockupDonts() {
  const lang = useSiteLang();
  // Each don't renders KIMES + 2 sub-brand wordmarks under a deliberately-
  // wrong arrangement. The misuse is created with CSS, not by editing the
  // SVGs themselves.
  const items = [
    {
      id: 'random-sizes',
      ko: '크기 무작위',
      en: 'Random sizes — no hierarchy',
      art: () => (
        <div className="lkd-row">
          <InlineLogo name="kimes" height={20} />
          <InlineLogo name="mc" height={36} />
          <InlineLogo name="bdSeoul" height={10} />
          <InlineLogo name="inTagline" height={28} />
        </div>
      ),
    },
    {
      id: 'no-spacing',
      ko: '간격 부족',
      en: 'Touching / overlapping',
      art: () => (
        <div className="lkd-row" style={{ gap: 0 }}>
          <InlineLogo name="kimes" height={26} />
          <span style={{ marginLeft: -6 }}><InlineLogo name="mc" height={18} /></span>
          <span style={{ marginLeft: -6 }}><InlineLogo name="bdSeoul" height={11} /></span>
        </div>
      ),
    },
    {
      id: 'misalign',
      ko: '정렬 불일치',
      en: 'Mixed baseline / center alignment',
      art: () => (
        <div className="lkd-row" style={{ alignItems: 'flex-end' }}>
          <span style={{ alignSelf: 'flex-start' }}><InlineLogo name="kimes" height={26} /></span>
          <span style={{ alignSelf: 'center' }}><InlineLogo name="mc" height={18} /></span>
          <span style={{ alignSelf: 'flex-end' }}><InlineLogo name="bdSeoul" height={11} /></span>
        </div>
      ),
    },
    {
      id: 'mix-color-white',
      ko: '컬러·화이트 혼용',
      en: 'Mixing color and white logos',
      art: () => (
        <div className="lkd-row" style={{ background: '#1a1a1a', padding: '10px 14px', borderRadius: 4 }}>
          <InlineLogo name="kimes" height={24} />
          <InlineLogo name="mcWhite" height={18} />
          <InlineLogo name="bdWhite" height={11} />
        </div>
      ),
    },
    {
      id: 'no-divider',
      ko: '구분선 없음',
      en: 'Clashing colors with no divider',
      art: () => (
        <div className="lkd-row" style={{ gap: 8 }}>
          <InlineLogo name="kimes" height={24} />
          <InlineLogo name="mc" height={18} />
          <InlineLogo name="bdSeoul" height={11} />
        </div>
      ),
    },
    {
      id: 'kimes-smaller',
      ko: 'KIMES가 더 작음',
      en: 'KIMES smaller than sub-brand',
      art: () => (
        <div className="lkd-row">
          <InlineLogo name="kimes" height={14} />
          <LkDivider />
          <InlineLogo name="mc" height={32} />
        </div>
      ),
    },
    {
      id: 'diagonal',
      ko: '대각선 배치',
      en: 'Diagonal / curved arrangement',
      art: () => (
        <div className="lkd-row" style={{ transform: 'rotate(-9deg)' }}>
          <InlineLogo name="kimes" height={26} />
          <LkDivider />
          <InlineLogo name="mc" height={18} />
          <LkDivider />
          <InlineLogo name="bdSeoul" height={12} />
        </div>
      ),
    },
    {
      id: 'ornaments',
      ko: '장식 요소 추가',
      en: 'Decorative elements between logos',
      art: () => (
        <div className="lkd-row">
          <InlineLogo name="kimes" height={26} />
          <span aria-hidden="true" style={{ color: '#E60012', fontSize: 22 }}>★</span>
          <InlineLogo name="mc" height={18} />
          <span aria-hidden="true" style={{ color: '#E60012', fontSize: 22 }}>✦</span>
          <InlineLogo name="bdSeoul" height={12} />
        </div>
      ),
    },
  ];

  const c = useSectionContent('logo-lockup');
  const sub = (c.subsections && c.subsections.donts) || {};
  return (
    <div id="lockup-donts" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="lkd-grid">
        {items.map(item => (
          <div className="lkd-cell" key={item.id}>
            <span className="lkd-x" aria-hidden="true">✗</span>
            <div className="lkd-art">{item.art()}</div>
            <div className="lkd-meta">
              <span className="vlabel">{lang === 'ko' ? item.ko : item.en}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   07.5 — Approval callout
   ============================================================ */
function ApprovalCallout() {
  const c = useSectionContent('logo-lockup');
  const ap = (c.subsections && c.subsections.approval) || {};
  return (
    <div id="lockup-approval" className="subsection">
      <div className="lk-callout">
        <div className="lk-callout-eyebrow">{ap.eyebrow}</div>
        <p className="lk-callout-ko">{ap.ko}</p>
        <p className="lk-callout-en">{ap.en}</p>
      </div>
    </div>
  );
}

/* ============================================================
   Page wrapper
   ============================================================ */
function LogoLockup() {
  const c = useSectionContent('logo-lockup');
  return (
    <section id="logo-lockup" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <KimesSubBrandLockups />
      <ExternalPartnerLockups />
      <LockupRulesTable />
      <LockupDonts />
      <ApprovalCallout />
    </section>
  );
}

window.LogoLockup = LogoLockup;

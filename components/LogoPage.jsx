// §3 — /logo (v2027.1). KIMES 워드마크 자산과 사용 규정.
// Tier 1: 변형·재타이핑·임의 색상 변경 불가.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;
const KimesWordmark = window.KimesWordmark;
const InlineLogo = window.InlineLogo;

// 4개 로고 버전.
const LOGO_VERSIONS = [
  {
    id: 'red',
    name: '기본 (Red)',
    use: '흰 배경 · 밝은 사진 위',
    svgKey: 'kimes',
    tile: 'tile-light',
    base: 'KIMES_Wordmark_Red',
  },
  {
    id: 'white',
    name: '화이트',
    use: '빨강 · 검정 · 어두운 배경 위',
    svgKey: 'kimesWhite',
    tile: 'tile-dark',
    base: 'KIMES_Wordmark_White',
  },
  {
    id: 'black',
    name: '블랙',
    use: '단색 인쇄 · 팩스 · 복사',
    svgKey: 'kimesBlack',
    tile: 'tile-light',
    base: 'KIMES_Wordmark_Black',
  },
  {
    id: 'gray',
    name: '그레이',
    use: '본문 내 작은 표기 · 각주',
    svgKey: 'kimesGray',
    tile: 'tile-light',
    base: 'KIMES_Wordmark_Gray',
  },
];

const FILE_FORMATS = [
  { ext: 'svg', label: 'SVG' },
  { ext: 'png', label: 'PNG' },
  { ext: 'ai',  label: 'AI'  },
  { ext: 'eps', label: 'EPS' },
];

// 명도 11칸 (0% 흰색 → 100% 검정). 10% 단위 grayscale.
const BRIGHTNESS_HEX = [
  '#FFFFFF', '#E6E6E6', '#CCCCCC', '#B3B3B3', '#999999',
  '#808080', '#666666', '#4D4D4D', '#333333', '#1A1A1A', '#000000',
];

const GRID_BARS = [
  {
    id: 'red',
    label: 'Red 워드마크',
    rightLabel: '명도 배경',
    rule: '명도 0~10% 배경 (흰색 · 매우 옅은 배경). 그 외 → Black 또는 White.',
    showScale: true,
    cells: BRIGHTNESS_HEX.map((bg, i) => i <= 1
      ? { bg, wm: 'kimes' }
      : { bg, blocked: true }),
  },
  {
    id: 'bw-brightness',
    label: 'Black · White 워드마크',
    rightLabel: '명도 배경',
    rule: '0~30% 배경 — Black / 40~100% 배경 — White.',
    showScale: true,
    cells: BRIGHTNESS_HEX.map((bg, i) => i <= 3
      ? { bg, wm: 'kimesBlack' }
      : { bg, wm: 'kimesWhite' }),
  },
];

// 브랜드 컬러 칩 5종.
const COLOR_SEGMENTS = [
  { id: 'red',  bg: '#E60012', wordmark: 'kimesWhite', wmLabel: '화이트' },
  { id: 'mc',   bg: '#036EB8', wordmark: 'kimesWhite', wmLabel: '화이트' },
  { id: 'bd',   bg: '#5D3B8B', wordmark: 'kimesWhite', wmLabel: '화이트' },
  { id: 'in',   bg: '#BFD633', wordmark: 'kimesBlack', wmLabel: '블랙' },
  { id: 'gray', bg: '#A7A9AC', wordmark: 'kimesBlack', wmLabel: '블랙' },
];

// §3.6 — 7종 사용 불가 (Tier 1).
const FORBIDDEN = [
  { id: 1, title: '색 변경 (Red·White·Black·Gray 외)', bad: 'color' },
  { id: 2, title: '비율 변형 (가로·세로 늘이기·찌그러뜨리기)', bad: 'stretch' },
  { id: 3, title: '워드마크 위 텍스트·그래픽 중첩', bad: 'overlay' },
  { id: 4, title: 'i 쐐기 제거·변형', bad: 'invert' },
  { id: 5, title: '저해상도 이미지 사용 (벡터 또는 고해상도 PNG 필수)', bad: 'lowres' },
  { id: 6, title: '비공식 워드마크 사용 (/logo 외부 출처)', bad: 'unofficial' },
  { id: 7, title: '회사 로고와의 강제 결합 (단일 합성 로고 제작)', bad: 'badlockup' },
];

const MIN_SIZES = [
  { label: '디지털', value: '80 px' },
  { label: '인쇄',   value: '24 mm' },
];

function LogoPage() {
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';

  return (
    <PageShell
      title="로고"
      lede="KIMES 워드마크 자산과 사용 규정. 변형·재타이핑·임의 색상 변경 불가 (Tier 1)."
    >
      {/* §3.1 워드마크 ----------------------------------------- */}
      <SectionHeading id="wordmark" title="워드마크" />
      <div className="lg-hero">
        <div className="lg-hero-art" aria-label="KIMES 워드마크">
          <KimesWordmark height={120} />
        </div>
        <p className="lg-hero-desc">
          1980년 첫 행사 이래 사용된 KIMES 공식 워드마크. KIMES Red 색상의
          산세리프 워드마크와 <code>i</code> 안의 검은 쐐기로 구성. 세 요소
          (색·자형·쐐기)는 분리 불가 · 변형 불가.
        </p>
      </div>

      {/* §3.2 버전 · 포맷 -------------------------------- */}
      <SectionHeading id="versions" title="버전 · 포맷" />
      <div className="lg-versions">
        {LOGO_VERSIONS.map(v => (
          <LogoVersionCard
            key={v.id}
            version={v}
            assetStatus={assetStatus}
          />
        ))}
      </div>
      <p className="lg-versions-foot">
        벡터 · sRGB (SVG·PNG) · CMYK + Pantone {window.KIMES_EVENT.colors.primary.red.pantone} 별색 (AI·EPS).
      </p>
      <p>
        연도 일체형 워드마크 (예: KIMES 2027 일체형) — 사무국 별도 제공. 요청{' '}
        <a href={`mailto:${window.KIMES_EVENT.contact.email}`}>{window.KIMES_EVENT.contact.email}</a>.
      </p>

      {/* §3.3 클리어 스페이스 ---------------------------------------- */}
      <SectionHeading id="clearspace" title="클리어 스페이스" />
      <ClearSpaceDiagram />
      <ul>
        <li>1X = K 글자 높이</li>
        <li>점선 안쪽 영역 — 타 로고·문구·이미지 배치 불가 (Tier 1)</li>
      </ul>

      {/* §3.4 최소 크기 ---------------------------------------------- */}
      <SectionHeading id="minsize" title="최소 크기" />
      <div className="lg-minsize">
        {MIN_SIZES.map(m => (
          <div key={m.label} className="lg-min-card">
            <div className="lg-min-label">{m.label}</div>
            <div className="lg-min-value">{m.value}</div>
          </div>
        ))}
      </div>
      <p>
        최소 크기 미만 사용 시 <code>i</code> 쐐기 식별이 어려움. 사이니지·
        대형 인쇄는 명도·해상도 사전 확인.
      </p>

      {/* §3.5 배경별 사용 ----- */}
      <SectionHeading id="bg-use" title="배경별 사용" />
      <div className="lg-grid-stack">
        {GRID_BARS.map(bar => <GridBar key={bar.id} bar={bar} />)}
      </div>

      <header className="lg-h3-block">
        <h3 className="lg-h3" id="color-bg">브랜드 컬러 배경</h3>
      </header>
      <ColorChips segments={COLOR_SEGMENTS} />

      <p className="lg-gray-note">
        Gray 워드마크 — 본문 내 톤다운 자리 (각주·작은 표기) · INSPIRE Lime ·
        Neutral Gray 배경.
      </p>

      {/* §3.6 금지 사용 (Tier 1) -------------------------------------- */}
      <SectionHeading id="forbidden" title="금지 사용 (Tier 1)" />
      <p>
        다음 사용은 무단 사용 금지. 발견 시 사무국이 정정·중단을 요청.
      </p>
      <div className="lg-donts">
        {FORBIDDEN.map(d => <ForbiddenCard key={d.id} d={d} />)}
      </div>

      {/* §3.7 사전 승인 필요 사용 (Tier 1) -------------------------------------- */}
      <SectionHeading id="apply" title="사전 승인 필요 사용 (Tier 1)" />
      <p>
        다음 사용은 사전 승인 필수. 신청 →{' '}
        <a href={`mailto:${window.KIMES_EVENT.contact.email}?subject=${encodeURIComponent('[승인 신청] ')}`}>{window.KIMES_EVENT.contact.email}</a>
        {' '}(영업일 3~5일).
      </p>
      <ul className="lg-apply-list">
        <li>굿즈·기념품 제작</li>
        <li>영상물 노출 (TVC · 바이럴 · 웨비나)</li>
        <li>외부 미디어 광고</li>
        <li>가이드 외 신규 사용 사례</li>
      </ul>
      <p>
        신청 절차 → <Link to="/permissions">/permissions §8.4</Link>
      </p>
    </PageShell>
  );
}

function LogoVersionCard({ version, assetStatus }) {
  const pending = assetStatus !== 'ready';
  return (
    <div className={`lg-card ${version.tile}`}>
      <div className="lg-card-tile">
        <InlineLogo name={version.svgKey} height={36} ariaLabel={`KIMES — ${version.name}`} />
      </div>
      <div className="lg-card-body">
        <div className="lg-card-name">{version.name}</div>
        <div className="lg-card-use">{version.use}</div>
        <div className="lg-card-files">
          {FILE_FORMATS.map(f => (
            pending ? (
              <button
                key={f.ext}
                type="button"
                className="btn btn-sm btn-outline"
                disabled
                aria-label={`${version.name} ${f.label} — Coming soon`}
                title="Coming soon"
              >
                {f.label}
              </button>
            ) : (
              <a
                key={f.ext}
                href={`/assets/logos/${version.base}.${f.ext}`}
                className="btn btn-sm btn-outline"
                download
              >
                {f.label}
              </a>
            )
          ))}
        </div>
        {pending && (
          <div className="lg-card-pending">Coming Soon</div>
        )}
      </div>
    </div>
  );
}

// 클리어 스페이스 다이어그램.
function ClearSpaceDiagram() {
  const wmHeight = 60;
  const oneX = wmHeight;
  return (
    <figure className="lg-clear-wrap">
      <div className="lg-clear-stage">
        <div className="lg-clear-outer" style={{ padding: oneX }}>
          <span className="lg-clear-1x lg-clear-1x-top"   aria-hidden="true">↕ 1X</span>
          <span className="lg-clear-1x lg-clear-1x-right"  aria-hidden="true">↔ 1X</span>
          <span className="lg-clear-1x lg-clear-1x-bottom" aria-hidden="true">↕ 1X</span>
          <span className="lg-clear-1x lg-clear-1x-left"   aria-hidden="true">↔ 1X</span>
          <div className="lg-clear-inner">
            <KimesWordmark height={wmHeight} />
          </div>
        </div>
      </div>
    </figure>
  );
}

function GridBar({ bar }) {
  return (
    <section className="lg-grid" aria-labelledby={`grid-${bar.id}-label`}>
      <header className="lg-grid-label">
        <div className="lg-grid-label-en" id={`grid-${bar.id}-label`}>{bar.label}</div>
        <div className="lg-grid-label-right">{bar.rightLabel}</div>
        <div className="lg-grid-label-rule">{bar.rule}</div>
      </header>
      <div className="lg-grid-right">
        <div className="lg-grid-cells" role="group" aria-label={`${bar.label} ${bar.rightLabel}`}>
          {bar.cells.map((cell, i) => (
            <div
              key={i}
              className={`lg-grid-cell ${cell.blocked ? 'is-blocked' : ''}`}
              style={{ background: cell.bg }}
              aria-label={cell.blocked ? '사용 안 함' : `${cell.wm} 사용 가능`}
            >
              {!cell.blocked && cell.wm && (
                <InlineLogo name={cell.wm} height={9} ariaLabel="" />
              )}
            </div>
          ))}
        </div>
        {bar.showScale && (
          <div className="lg-grid-scale" aria-hidden="true">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        )}
      </div>
    </section>
  );
}

function ColorChips({ segments }) {
  return (
    <div className="lg-color-bar-wrap">
      <div className="lg-color-bar" role="group" aria-label="브랜드 컬러 단색 배경">
        {segments.map(seg => (
          <div
            key={seg.id}
            className="lg-color-bar-seg"
            style={{ background: seg.bg }}
            aria-label={`${seg.id} 배경 — ${seg.wmLabel} 워드마크`}
          >
            <InlineLogo name={seg.wordmark} height={18} ariaLabel="" />
          </div>
        ))}
      </div>
      <div className="lg-color-bar-names" aria-hidden="true">
        {segments.map(seg => (
          <span key={seg.id} className="lg-color-bar-name">{seg.wmLabel}</span>
        ))}
      </div>
      <div className="lg-color-bar-rules">
        <div className="lg-color-bar-rule">
          <span className="lg-color-bar-mark dark"><CheckGlyph /></span>
          <span>어두운 채도 컬러 — White 워드마크</span>
        </div>
        <div className="lg-color-bar-rule">
          <span className="lg-color-bar-mark light"><CheckGlyph /></span>
          <span>밝은 채도 컬러 — Black 워드마크</span>
        </div>
      </div>
    </div>
  );
}

function ForbiddenCard({ d }) {
  return (
    <div className="lg-dont">
      <div className="lg-dont-mark" aria-label="사용 불가 예시 (Tier 1)">
        <CrossGlyph />
      </div>
      <div className="lg-dont-preview">
        <BadExample variant={d.bad} />
      </div>
      <div className="lg-dont-body">
        <div className="lg-dont-title">{d.id}. {d.title}</div>
      </div>
    </div>
  );
}

function BadExample({ variant }) {
  if (variant === 'overlay') {
    return (
      <span className={`lg-bad lg-bad-${variant}`} aria-hidden="true">
        <KimesWordmark height={28} />
        <span className="lg-bad-overlay-tag">NEW</span>
      </span>
    );
  }
  if (variant === 'unofficial') {
    return (
      <span className={`lg-bad lg-bad-${variant}`} aria-hidden="true">
        <KimesWordmark height={28} />
        <span className="lg-bad-unofficial-extra">KOREA</span>
      </span>
    );
  }
  if (variant === 'badlockup') {
    return (
      <span className={`lg-bad lg-bad-${variant}`} aria-hidden="true">
        <span className="lg-bad-badlockup-co">CO.</span>
        <KimesWordmark height={22} />
      </span>
    );
  }
  return (
    <span className={`lg-bad lg-bad-${variant}`} aria-hidden="true">
      <KimesWordmark height={28} />
    </span>
  );
}

function CheckGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function CrossGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  );
}

window.LogoPage = LogoPage;

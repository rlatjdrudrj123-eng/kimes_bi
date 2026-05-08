// §6 — /logo. KIMES 워드마크를 정확하게 다운로드하고, 어떤 상황에 어떤
// 버전을 써야 하는지 알린다. 변형·재타이핑·임의 색상 변경을 명확히 막는다.
//
// Sub-commit 단위 진행:
//   §6.2.1 워드마크 + §6.2.2 5개 버전 카드      ← sub-1
//   §6.2.3 클리어 스페이스 + §6.2.4 최소 크기 +
//   §6.2.5 배경별 사용 매트릭스                 ← 이 커밋
//   §6.2.6 Don'ts 12종 + §6.2.7 사용 신청 박스 ← 다음 커밋

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;
const KimesWordmark = window.KimesWordmark;
const InlineLogo = window.InlineLogo;

// 4개 로고 버전. 각 카드: SVG 키 + 라벨 + 용도 + 다운로드 파일명.
// 파일은 /assets/logos/ 안에 위치 (벤더 제공 자산 — 본 리포에 미포함된
// 경우 링크가 404 반환할 수 있음. Phase 4 자산 패키지 정리 시 일괄 검증).
//
// 연도 일체형(예: KIMES 2027 일체형)은 워드마크 SVG와 숫자의 자간·
// 베이스라인·시각 무게가 정밀히 맞은 단일 SVG여야 정확. 코드 합성으로는
// 불가. 사무국 디자이너가 회차마다 별도 제공하므로 가이드 카드에는
// 두지 않음.
const LOGO_VERSIONS = [
  {
    id: 'red',
    name: '기본 (레드)',
    use: '흰 배경·밝은 사진 위 — 가장 일반적인 사용',
    svgKey: 'kimes',
    tile: 'tile-light',
    base: 'kimes-logo',
  },
  {
    id: 'white',
    name: '화이트',
    use: '빨간색·검정·어두운 배경 위',
    svgKey: 'kimesWhite',
    tile: 'tile-dark',
    base: 'kimes-white-logo',
  },
  {
    id: 'black',
    name: '블랙',
    use: '단색 인쇄·팩스·복사',
    svgKey: 'kimesBlack',
    tile: 'tile-light',
    base: 'kimes-black-logo',
  },
  {
    id: 'gray',
    name: '그레이',
    use: '본문 안 작은 표기·각주',
    svgKey: 'kimesGray',
    tile: 'tile-light',
    base: 'kimes-gray-logo',
  },
];

const FILE_FORMATS = [
  { ext: 'svg', label: 'SVG' },
  { ext: 'png', label: 'PNG' },
  { ext: 'ai',  label: 'AI'  },
  { ext: 'eps', label: 'EPS' },
];

// §6.2.5 배경별 사용 — KT 11칸 격자 시스템 + KIMES 4브랜드 칩.
// 시각 도구 3개로 단순화: 격자 2개(Primary / B-W 묶음) + 칩 1세트.
// Gray 워드마크는 자유 사용 → 한 줄 안내로 처리. 일반 컬러 그라디언트는
// 4브랜드 칩 케이스와 정보 중복이라 제거.
//
// 사용 룰 (엄격):
//   1) Primary (Red): 0–10%만 (대비 충분한 흰색·매우 옅은 배경)
//   2) Black/White:  0–30% Black / 40–100% White (boundary 30/40)
//
// KT 시스템과 같은 결: 11칸 단색 격자 + Black/White 묶음 + 빨간 빗금.

// 명도 11칸 (0% 흰색 → 100% 검정). 10% 단위 grayscale.
const BRIGHTNESS_HEX = [
  '#FFFFFF', '#E6E6E6', '#CCCCCC', '#B3B3B3', '#999999',
  '#808080', '#666666', '#4D4D4D', '#333333', '#1A1A1A', '#000000',
];

const GRID_BARS = [
  {
    id: 'red',
    label: 'Primary Wordmark (Red)',
    sub: '메인 워드마크 (레드)',
    rightLabel: '명도 배경색 규정',
    rule: '명도 10% 이하 흰색·매우 옅은 배경에서만 사용. 그 외엔 Black 또는 White로.',
    showScale: true,
    cells: BRIGHTNESS_HEX.map((bg, i) => i <= 1
      ? { bg, wm: 'kimes' }
      : { bg, blocked: true }),
  },
  {
    id: 'bw-brightness',
    label: 'Black / White Wordmark',
    sub: '블랙·화이트 워드마크',
    rightLabel: '명도 배경색 규정',
    rule: '0–30% 배경: Black 워드마크 / 40–100% 배경: White 워드마크.',
    showScale: true,
    cells: BRIGHTNESS_HEX.map((bg, i) => i <= 3
      ? { bg, wm: 'kimesBlack' }
      : { bg, wm: 'kimesWhite' }),
  },
];

// 브랜드 컬러 칩 5종 — 칩 사이 여백 + 라벨을 워드마크 종류(화이트/블랙)로.
// §7 Color와 컬러 이름 정보 중복 회피. 핵심은 "어떤 워드마크"임.
const COLOR_SEGMENTS = [
  { id: 'red',  bg: '#E60012', wordmark: 'kimesWhite', wmLabel: '화이트' },
  { id: 'mc',   bg: '#036EB8', wordmark: 'kimesWhite', wmLabel: '화이트' },
  { id: 'bd',   bg: '#5D3B8B', wordmark: 'kimesWhite', wmLabel: '화이트' },
  { id: 'in',   bg: '#BFD633', wordmark: 'kimesBlack', wmLabel: '블랙' },
  { id: 'gray', bg: '#A7A9AC', wordmark: 'kimesBlack', wmLabel: '블랙' },
];

// §6.2.6 Don'ts — 11종. 모두 절대 금지(✗ error 톤) — 워드마크 SVG에
// 적용되는 변형들. 텍스트 자유 조판(다른 폰트로 "KIMES" 표기)은
// §8.2 마케팅·콘텐츠 자유 영역으로 이전 — 이 목록에서 제외.
const DONTS = [
  { id: 1,  title: '색 바꾸기',                     desc: '회사 컬러로 통일하지 않습니다',  bad: 'color' },
  { id: 2,  title: '검은 쐐기 제거',                desc: 'i 안의 디테일을 지우지 않습니다', bad: 'wedge' },
  { id: 3,  title: '가로·세로 늘리기',              desc: '비율을 변형하지 않습니다',       bad: 'stretch' },
  { id: 4,  title: '회전·기울이기',                 desc: '수평을 깨뜨리지 않습니다',       bad: 'rotate' },
  { id: 5,  title: '그림자·외곽선·글로우',           desc: '효과를 추가하지 않습니다',       bad: 'shadow' },
  { id: 6,  title: '그라디언트 채움',                desc: '단색 외 채움을 쓰지 않습니다',   bad: 'gradient' },
  { id: 7,  title: '원·박스·배지 안에 가두기',       desc: '컨테이너 안에 넣지 않습니다',    bad: 'box' },
  { id: 8,  title: '입체·3D 효과',                  desc: '평면 워드마크를 유지합니다',    bad: '3d' },
  { id: 9,  title: '워드마크 일부 잘라내기',         desc: '글자를 가리지 않습니다',         bad: 'crop' },
  { id: 10, title: '회사 로고와 합쳐 새 로고 만들기', desc: '독립 워드마크로 유지합니다',     bad: 'merge' },
  { id: 11, title: '패턴·텍스처 채움',                desc: '단색 채움만 사용합니다',         bad: 'pattern' },
];

const MIN_SIZES = [
  { label: '디지털', value: '80 px', hint: '이메일 서명·웹 푸터·SNS 카드 등 화면 표기' },
  { label: '인쇄',   value: '24 mm', hint: '명함·리플렛·리포트 표지 등 종이 매체' },
  { label: '사이니지·대형 인쇄', value: '제한 없음', hint: '단, 명도·해상도 사전 확인 권장' },
];

function LogoPage() {
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';

  return (
    <PageShell
      eyebrow="02"
      title="Logo"
      subtitle="로고"
      lede="KIMES 워드마크의 정식 자산을 다운로드하고, 어떤 상황에서 어떤 버전을 써야 하는지 확인하세요. 변형·재타이핑·임의 색상 변경은 권장하지 않는 사용입니다."
    >
      {/* §6.2.1 KIMES 워드마크 ----------------------------------------- */}
      <SectionHeading id="wordmark" title="Wordmark" subtitle="KIMES 워드마크" />
      <div className="lg-hero">
        <div className="lg-hero-art" aria-label="KIMES 워드마크">
          <KimesWordmark height={120} />
        </div>
        <p className="lg-hero-desc">
          KIMES 워드마크는 1980년 첫 행사 이래 단단하고 직선적인 산세리프로
          한국 의료기기 산업의 무게감을 표현해왔습니다. 강렬한 빨강과 두꺼운
          글자, 그리고 <code>i</code> 안에 자리 잡은 검은 쐐기 — 이 세 요소가
          KIMES만의 시각적 정체성입니다.
        </p>
      </div>

      {/* §6.2.2 로고 버전 (그리드 카드) -------------------------------- */}
      <SectionHeading id="versions" title="Versions" subtitle="로고 버전" />
      <p>
        용도에 맞는 버전을 선택해 다운로드하세요. SVG는 디지털·웹 표준,
        PNG는 빠른 미리보기·메신저 첨부, AI/EPS는 인쇄·간판 작업용입니다.
      </p>
      <p>
        행사 직전 발표용 연도 일체형 워드마크(예: KIMES 2027 일체형)는
        사무국이 별도로 제공합니다. 필요한 경우{' '}
        <a href={`mailto:${window.KIMES_EVENT.contact.email}`}>{window.KIMES_EVENT.contact.email}</a>로
        요청해주세요.
      </p>
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
        해상도: 벡터 / 컬러모드: SVG = sRGB · AI = CMYK + Pantone {window.KIMES_EVENT.colors.primary.red.pantone} 별색
      </p>

      {/* §6.2.3 클리어 스페이스 ---------------------------------------- */}
      <SectionHeading id="clearspace" title="Clear Space" subtitle="클리어 스페이스" />
      <p>
        워드마크 사방으로 K 높이만큼의 빈 영역을 반드시 확보합니다. 이 영역
        안에는 다른 로고·문구·이미지가 들어갈 수 없습니다.
      </p>
      <ClearSpaceDiagram />

      {/* §6.2.4 최소 크기 ---------------------------------------------- */}
      <SectionHeading id="minsize" title="Minimum Size" subtitle="최소 크기" />
      <p>
        다음 크기 이상에서만 KIMES 워드마크를 사용합니다. 더 작아지면
        <code> i</code> 안의 검은 쐐기가 뭉개져 식별이 어려워집니다.
      </p>
      <div className="lg-minsize">
        {MIN_SIZES.map(m => (
          <div key={m.label} className="lg-min-card">
            <div className="lg-min-label">{m.label}</div>
            <div className="lg-min-value">{m.value}</div>
            <div className="lg-min-hint">{m.hint}</div>
          </div>
        ))}
      </div>

      {/* §6.2.5 배경별 사용 — 11칸 격자 2개 + 브랜드 컬러 칩 1세트 ----- */}
      <SectionHeading id="bg-use" title="Background Use" subtitle="배경별 사용" />
      <p>배경 명도와 컬러에 따라 워드마크를 선택합니다.</p>
      <div className="lg-grid-stack">
        {GRID_BARS.map(bar => <GridBar key={bar.id} bar={bar} />)}
      </div>

      {/* H3 sub-section — 격자 2개 다음, 브랜드 단색 칩 5개 */}
      <header className="lg-h3-block">
        <h3 className="lg-h3" id="color-bg">Brand Color Backgrounds</h3>
        <div className="lg-h3-sub">브랜드 컬러 배경</div>
      </header>
      <ColorChips segments={COLOR_SEGMENTS} />

      {/* Gray 워드마크 — 별도 격자 없이 한 줄 안내. 사용 빈도 낮고
          톤다운 자유 사용이라 격자로 만들 정보 양이 부족. */}
      <p className="lg-gray-note">
        Gray 워드마크는 톤다운이 필요한 자리(본문 안 작은 표기·각주 등)에
        자유롭게 사용합니다.
      </p>

      {/* §6.2.6 Don'ts — 11종 -------------------------------------- */}
      <SectionHeading id="donts" title="Don'ts" subtitle="피해야 할 사용 예시" />
      <p>
        KIMES 워드마크 SVG는 변형하지 않고 그대로 사용합니다. 텍스트 자유
        조판은 §8.2 마케팅·콘텐츠 영역의 별개 작업입니다.
      </p>
      <div className="lg-donts">
        {DONTS.map(d => <DontCard key={d.id} d={d} />)}
      </div>

      {/* §6.2.7 로고 사용 신청 ------------------------------------------ */}
      <section className="lg-apply" id="apply">
        <SectionHeading title="Request Approval" subtitle="로고 사용 신청" className="lg-apply-heading" />
        <p>
          가이드에 명시된 일반적인 사용은 별도 신청이 필요 없습니다. 다만
          다음 경우는 사무국 사전 승인을 받아주세요.
        </p>
        <ul className="lg-apply-list">
          <li>굿즈·기념품 제작 (티셔츠·머그컵·에코백 등)</li>
          <li>영상물에 KIMES 로고 등장 (TVC·바이럴·웨비나 인트로)</li>
          <li>외부 미디어 광고 집행</li>
          <li>가이드에 없는 새로운 사용 케이스</li>
        </ul>
        <div className="lg-apply-actions">
          <a href="#/contact?type=logo" className="btn btn-primary btn-md">Apply →</a>
          <span className="lg-apply-channel">
            또는 <a href={`mailto:${window.KIMES_EVENT.contact.email}`}>{window.KIMES_EVENT.contact.email}</a>
            {' · '}
            <a href={`tel:${window.KIMES_EVENT.contact.tel.replace(/-/g,'')}`}>{window.KIMES_EVENT.contact.tel}</a>
          </span>
        </div>
      </section>
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

// 클리어 스페이스 다이어그램 — 워드마크 + 점선 경계 박스 + 1X 라벨.
// 1X = K 글자 높이 ≈ 워드마크 높이. 외곽 dashed 박스가 빈 영역의 경계.
function ClearSpaceDiagram() {
  const wmHeight = 60;
  const oneX = wmHeight; // K 높이 = 워드마크 높이
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
      <figcaption className="lg-clear-caption">
        <strong>1X = K의 높이</strong> · 점선 안쪽이 빈 영역 (다른 로고·문구·
        이미지가 들어갈 수 없는 구역)
      </figcaption>
    </figure>
  );
}

// §6.2.5 배경별 사용 — KT 격자 시스템 차용. 좌측 라벨(워드마크명+규정명)
// + 우측 11칸 격자(각 칸에 단색 배경 + 사용 가능 워드마크 1개 또는 빨간
// 빗금). 데스크톱 좌/우 분할, 모바일은 위/아래 세로 쌓임.
function GridBar({ bar }) {
  return (
    <section className="lg-grid" aria-labelledby={`grid-${bar.id}-label`}>
      <header className="lg-grid-label">
        <div className="lg-grid-label-en" id={`grid-${bar.id}-label`}>{bar.label}</div>
        <div className="lg-grid-label-ko">{bar.sub}</div>
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

// 브랜드 컬러 단색 칩 5개 — 16px 여백으로 분리. 어두운 채도(Red/Blue/
// Purple)는 White, 밝은 채도(Lime/Gray)는 Black 워드마크. §7과 컬러 이름
// 중복 회피 — 칩 라벨은 워드마크 종류로.
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
          <span>어두운 채도 컬러: White 워드마크</span>
        </div>
        <div className="lg-color-bar-rule">
          <span className="lg-color-bar-mark light"><CheckGlyph /></span>
          <span>밝은 채도 컬러: Black 워드마크</span>
        </div>
      </div>
    </div>
  );
}

// §6.2.6 Don'ts 카드 — ✗ 아이콘(error 톤) + 잘못된 예시 + 한 줄 설명.
function DontCard({ d }) {
  return (
    <div className="lg-dont">
      <div className="lg-dont-mark" aria-label="절대 금지">
        <CrossGlyph />
      </div>
      <div className="lg-dont-preview">
        <BadExample variant={d.bad} />
      </div>
      <div className="lg-dont-body">
        <div className="lg-dont-title">{d.id}. {d.title}</div>
        <div className="lg-dont-desc">{d.desc}</div>
      </div>
    </div>
  );
}

// 잘못된 KIMES 워드마크 변형 11종을 CSS만으로 재현. 별도 이미지 자산
// 없이 인라인 SVG에 transform/filter/clip-path 등을 적용.
// "다른 폰트로 다시 타이핑" 항목은 §8.2 텍스트 자유 조판 영역으로
// 이전되어 이 목록에서 제외 — variant 'font' case 제거됨.
function BadExample({ variant }) {
  // 회사 로고와 합쳐(#10): 워드마크 + "×" + 가짜 회사 배지.
  if (variant === 'merge') {
    return (
      <span className={`lg-bad lg-bad-${variant}`} aria-hidden="true">
        <KimesWordmark height={22} />
        <span className="lg-bad-merge-plus">×</span>
        <span className="lg-bad-merge-co">CO.</span>
      </span>
    );
  }
  // 쐐기 제거(#2): 워드마크 위에 흰 사각형 오버레이로 i의 검은 쐐기 가림.
  if (variant === 'wedge') {
    return (
      <span className={`lg-bad lg-bad-${variant}`} aria-hidden="true">
        <KimesWordmark height={28} />
        <span className="lg-bad-wedge-cover" />
      </span>
    );
  }
  // 나머지는 KIMES 워드마크에 CSS 클래스만 부착.
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
function WarnGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9"  x2="12"    y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
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

// 연도 일체형 워드마크는 사무국이 단일 SVG 자산으로 별도 제공. 코드 합성
// 방식(KimesYearComposite)은 자간·베이스라인·시각 무게가 정확히 안 맞아
// 제거됨. 필요하면 사무국 brand 문의로 SVG 자산 요청.

window.LogoPage = LogoPage;

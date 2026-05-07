// §6 — /logo. KIMES 워드마크를 정확하게 다운로드하고, 어떤 상황에 어떤
// 버전을 써야 하는지 알린다. 변형·재타이핑·임의 색상 변경을 명확히 막는다.
//
// Sub-commit 단위 진행:
//   §6.2.1 워드마크 + §6.2.2 5개 버전 카드      ← sub-1
//   §6.2.3 클리어 스페이스 + §6.2.4 최소 크기 +
//   §6.2.5 배경별 사용 매트릭스                 ← 이 커밋
//   §6.2.6 Don'ts 12종 + §6.2.7 사용 신청 박스 ← 다음 커밋

const PageShell = window.PageShell;
const Link = window.Link;
const KimesWordmark = window.KimesWordmark;
const InlineLogo = window.InlineLogo;

// 5개 로고 버전. 각 카드: SVG 키 + 라벨 + 용도 + 다운로드 파일명.
// 파일은 /assets/logos/ 안에 위치 (벤더 제공 자산 — 본 리포에 미포함된
// 경우 링크가 404 반환할 수 있음. Phase 4 자산 패키지 정리 시 일괄 검증).
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
  {
    id: 'year',
    name: '연도 일체형 (KIMES 2027)',
    use: '행사 직전 발표·초청장',
    // 연도는 행사 메타에서 동적으로 가져와 KIMES 워드마크에 결합.
    // 매년 회차 갱신 시 config.js만 수정하면 새 연도가 반영됨.
    svgKey: 'kimes-year-composite',
    tile: 'tile-light',
    base: 'kimes-2027-logo',
  },
];

const FILE_FORMATS = [
  { ext: 'svg', label: 'SVG' },
  { ext: 'png', label: 'PNG' },
  { ext: 'ai',  label: 'AI'  },
  { ext: 'eps', label: 'EPS' },
];

// §6.2.5 배경별 사용 매트릭스 — 9행. 각 행: 배경 / 권장 버전 / 비고 / 상태.
// 상태 'ok'는 권장(✓), 'no'는 회피·금지(✗). 색만으로 의미 전달하지 않도록
// 아이콘 + 텍스트 라벨 병기 (§21.2).
const BG_MATRIX = [
  { bg: '흰색 또는 밝은 단색 (밝기 ≥ 70%)', ver: '기본 (레드)',                        note: '가장 일반적인 사용 케이스',  status: 'ok' },
  { bg: '중간 명도 단색 (40~60%)',           ver: '가급적 회피 — 사용 시 사전 승인',  note: '가독성 저하',               status: 'no' },
  { bg: '어두운 단색 (≤ 30%)',                ver: '화이트',                           note: '기본 레드 사용 금지',        status: 'ok' },
  { bg: '빨간색 배경',                        ver: '화이트',                           note: '기본 레드 절대 금지',        status: 'ok' },
  { bg: '회사 브랜드 컬러 위',                ver: '화이트 (밝은 회사 색이면 블랙)',   note: '명도 대비 우선',             status: 'ok' },
  { bg: '단색 인쇄·팩스',                     ver: '블랙',                             note: '컬러 출력 불가 환경',        status: 'ok' },
  { bg: '밝고 단순한 사진',                   ver: '기본 (레드)',                      note: '클리어 스페이스 확보 필수', status: 'ok' },
  { bg: '어두운 사진',                        ver: '화이트',                           note: '명도 대비 충분한 영역에만', status: 'ok' },
  { bg: '복잡하고 디테일 많은 사진',          ver: '단색 플레이트 위에 올려 사용',     note: '직접 얹지 않음',             status: 'no' },
];

const MIN_SIZES = [
  { label: '디지털', value: '80 px', hint: '이메일 서명·웹 푸터·SNS 카드 등 화면 표기' },
  { label: '인쇄',   value: '24 mm', hint: '명함·리플렛·리포트 표지 등 종이 매체' },
  { label: '사이니지·대형 인쇄', value: '제한 없음', hint: '단, 명도·해상도 사전 확인 권장' },
];

function LogoPage() {
  const event = window.KIMES_EVENT.event;
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';

  return (
    <PageShell
      eyebrow="02"
      title="로고"
      lede="KIMES 워드마크의 정식 자산을 다운로드하고, 어떤 상황에서 어떤 버전을 써야 하는지 확인하세요. 변형·재타이핑·임의 색상 변경은 가이드 위반에 해당합니다."
    >
      {/* §6.2.1 KIMES 워드마크 ----------------------------------------- */}
      <h2 id="wordmark">KIMES 워드마크</h2>
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
      <h2 id="versions">로고 버전</h2>
      <p>
        용도에 맞는 버전을 선택해 다운로드하세요. SVG는 디지털·웹 표준,
        PNG는 빠른 미리보기·메신저 첨부, AI/EPS는 인쇄·간판 작업용입니다.
      </p>
      <div className="lg-versions">
        {LOGO_VERSIONS.map(v => (
          <LogoVersionCard
            key={v.id}
            version={v}
            year={event.year}
            assetStatus={assetStatus}
          />
        ))}
      </div>
      <p className="lg-versions-foot">
        해상도: 벡터 / 컬러모드: SVG = sRGB · AI = CMYK + Pantone 185 C 별색
      </p>

      {/* §6.2.3 클리어 스페이스 ---------------------------------------- */}
      <h2 id="clearspace">클리어 스페이스</h2>
      <p>
        워드마크 사방으로 K 높이만큼의 빈 영역을 반드시 확보합니다. 이 영역
        안에는 다른 로고·문구·이미지가 들어갈 수 없습니다.
      </p>
      <ClearSpaceDiagram />

      {/* §6.2.4 최소 크기 ---------------------------------------------- */}
      <h2 id="minsize">최소 크기</h2>
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

      {/* §6.2.5 배경별 사용 매트릭스 ------------------------------------ */}
      <h2 id="bg-matrix">배경별 사용 매트릭스</h2>
      <p>
        배경 종류에 맞는 워드마크 버전입니다. 가독성·인쇄 적합성·법적 안전성
        모두를 고려한 권장입니다. 어떤 배경에 어떤 버전을 써야 할지 모를
        때 이 표를 먼저 확인하세요.
      </p>
      <BgMatrix rows={BG_MATRIX} />
      <div className="lg-matrix-legend" aria-hidden="true">
        <span className="lg-matrix-status status-ok"><CheckGlyph /> 권장</span>
        <span className="lg-matrix-status status-no"><CrossGlyph /> 회피·금지</span>
      </div>
    </PageShell>
  );
}

function LogoVersionCard({ version, year, assetStatus }) {
  const pending = assetStatus !== 'ready';
  return (
    <div className={`lg-card ${version.tile}`}>
      <div className="lg-card-tile">
        {version.svgKey === 'kimes-year-composite'
          ? <KimesYearComposite year={year} height={44} />
          : <InlineLogo name={version.svgKey} height={36} ariaLabel={`KIMES — ${version.name}`} />
        }
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
                aria-label={`${version.name} ${f.label} — 자산 준비 중`}
                title="자산 준비 중"
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
          <div className="lg-card-pending">자산 준비 중 · Coming soon</div>
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

// 배경별 사용 매트릭스 — 데스크탑은 표, 모바일(≤720px)은 카드 리스트로
// 자동 변환 (CSS 미디어 쿼리). 각 행에 ✓/✗ 아이콘 + 텍스트 라벨 병기.
function BgMatrix({ rows }) {
  return (
    <div className="lg-matrix-wrap">
      <table className="lg-matrix" role="table">
        <thead>
          <tr>
            <th scope="col" className="lg-matrix-th-status">
              <span className="visually-hidden">상태</span>
            </th>
            <th scope="col">배경</th>
            <th scope="col">권장 버전</th>
            <th scope="col">비고</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`lg-matrix-row status-${r.status}`}>
              <td className="lg-matrix-status-cell" aria-label={r.status === 'ok' ? '권장' : '회피·금지'}>
                {r.status === 'ok' ? <CheckGlyph /> : <CrossGlyph />}
              </td>
              <td className="lg-matrix-bg">{r.bg}</td>
              <td className="lg-matrix-ver">{r.ver}</td>
              <td className="lg-matrix-note">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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

// 연도 일체형 워드마크 — KIMES 워드마크 + 행사 연도(검정)를 가로로 결합.
// 벤더 제공 SVG가 없을 때(또는 회차 갱신 직후)도 정확한 연도를 보여줄
// 수 있도록 컴포지트로 구성.
function KimesYearComposite({ year, height = 44 }) {
  return (
    <span className="lg-year-lockup" style={{ height }}>
      <KimesWordmark height={height * 0.92} />
      <span
        className="lg-year-num"
        style={{ fontSize: height * 0.95, lineHeight: 1 }}
      >
        {year}
      </span>
    </span>
  );
}

window.LogoPage = LogoPage;

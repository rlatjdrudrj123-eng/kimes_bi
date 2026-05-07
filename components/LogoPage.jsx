// §6 — /logo. KIMES 워드마크를 정확하게 다운로드하고, 어떤 상황에 어떤
// 버전을 써야 하는지 알린다. 변형·재타이핑·임의 색상 변경을 명확히 막는다.
//
// Sub-commit 단위 진행:
//   §6.2.1 워드마크 + §6.2.2 5개 버전 카드      ← 이 커밋
//   §6.2.3 클리어 스페이스 + §6.2.4 최소 크기 +
//   §6.2.5 배경별 사용 매트릭스                 ← 다음 커밋
//   §6.2.6 Don'ts 12종 + §6.2.7 사용 신청 박스 ← 그 다음 커밋

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

function LogoPage() {
  const event = window.KIMES_EVENT.event;

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
          <LogoVersionCard key={v.id} version={v} year={event.year} />
        ))}
      </div>
      <p className="lg-versions-foot">
        해상도: 벡터 / 컬러모드: SVG = sRGB · AI = CMYK + Pantone 185 C 별색
      </p>
    </PageShell>
  );
}

function LogoVersionCard({ version, year }) {
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
            <a
              key={f.ext}
              href={`/assets/logos/${version.base}.${f.ext}`}
              className="btn btn-sm btn-outline"
              download
            >
              {f.label}
            </a>
          ))}
        </div>
      </div>
    </div>
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

// §7 — /color. 참가업체가 자기 인쇄소·디자인 팀에 정확한 색 값을 넘길 수
// 있게 한다. 디지털·인쇄 모두 커버.
//
// 명세 §7.2 4개 섹션:
//   §7.2.1 메인 컬러 2종 (KIMES Red, KIMES Black) — 큰 카드
//   §7.2.2 보조 그레이 1종 — 작은 카드
//   §7.2.3 색 사용 원칙 (3줄)
//   §7.2.4 다운로드 (.ase, Sketch, Figma, CSS 스니펫)
//
// 컬러 값은 components/config.js의 KIMES_EVENT.colors 단일 출처에서 읽음.
// /logo 카드 하단의 Pantone 표기와 동일한 값을 공유 — 두 곳 모두 한 번에
// 갱신 가능.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const CopyButton = window.CopyButton;

// 메인 컬러 카드 표시용 메타데이터. config.colors의 값 형식(rgb/cmyk
// 배열)을 표시 문자열로 정규화하고, 카드별 이름·용도를 부착.
function formatRgb(arr)  { return arr.join(', '); }
function formatCmyk(arr) { return arr.join(' / '); }

function buildColor(spec, meta) {
  return {
    ...meta,
    hex:     spec.hex.toUpperCase(),
    rgb:     formatRgb(spec.rgb),
    cmyk:    formatCmyk(spec.cmyk),
    pantone: spec.pantone || null,
  };
}

const DOWNLOAD_ITEMS = [
  { id: 'ase',    label: 'Adobe Swatch',  ext: '.ase',           hint: 'Illustrator·Photoshop·InDesign 호환',  file: 'kimes-colors.ase',           action: 'download' },
  { id: 'sketch', label: 'Sketch 팔레트', ext: '.sketchpalette', hint: 'Sketch 앱에서 직접 가져오기',          file: 'kimes-colors.sketchpalette', action: 'download' },
  { id: 'figma',  label: 'Figma 라이브러리', ext: '외부',         hint: 'Figma 커뮤니티 라이브러리 링크',        url: 'https://figma.com',           action: 'open' },
];

function ColorPage() {
  const { colors, event } = window.KIMES_EVENT;
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';

  const RED   = buildColor(colors.red,   { id: 'red',   name: 'KIMES Red',    usage: '헤드라인 · CTA · 워드마크 · 강조' });
  const BLACK = buildColor(colors.black, { id: 'black', name: 'KIMES Black',  usage: '본문 텍스트 · 보조 표면 · 텍스트' });
  const GRAY  = buildColor(colors.gray,  { id: 'gray',  name: 'Neutral Gray', usage: '비활성 텍스트 · 디바이더 · 메타정보' });

  const cssSnippet = `:root {
  --kimes-red:   ${colors.red.hex};
  --kimes-black: ${colors.black.hex};
  --kimes-gray:  ${colors.gray.hex};
}`;

  return (
    <PageShell
      eyebrow="03"
      title="Color"
      subtitle="컬러"
      lede="참가업체가 인쇄소·디자인 팀에 정확한 색 값을 넘길 수 있도록 디지털·인쇄 양쪽 모두를 정리했습니다. 각 값에는 [Copy] 버튼이 있어 클립보드에 바로 담을 수 있습니다."
    >
      {/* §7.2.1 메인 컬러 2종 ----------------------------------------- */}
      <SectionHeading id="main" title="Primary Colors" subtitle="메인 컬러" />
      <p>
        KIMES 워드마크와 공식 표기에 사용하는 두 가지 색입니다. 어느 한쪽도
        다른 색으로 대체하지 않습니다.
      </p>
      <div className="clr-cards">
        <ColorCard color={RED}   tone="light" />
        <ColorCard color={BLACK} tone="light" />
      </div>

      {/* §7.2.2 보조 그레이 ------------------------------------------- */}
      <SectionHeading id="secondary" title="Neutral" subtitle="보조 그레이" />
      <p>
        UI 안에서 정보의 위계를 구분할 때 사용합니다. KIMES 워드마크나 강조
        영역에는 사용하지 않습니다.
      </p>
      <GrayCard color={GRAY} />

      {/* §7.2.3 색 사용 원칙 ------------------------------------------ */}
      <SectionHeading id="rules" title="How to Use" subtitle="색 사용 원칙" />
      <ol className="clr-rules">
        <li>
          KIMES 컬러는 단색으로만 사용합니다. 그라디언트·글로우·드롭 섀도우
          같은 효과는 적용하지 않습니다.
        </li>
        <li>
          참가업체 자체 브랜드 컬러는 그대로 유지하세요. KIMES 컬러는 KIMES
          워드마크와 <code>"{event.nameKo} 참가"</code> 같은 공식 표기에만
          적용합니다.
        </li>
        <li>
          인쇄물은 CMYK + Pantone 별색 병기를 권장합니다. 대형 인쇄에서는
          Pantone 매칭이 더 안정적입니다.
        </li>
      </ol>

      {/* §7.2.4 다운로드 ---------------------------------------------- */}
      <SectionHeading id="downloads" title="Downloads" subtitle="다운로드" />
      <p>
        디자인 툴별 팔레트 파일과 코드용 CSS 스니펫입니다. CSS 스니펫은 별도
        자산 파일 없이 바로 복사해 사용할 수 있습니다.
      </p>
      <div className="clr-dl-grid">
        {DOWNLOAD_ITEMS.map(item => (
          <DownloadItem key={item.id} item={item} assetStatus={assetStatus} />
        ))}
      </div>
      <CssSnippet code={cssSnippet} />
    </PageShell>
  );
}

// 큰 카드 (메인 컬러용). 색면 60% 이상 + HEX·RGB·CMYK·Pantone 4행 + 용도.
function ColorCard({ color }) {
  return (
    <article className={`clr-card clr-${color.id}`}>
      <div
        className="clr-card-swatch"
        style={{ background: color.hex }}
        aria-label={`${color.name} 색면 ${color.hex}`}
      />
      <div className="clr-card-body">
        <div className="clr-card-name">{color.name}</div>
        <dl className="clr-card-meta">
          <ColorRow term="HEX"     value={color.hex}          ariaPrefix={color.name} />
          <ColorRow term="RGB"     value={color.rgb}          ariaPrefix={color.name} />
          <ColorRow term="CMYK"    value={color.cmyk}         ariaPrefix={color.name} />
          {color.pantone && (
            <ColorRow term="Pantone" value={color.pantone}    ariaPrefix={color.name} />
          )}
        </dl>
        <div className="clr-card-usage">
          <span className="clr-card-usage-label">용도</span>
          <span>{color.usage}</span>
        </div>
      </div>
    </article>
  );
}

function ColorRow({ term, value, ariaPrefix }) {
  return (
    <div className="clr-row">
      <dt className="clr-row-term">{term}</dt>
      <dd className="clr-row-value">{value}</dd>
      <dd className="clr-row-action">
        <CopyButton
          value={value}
          label="복사"
          ariaLabel={`${ariaPrefix} ${term} 값 ${value} 복사`}
        />
      </dd>
    </div>
  );
}

// 작은 가로 카드 (보조 그레이용). 색면은 작은 사각형, 메타는 인라인.
function GrayCard({ color }) {
  return (
    <article className="clr-gray-card">
      <div
        className="clr-gray-swatch"
        style={{ background: color.hex }}
        aria-label={`${color.name} 색면 ${color.hex}`}
      />
      <div className="clr-gray-body">
        <div className="clr-gray-head">
          <span className="clr-gray-name">{color.name}</span>
          <span className="clr-gray-usage">{color.usage}</span>
        </div>
        <div className="clr-gray-meta">
          <span><strong>HEX</strong> {color.hex}</span>
          <span><strong>RGB</strong> {color.rgb}</span>
          <span><strong>CMYK</strong> {color.cmyk}</span>
        </div>
      </div>
      <div className="clr-gray-actions">
        <CopyButton value={color.hex}  label="HEX"  ariaLabel={`${color.name} HEX ${color.hex} 복사`} />
        <CopyButton value={color.rgb}  label="RGB"  ariaLabel={`${color.name} RGB ${color.rgb} 복사`} />
        <CopyButton value={color.cmyk} label="CMYK" ariaLabel={`${color.name} CMYK ${color.cmyk} 복사`} />
      </div>
    </article>
  );
}

// 다운로드 항목 — pending 시 disabled 버튼 + "준비 중" 라벨, ready 시
// 정상 다운로드/외부 링크.
function DownloadItem({ item, assetStatus }) {
  const pending = assetStatus !== 'ready';
  return (
    <div className="clr-dl-card">
      <div className="clr-dl-head">
        <span className="clr-dl-label">{item.label}</span>
        <span className="clr-dl-ext">{item.ext}</span>
      </div>
      <div className="clr-dl-hint">{item.hint}</div>
      <div className="clr-dl-action">
        {pending ? (
          <button
            type="button"
            className="btn btn-md btn-outline"
            disabled
            aria-label={`${item.label} — Coming soon`}
            title="Coming soon"
          >
            {item.action === 'open' ? 'Open ↗' : 'Download'}
          </button>
        ) : item.action === 'open' ? (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-md btn-outline">
            Open ↗
          </a>
        ) : (
          <a href={`/assets/colors/${item.file}`} className="btn btn-md btn-outline" download>
            Download
          </a>
        )}
      </div>
      {pending && <div className="clr-dl-pending">Coming Soon</div>}
    </div>
  );
}

// CSS 변수 스니펫 — 정적 텍스트라 자산 상태와 무관하게 바로 복사 가능.
function CssSnippet({ code }) {
  return (
    <div className="clr-snippet">
      <div className="clr-snippet-head">
        <span className="clr-snippet-title">CSS 변수 스니펫</span>
        <CopyButton value={code} label="복사" ariaLabel="CSS 변수 스니펫 복사" />
      </div>
      <pre className="clr-snippet-code"><code>{code}</code></pre>
      <div className="clr-snippet-hint">
        프로젝트 CSS 최상단에 붙여 넣으면 <code>var(--kimes-red)</code>처럼 사용할 수 있습니다.
      </div>
    </div>
  );
}

window.ColorPage = ColorPage;

// §7 — /color. KIMES 4브랜드 컬러 시스템: Primary 3 (Red·Black·White) +
// Sub 4 (MedicomteK Blue·BEAUTY&DERMA Purple·INSPIRE Lime·Neutral Gray).
// 컬러 값은 components/config.js의 KIMES_EVENT.colors 단일 출처 — §13
// 특별관 페이지도 같은 출처 참조해 중복 정의 제거.
//
// 명세 §7.2 4개 섹션:
//   §7.2.1 Primary Colors / 메인 컬러 (3장 큰 카드)
//   §7.2.2 Sub Colors / 보조 컬러 (4장 카드 — 특별관 3 + 톤다운)
//   §7.2.3 How to Use / 색 사용 원칙 (4줄)
//   §7.2.4 Downloads / 다운로드 (.ase/Sketch/Figma + CSS 스니펫)

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const CopyButton = window.CopyButton;

function formatRgb(arr)  { return arr.join(', '); }
function formatCmyk(arr) { return arr.join(' / '); }

// config.colors의 raw 데이터(rgb/cmyk 배열, hex)를 카드 표시용 정규화.
function buildColor(spec) {
  return {
    label:   spec.label,
    hex:     spec.hex.toUpperCase(),
    rgb:     formatRgb(spec.rgb),
    cmyk:    formatCmyk(spec.cmyk),
    pantone: spec.pantone || null,
    usage:   spec.usage || null,
  };
}

const DOWNLOAD_ITEMS = [
  { id: 'ase',    label: 'Adobe Swatch',     ext: '.ase',           hint: 'Illustrator·Photoshop·InDesign 호환', file: 'kimes-colors.ase',           action: 'download' },
  { id: 'sketch', label: 'Sketch 팔레트',    ext: '.sketchpalette', hint: 'Sketch 앱에서 가져오기',              file: 'kimes-colors.sketchpalette', action: 'download' },
  { id: 'figma',  label: 'Figma 라이브러리', ext: '외부',           hint: 'Figma 커뮤니티 라이브러리 링크',       url: 'https://figma.com',           action: 'open' },
];

function ColorPage() {
  const { colors } = window.KIMES_EVENT;
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';

  const PRIMARY = [
    { id: 'red',   ...buildColor(colors.primary.red) },
    { id: 'black', ...buildColor(colors.primary.black) },
    { id: 'white', ...buildColor(colors.primary.white) },
  ];
  const SUB = [
    { id: 'mc',   ...buildColor(colors.sub.mcBlue) },
    { id: 'bd',   ...buildColor(colors.sub.bdPurple) },
    { id: 'in',   ...buildColor(colors.sub.inLime) },
    { id: 'gray', ...buildColor(colors.sub.gray) },
  ];

  const cssSnippet = `:root {
  /* Primary */
  --kimes-red:   ${colors.primary.red.hex};
  --kimes-black: ${colors.primary.black.hex};
  --kimes-white: ${colors.primary.white.hex};

  /* Sub */
  --mc-blue:    ${colors.sub.mcBlue.hex};
  --bd-purple:  ${colors.sub.bdPurple.hex};
  --in-lime:    ${colors.sub.inLime.hex};
  --kimes-gray: ${colors.sub.gray.hex};
}`;

  return (
    <PageShell
      eyebrow="03"
      title="Color"
      subtitle="컬러"
      lede="KIMES 워드마크와 공식 표기에는 Primary 3색을, 특별관 표기·톤다운에는 Sub 4색을 사용합니다. 각 값에는 [Copy] 버튼이 있어 클립보드에 바로 담을 수 있습니다."
    >
      {/* §7.2.1 Primary Colors ---------------------------------------- */}
      <SectionHeading id="primary" title="Primary Colors" subtitle="메인 컬러" />
      <p>KIMES 워드마크와 공식 표기.</p>
      <div className="clr-primary-grid">
        {PRIMARY.map(c => <PrimaryCard key={c.id} color={c} />)}
      </div>

      {/* §7.2.2 Sub Colors -------------------------------------------- */}
      <SectionHeading id="sub" title="Sub Colors" subtitle="보조 컬러" />
      <p>특별관 표기 · 톤다운.</p>
      <div className="clr-sub-grid">
        {SUB.map(c => <SubCard key={c.id} color={c} />)}
      </div>

      {/* §7.2.3 How to Use -------------------------------------------- */}
      <SectionHeading id="rules" title="How to Use" subtitle="색 사용 원칙" />
      <ol className="clr-rules">
        <li>KIMES Primary 컬러는 KIMES 워드마크와 공식 표기에 사용합니다.</li>
        <li>Sub 컬러는 특별관 표기와 톤다운 자리에 사용합니다. Primary를 대체하지 않습니다.</li>
        <li>참가업체 자체 브랜드 컬러는 그대로 유지하세요.</li>
        <li>인쇄물은 CMYK + Pantone 별색 병기를 권장합니다.</li>
      </ol>

      {/* §7.2.4 Downloads --------------------------------------------- */}
      <SectionHeading id="downloads" title="Downloads" subtitle="다운로드" />
      <p>
        디자인 툴별 팔레트 파일과 코드용 CSS 스니펫. CSS 스니펫은 자산
        파일 없이 바로 복사해 사용할 수 있습니다.
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

// Primary 카드 — 큰 색면(220px+) + HEX/RGB/CMYK/Pantone + 용도 한 줄.
function PrimaryCard({ color }) {
  const isWhite = color.id === 'white';
  return (
    <article className={`clr-card clr-${color.id}`}>
      <div
        className={`clr-card-swatch ${isWhite ? 'clr-card-swatch-white' : ''}`}
        style={{ background: color.hex }}
        aria-label={`${color.label} 색면 ${color.hex}`}
      />
      <div className="clr-card-body">
        <div className="clr-card-name">{color.label}</div>
        <dl className="clr-card-meta">
          <ColorRow term="HEX"     value={color.hex}  ariaPrefix={color.label} />
          <ColorRow term="RGB"     value={color.rgb}  ariaPrefix={color.label} />
          <ColorRow term="CMYK"    value={color.cmyk} ariaPrefix={color.label} />
          {color.pantone ? (
            <ColorRow term="Pantone" value={color.pantone} ariaPrefix={color.label} />
          ) : (
            <div className="clr-row clr-row-empty">
              <dt className="clr-row-term">Pantone</dt>
              <dd className="clr-row-value clr-row-dash">—</dd>
              <dd className="clr-row-action" aria-hidden="true" />
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}

// Sub 카드 — 100~150px 색면 + 라벨 + 한 줄 용도 + 컴팩트 메타.
function SubCard({ color }) {
  const isLight = color.id === 'in' || color.id === 'gray'; // 밝은 배경엔 검정 텍스트
  return (
    <article className={`clr-sub clr-sub-${color.id}`}>
      <div
        className={`clr-sub-swatch ${isLight ? 'is-light' : ''}`}
        style={{ background: color.hex }}
        aria-label={`${color.label} 색면 ${color.hex}`}
      >
        <span className="clr-sub-swatch-label">{color.label}</span>
      </div>
      <div className="clr-sub-body">
        <div className="clr-sub-usage">{color.usage}</div>
        <dl className="clr-sub-meta">
          <ColorRow term="HEX"     value={color.hex}  ariaPrefix={color.label} compact />
          <ColorRow term="RGB"     value={color.rgb}  ariaPrefix={color.label} compact />
          <ColorRow term="CMYK"    value={color.cmyk} ariaPrefix={color.label} compact />
          {color.pantone ? (
            <ColorRow term="Pantone" value={color.pantone} ariaPrefix={color.label} compact />
          ) : (
            <div className="clr-row clr-row-empty clr-row-compact">
              <dt className="clr-row-term">Pantone</dt>
              <dd className="clr-row-value clr-row-dash">—</dd>
              <dd className="clr-row-action" aria-hidden="true" />
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}

function ColorRow({ term, value, ariaPrefix, compact }) {
  return (
    <div className={`clr-row ${compact ? 'clr-row-compact' : ''}`}>
      <dt className="clr-row-term">{term}</dt>
      <dd className="clr-row-value">{value}</dd>
      <dd className="clr-row-action">
        <CopyButton
          value={value}
          label="Copy"
          ariaLabel={`${ariaPrefix} ${term} 값 ${value} 복사`}
        />
      </dd>
    </div>
  );
}

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

function CssSnippet({ code }) {
  return (
    <div className="clr-snippet">
      <div className="clr-snippet-head">
        <span className="clr-snippet-title">CSS Variables</span>
        <CopyButton value={code} label="Copy" ariaLabel="CSS 변수 스니펫 복사" />
      </div>
      <pre className="clr-snippet-code"><code>{code}</code></pre>
      <div className="clr-snippet-hint">
        프로젝트 CSS 최상단에 붙여 넣으면 <code>var(--kimes-red)</code>처럼 사용할 수 있습니다.
      </div>
    </div>
  );
}

window.ColorPage = ColorPage;

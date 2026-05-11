// §4 — /color (v2027.1). 메인 3색 (KIMES 공식 표기) · 보조 4색 (특별관·톤다운).

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const CopyButton = window.CopyButton;

function formatRgb(arr)  { return arr.join(' '); }
function formatCmyk(arr) { return arr.join(' '); }

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
  { id: 'ase',    label: 'Adobe Swatch',      ext: '.ase',           file: 'KIMES_Colors.ase',           action: 'download' },
  { id: 'sketch', label: 'Sketch 팔레트',     ext: '.sketchpalette', file: 'KIMES_Colors.sketchpalette', action: 'download' },
  { id: 'figma',  label: 'Figma 라이브러리',  ext: '외부',           url: 'https://figma.com',           action: 'open' },
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
  --kimes-red:   ${colors.primary.red.hex};
  --kimes-black: ${colors.primary.black.hex};
  --kimes-white: ${colors.primary.white.hex};
  --mc-blue:     ${colors.sub.mcBlue.hex};
  --bd-purple:   ${colors.sub.bdPurple.hex};
  --in-lime:     ${colors.sub.inLime.hex};
  --kimes-gray:  ${colors.sub.gray.hex};
}`;

  return (
    <PageShell
      title="컬러"
      lede="메인 3색 — KIMES 공식 표기. 보조 4색 — 특별관 · 톤다운."
    >
      {/* §4.1 메인 컬러 ---------------------------------------- */}
      <SectionHeading id="primary" title="메인 컬러" />
      <div className="clr-primary-grid">
        {PRIMARY.map(c => <PrimaryCard key={c.id} color={c} />)}
      </div>

      {/* §4.2 보조 컬러 -------------------------------------------- */}
      <SectionHeading id="sub" title="보조 컬러" />
      <div className="clr-sub-grid">
        {SUB.map(c => <SubCard key={c.id} color={c} />)}
      </div>

      {/* §4.3 사용 원칙 -------------------------------------------- */}
      <SectionHeading id="rules" title="사용 원칙" />
      <ol className="clr-rules">
        <li>메인 3색 — KIMES 워드마크와 공식 표기 자리.</li>
        <li>보조 4색 — 특별관 표기·톤다운 자리. 메인 대체 불가 (Tier 1).</li>
        <li>참가업체 자체 브랜드 컬러 — 그대로 유지.</li>
        <li>인쇄물 — CMYK + Pantone 별색 병기 권장.</li>
      </ol>

      {/* §4.4 다운로드 --------------------------------------------- */}
      <SectionHeading id="downloads" title="다운로드" />
      <div className="clr-dl-grid">
        {DOWNLOAD_ITEMS.map(item => (
          <DownloadItem key={item.id} item={item} assetStatus={assetStatus} />
        ))}
      </div>
      <CssSnippet code={cssSnippet} />
    </PageShell>
  );
}

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

function SubCard({ color }) {
  const isLight = color.id === 'in' || color.id === 'gray';
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
          label="복사"
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
      <div className="clr-dl-action">
        {pending ? (
          <button
            type="button"
            className="btn btn-md btn-outline"
            disabled
            aria-label={`${item.label} — Coming soon`}
            title="Coming soon"
          >
            {item.action === 'open' ? '열기 ↗' : '다운로드'}
          </button>
        ) : item.action === 'open' ? (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-md btn-outline">
            열기 ↗
          </a>
        ) : (
          <a href={`/assets/colors/${item.file}`} className="btn btn-md btn-outline" download>
            다운로드
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
        <CopyButton value={code} label="복사" ariaLabel="CSS 변수 스니펫 복사" />
      </div>
      <pre className="clr-snippet-code"><code>{code}</code></pre>
    </div>
  );
}

window.ColorPage = ColorPage;

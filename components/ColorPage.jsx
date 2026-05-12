// §3 — /color (v2027.1). Primary 3 (Red·Black·White) + Sub 4
// (MedicomteK Blue·BEAUTY&DERMA Purple·INSPIRE Lime·Gray).
// 컬러 값은 components/config.js의 KIMES_EVENT.colors 단일 출처.
//
// 2개 섹션:
//   §3.1 Primary Colors / 메인 컬러 (3장 큰 카드)
//   §3.2 Sub Colors / 보조 컬러 (4장 카드)

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const CopyButton = window.CopyButton;

function formatRgb(arr)  { return arr.join(', '); }
function formatCmyk(arr) { return arr.join(' / '); }

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

function ColorPage() {
  const { colors } = window.KIMES_EVENT;

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

  return (
    <PageShell
      eyebrow="03"
      title="Color"
      subtitle="컬러"
      lede="Primary 3색은 로고·공식 표기용. Sub 4색은 특별관 표기용. [Copy] 버튼으로 복사."
    >
      {/* §3.1 Primary Colors ---------------------------------------- */}
      <SectionHeading id="primary" title="Primary Colors" subtitle="메인 컬러" />
      <p>KIMES 로고와 공식 표기.</p>
      <div className="clr-primary-grid">
        {PRIMARY.map(c => <PrimaryCard key={c.id} color={c} />)}
      </div>

      {/* §3.2 Sub Colors -------------------------------------------- */}
      <SectionHeading id="sub" title="Sub Colors" subtitle="보조 컬러" />
      <p>특별관 표기.</p>
      <div className="clr-sub-grid">
        {SUB.map(c => <SubCard key={c.id} color={c} />)}
      </div>
    </PageShell>
  );
}

// Primary 카드 — 큰 색면 + HEX/RGB/CMYK/Pantone.
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

// Sub 카드 — 작은 색면 + 라벨 + 한 줄 용도 + 컴팩트 메타.
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
          label="Copy"
          ariaLabel={`${ariaPrefix} ${term} 값 ${value} 복사`}
        />
      </dd>
    </div>
  );
}

window.ColorPage = ColorPage;

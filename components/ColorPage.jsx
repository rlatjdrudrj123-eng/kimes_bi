// §4 — /color (v2027.1). Primary 3 (Red·Black·White) + Sub 4
// (MedicomteK Blue·BEAUTY&DERMA Purple·INSPIRE Lime·Neutral Gray).
// 컬러 값은 components/config.js의 KIMES_EVENT.colors 단일 출처.
//
// 3개 섹션:
//   §4.1 Primary Colors / 메인 컬러 (3장 큰 카드)
//   §4.2 Sub Colors / 보조 컬러 (4장 카드)
//   §4.3 How to Use / 색 사용 원칙
//   + CSS·SCSS 변수 코드 블록 (개발자용)

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
      lede="Primary 3색은 로고·공식 표기용. Sub 4색은 특별관 표기·톤다운용. [Copy] 버튼으로 복사."
    >
      {/* §7.2.1 Primary Colors ---------------------------------------- */}
      <SectionHeading id="primary" title="Primary Colors" subtitle="메인 컬러" />
      <p>KIMES 로고와 공식 표기.</p>
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
        <li>KIMES Primary 컬러는 KIMES 로고와 공식 표기에 사용합니다.</li>
        <li>Sub 컬러는 특별관 표기와 톤다운 자리에 사용합니다. Primary를 대체하지 않습니다.</li>
        <li>참가업체 자체 브랜드 컬러는 그대로 유지하세요.</li>
        <li>인쇄물은 CMYK + Pantone 별색 병기를 권장합니다.</li>
      </ol>

      {/* §4.4 CSS Variables (Downloads 섹션 삭제, CSS 블록만 유지) */}
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

function CssSnippet({ code }) {
  return (
    <div className="clr-snippet">
      <div className="clr-snippet-head">
        <span className="clr-snippet-title">CSS·SCSS 변수 <span className="clr-snippet-aud">(개발자용)</span></span>
        <CopyButton value={code} label="Copy" ariaLabel="CSS 변수 스니펫 복사" />
      </div>
      <pre className="clr-snippet-code"><code>{code}</code></pre>
      <div className="clr-snippet-hint">
        프로젝트 CSS 최상단에 삽입. <code>var(--kimes-red)</code> 형식으로 사용.
      </div>
    </div>
  );
}

window.ColorPage = ColorPage;

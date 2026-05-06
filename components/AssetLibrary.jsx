/* eslint-disable */
/**
 * Asset library — section 11 (final FOUNDATIONS page).
 * Five subsections: logos, color values, type, request/approval, version.
 *
 * All download/copy buttons are visual only — no real I/O. Their job is to
 * communicate the affordance ("files are available, contact brand team for
 * access").
 */

const ASSET_FONT_KR = "var(--font-kr)";
const ASSET_FONT_M  = "var(--font-sans)";

/* ---------- Tile primitives ---------- */

function FormatPills({ formats = ['SVG', 'PNG', 'AI'], filename }) {
  return (
    <div className="al-pills">
      {formats.map(f => (
        <a key={f} href="#" className="al-pill" aria-label={`Download ${filename} as ${f}`}>
          {f}
        </a>
      ))}
    </div>
  );
}

function LogoTile({ logoName, label, filename, bg = '#fff', formats }) {
  return (
    <div className="al-tile">
      <div className="al-tile-stage" style={{ background: bg }}>
        <InlineLogo name={logoName} height={28} />
      </div>
      <div className="al-tile-meta">
        <div className="al-tile-name">{label}</div>
        <div className="al-tile-file">{filename}</div>
        <FormatPills formats={formats} filename={filename} />
      </div>
    </div>
  );
}

/* ---------- 11.1 Logo files ---------- */

const KIMES_VARIANTS = [
  { logo: 'kimes',      label: 'Primary',      file: 'kimes-logo.svg' },
  { logo: 'kimes2026',  label: 'With year (2026)', file: 'kimes-logo-2026.svg' },
  { logo: 'kimesWhite', label: 'White',        file: 'kimes-logo-white.svg', bg: '#231815' },
  { logo: 'kimesBlack', label: 'Black',        file: 'kimes-logo-black.svg' },
  { logo: 'kimesGray',  label: 'Gray',         file: 'kimes-logo-gray.svg' },
];

const MC_VARIANTS = [
  { logo: 'mc',      label: 'Primary',          file: 'medicomtek-logo.svg' },
  { logo: 'mc2026',  label: 'With year (2026)', file: 'medicomtek-logo-2026.svg' },
  { logo: 'mcWhite', label: 'White',            file: 'medicomtek-logo-white.svg', bg: '#036EB8' },
  { logo: 'mcBlack', label: 'Black',            file: 'medicomtek-logo-black.svg' },
  { logo: 'mcGray',  label: 'Gray',             file: 'medicomtek-logo-gray.svg' },
];

const BD_VARIANTS = [
  { logo: 'bdSeoul', label: 'Horizontal',   file: 'beauty-derma-logo.svg' },
  { logo: 'bdStack', label: '3-line stack', file: 'beauty-derma-logo-stack.svg' },
  { logo: 'bdWhite', label: 'White',        file: 'beauty-derma-logo-white.svg', bg: '#5D3B8B' },
  { logo: 'bdBlack', label: 'Black',        file: 'beauty-derma-logo-black.svg' },
  { logo: 'bdGray',  label: 'Gray',         file: 'beauty-derma-logo-gray.svg' },
];

const IN_VARIANTS = [
  { logo: 'inShort',         label: 'Short',         file: 'inspire-logo-short.svg' },
  { logo: 'inStack',         label: '2-line',        file: 'inspire-logo-stack.svg' },
  { logo: 'inTagline',       label: 'With tagline',  file: 'inspire-logo-tagline.svg' },
  { logo: 'inLimeShort',     label: 'Lime — short',  file: 'inspire-logo-lime-short.svg', bg: '#231815' },
  { logo: 'inLimeStack',     label: 'Lime — stack',  file: 'inspire-logo-lime-stack.svg', bg: '#231815' },
  { logo: 'inLimeTagline',   label: 'Lime — tagline',file: 'inspire-logo-lime-tagline.svg', bg: '#231815' },
  { logo: 'inTaglineBlack',  label: 'Black',         file: 'inspire-logo-black.svg' },
  { logo: 'inTaglineGray',   label: 'Gray',          file: 'inspire-logo-gray.svg' },
];

function BrandLogoSection({ id, label, dot, variants }) {
  return (
    <div className="al-brand">
      <div className="al-brand-head">
        <span className="al-dot" style={{ background: dot }} aria-hidden="true"></span>
        <h4>{label}</h4>
        <span className="al-count">{variants.length} variants</span>
      </div>
      <div className="al-brand-grid">
        {variants.map(v => (
          <LogoTile
            key={v.logo}
            logoName={v.logo}
            label={v.label}
            filename={v.file}
            bg={v.bg}
          />
        ))}
      </div>
    </div>
  );
}

function LogoFiles() {
  return (
    <div id="al-logos" className="subsection">
      <h3>13.1 — Logo files</h3>
      <p className="desc">
        Vector wordmarks for all four KIMES sub-brands. SVG is the default
        for digital; AI files are reserved for print production.
      </p>
      <BrandLogoSection label="KIMES"        dot="#E60012" variants={KIMES_VARIANTS} />
      <BrandLogoSection label="MedicomteK"   dot="#036EB8" variants={MC_VARIANTS} />
      <BrandLogoSection label="Beauty&Derma" dot="#5D3B8B" variants={BD_VARIANTS} />
      <BrandLogoSection label="INSPIRE Digital Health" dot="#BFD633" variants={IN_VARIANTS} />
    </div>
  );
}

/* ---------- 11.2 Color values ---------- */

const COLOR_ROWS = [
  { name: 'KIMES Red',           token: '--kimes-red',        hex: '#E60012', rgb: '230, 0, 18',     cmyk: '0 / 100 / 100 / 0' },
  { name: 'KIMES Black',         token: '--kimes-black',      hex: '#231815', rgb: '35, 24, 21',     cmyk: '0 / 0 / 0 / 100' },
  { name: 'MedicomteK Blue',     token: '--mc-blue',          hex: '#036EB8', rgb: '3, 110, 184',    cmyk: '85 / 50 / 0 / 0' },
  { name: 'Beauty&Derma Purple', token: '--bd-purple',        hex: '#5D3B8B', rgb: '93, 59, 139',    cmyk: '78 / 90 / 0 / 0' },
  { name: 'Beauty&Derma Light',  token: '--bd-light-purple',  hex: '#BAB1D7', rgb: '186, 177, 215',  cmyk: '30 / 30 / 0 / 0' },
  { name: 'INSPIRE Gray',        token: '--in-gray',          hex: '#595757', rgb: '89, 87, 87',     cmyk: '0 / 0 / 0 / 80' },
  { name: 'INSPIRE Lime',        token: '--in-lime',          hex: '#BFD633', rgb: '191, 214, 51',   cmyk: '30 / 0 / 90 / 0' },
  { name: 'Neutral Black',       token: '--neutral-black',    hex: '#231815', rgb: '35, 24, 21',     cmyk: '0 / 0 / 0 / 100' },
  { name: 'Neutral Gray K40',    token: '--neutral-gray',     hex: '#A7A9AC', rgb: '167, 169, 172',  cmyk: '0 / 0 / 0 / 40' },
];

function ColorValues() {
  return (
    <div id="al-colors" className="subsection">
      <h3>13.2 — Color values</h3>
      <p className="desc">
        Reference values for digital and print production. HEX and RGB are
        primary for screen; CMYK for offset and large-format printing.
      </p>
      <div className="al-color-table">
        <div className="al-color-head">
          <span></span>
          <span>Brand color</span>
          <span>Token</span>
          <span>HEX</span>
          <span>RGB</span>
          <span>CMYK</span>
          <span></span>
        </div>
        {COLOR_ROWS.map(r => (
          <div className="al-color-row" key={r.token}>
            <span className="al-swatch" style={{ background: r.hex }} aria-hidden="true"></span>
            <span className="al-color-name">{r.name}</span>
            <span className="mono">{r.token}</span>
            <span className="mono">{r.hex}</span>
            <span className="mono">{r.rgb}</span>
            <span className="mono">{r.cmyk}</span>
            <a href="#" className="al-copy" aria-label={`Copy ${r.hex}`}>Copy HEX</a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 11.3 Typography ---------- */

function TypographyAssets() {
  return (
    <div id="al-type" className="subsection">
      <h3>13.3 — Typography</h3>
      <p className="desc">
        Both KIMES brand typefaces are open-source and freely available.
        Use the variable font versions wherever possible.
      </p>
      <div className="al-type-grid">
        <div className="al-type-card">
          <div className="al-type-spec" style={{ fontFamily: ASSET_FONT_M }}>
            <div className="al-type-name">Montserrat</div>
            <div className="al-type-sample" style={{ fontWeight: 900 }}>Aa Bb 123</div>
            <div className="al-type-weights">
              <span style={{ fontWeight: 400 }}>Regular</span>
              <span style={{ fontWeight: 500 }}>Medium</span>
              <span style={{ fontWeight: 600 }}>SemiBold</span>
              <span style={{ fontWeight: 700 }}>Bold</span>
              <span style={{ fontWeight: 800 }}>ExtraBold</span>
              <span style={{ fontWeight: 900 }}>Black</span>
            </div>
          </div>
          <div className="al-type-meta">
            <div className="al-type-role">Latin · Numerals · Brand wordmarks</div>
            <div className="al-type-desc">
              Open-source font available from Google Fonts.
            </div>
            <a href="https://fonts.google.com/specimen/Montserrat" target="_blank" rel="noopener noreferrer" className="al-link">
              Download Montserrat ↗
            </a>
          </div>
        </div>

        <div className="al-type-card">
          <div className="al-type-spec" style={{ fontFamily: ASSET_FONT_KR }}>
            <div className="al-type-name">Pretendard</div>
            <div className="al-type-sample" style={{ fontWeight: 800 }}>한글 Aa 123</div>
            <div className="al-type-weights">
              <span style={{ fontWeight: 400 }}>Regular</span>
              <span style={{ fontWeight: 500 }}>Medium</span>
              <span style={{ fontWeight: 600 }}>SemiBold</span>
              <span style={{ fontWeight: 700 }}>Bold</span>
              <span style={{ fontWeight: 800 }}>ExtraBold</span>
              <span style={{ fontWeight: 900 }}>Black</span>
            </div>
          </div>
          <div className="al-type-meta">
            <div className="al-type-role">Korean · Hangul · Mixed body</div>
            <div className="al-type-desc">
              Open-source font available on GitHub.
            </div>
            <a href="https://github.com/orioncactus/pretendard" target="_blank" rel="noopener noreferrer" className="al-link">
              Download Pretendard ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 11.4 Asset request & approval ---------- */

function ApprovalCallout() {
  return (
    <div id="al-approval" className="subsection">
      <h3>13.4 — Asset request &amp; approval</h3>
      <div className="al-callout">
        <div className="al-callout-head">
          <span className="al-callout-mark" aria-hidden="true">!</span>
          <div>
            <div className="al-callout-title-kr" style={{ fontFamily: ASSET_FONT_KR }}>
              외부 사용 시 사전 승인
            </div>
            <div className="al-callout-title-en">External use requires approval</div>
          </div>
        </div>

        <div className="al-callout-body">
          <p style={{ fontFamily: ASSET_FONT_KR }}>
            본 시스템의 자산은 KIMES 브랜드팀의 승인 후 사용 가능합니다.
          </p>
          <p>
            KIMES brand assets are available for use only after approval from
            the KIMES brand team.
          </p>
        </div>

        <div className="al-callout-rows">
          <div className="al-callout-row">
            <span className="al-callout-key">
              <span style={{ fontFamily: ASSET_FONT_KR }}>문의</span>
              <span className="sep">/</span>
              <span>Contact</span>
            </span>
            <a href="mailto:brand@kimes.kr" className="al-callout-val mono">brand@kimes.kr</a>
          </div>
          <div className="al-callout-row">
            <span className="al-callout-key">
              <span style={{ fontFamily: ASSET_FONT_KR }}>승인 검토 기간</span>
              <span className="sep">/</span>
              <span>Review timeline</span>
            </span>
            <span className="al-callout-val">
              <span style={{ fontFamily: ASSET_FONT_KR }}>영업일 기준 3–5일</span>
              <span className="sep">/</span>
              <span>3–5 business days</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 11.5 Version & legal ---------- */

function VersionFooter() {
  return (
    <div id="al-version" className="subsection">
      <h3>13.5 — Version &amp; legal</h3>
      <div className="al-legal">
        <div className="al-legal-row">
          <span className="al-legal-key">Brand System</span>
          <span className="al-legal-val mono">v2026.0</span>
        </div>
        <div className="al-legal-row">
          <span className="al-legal-key">Last updated</span>
          <span className="al-legal-val mono">2026-05-04</span>
        </div>
        <div className="al-legal-row">
          <span className="al-legal-key">Maintained by</span>
          <span className="al-legal-val">KIMES Brand Team</span>
        </div>
        <p className="al-legal-fineprint">
          © KIMES Brand Team. All trademarks are property of their respective
          owners. KIMES, MedicomteK, Beauty&amp;Derma, and INSPIRE Digital Health
          are trademarks of the Korea Medical Devices Industry Association.
        </p>
      </div>
    </div>
  );
}

/* ---------- Page wrapper ---------- */

function AssetLibrary() {
  return (
    <section id="asset-library" className="section">
      <div className="section-eyebrow">13 — Asset library</div>
      <h2>Asset library</h2>
      <p className="lede">
        Official KIMES brand assets for download. External use requires prior
        approval from the KIMES brand team.
      </p>
      <LogoFiles />
      <ColorValues />
      <TypographyAssets />
      <ApprovalCallout />
      <VersionFooter />
    </section>
  );
}

window.AssetLibrary = AssetLibrary;

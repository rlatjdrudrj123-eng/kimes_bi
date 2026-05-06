/* eslint-disable */
/**
 * Asset library — section 13.
 *
 * All download/copy buttons are visual only — no real I/O. Their job is to
 * communicate the affordance ("files are available, contact brand team for
 * access").
 */

const useSectionContent = window.useSectionContent;
const useSiteBrand      = window.useSiteBrand;

const ASSET_FONTS = {
  sans: "var(--font-sans)",
  kr:   "var(--font-kr)",
};

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

function BrandLogoSection({ label, dot, variants, countSuffix, formats }) {
  return (
    <div className="al-brand">
      <div className="al-brand-head">
        <span className="al-dot" style={{ background: dot }} aria-hidden="true"></span>
        <h4>{label}</h4>
        <span className="al-count">{variants.length} {countSuffix}</span>
      </div>
      <div className="al-brand-grid">
        {variants.map(v => (
          <LogoTile
            key={v.logo}
            logoName={v.logo}
            label={v.label}
            filename={v.file}
            bg={v.bg}
            formats={formats}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Subsections ---------- */

function LogoFiles() {
  const c = useSectionContent('asset-library');
  const brand = useSiteBrand();
  const logos = c.logos || {};
  const allBrands = logos.brands || [];
  const brands = allBrands.filter(b => b.id === brand);
  return (
    <div id="al-logos" className="subsection">
      <h3>{logos.title}</h3>
      <p className="desc">{logos.desc}</p>
      {brands.map(b => (
        <BrandLogoSection
          key={b.id}
          label={b.label}
          dot={b.dot}
          variants={b.variants || []}
          countSuffix={logos.countSuffix || 'variants'}
          formats={logos.formats}
        />
      ))}
    </div>
  );
}

function ColorValues() {
  const c = useSectionContent('asset-library');
  const brand = useSiteBrand();
  const colors = c.colors || {};
  const headers = colors.headers || {};
  const allRows = colors.rows || [];
  // Filter rows by token prefix matching the current brand. For 'kimes',
  // also include neutral tokens (--neutral-*) which are shared across brands.
  const prefix = { kimes: '--kimes-', mc: '--mc-', bd: '--bd-', in: '--in-' }[brand] || '--kimes-';
  const rows = allRows.filter(r => r.token.startsWith(prefix) || (brand === 'kimes' && r.token.startsWith('--neutral-')));
  return (
    <div id="al-colors" className="subsection">
      <h3>{colors.title}</h3>
      <p className="desc">{colors.desc}</p>
      <div className="al-color-table">
        <div className="al-color-head">
          <span></span>
          <span>{headers.name}</span>
          <span>{headers.token}</span>
          <span>{headers.hex}</span>
          <span>{headers.rgb}</span>
          <span>{headers.cmyk}</span>
          <span></span>
        </div>
        {rows.map(r => (
          <div className="al-color-row" key={r.token}>
            <span className="al-swatch" style={{ background: r.hex }} aria-hidden="true"></span>
            <span className="al-color-name">{r.name}</span>
            <span className="mono">{r.token}</span>
            <span className="mono">{r.hex}</span>
            <span className="mono">{r.rgb}</span>
            <span className="mono">{r.cmyk}</span>
            <a href="#" className="al-copy" aria-label={`Copy ${r.hex}`}>{colors.copyLabel || 'Copy HEX'}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypographyAssets() {
  const c = useSectionContent('asset-library');
  const typo = c.typography || {};
  const fonts = typo.fonts || [];
  return (
    <div id="al-type" className="subsection">
      <h3>{typo.title}</h3>
      <p className="desc">{typo.desc}</p>
      <div className="al-type-grid">
        {fonts.map(f => (
          <div className="al-type-card" key={f.name}>
            <div className="al-type-spec" style={{ fontFamily: ASSET_FONTS[f.fontVar] || ASSET_FONTS.sans }}>
              <div className="al-type-name">{f.name}</div>
              <div className="al-type-sample" style={{ fontWeight: f.sampleWeight || 800 }}>{f.sample}</div>
              <div className="al-type-weights">
                {(f.weights || []).map(w => (
                  <span key={w.label} style={{ fontWeight: w.weight }}>{w.label}</span>
                ))}
              </div>
            </div>
            <div className="al-type-meta">
              <div className="al-type-role">{f.role}</div>
              <div className="al-type-desc">{f.desc}</div>
              <a href={f.link} target="_blank" rel="noopener noreferrer" className="al-link">{f.linkLabel}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApprovalCallout() {
  const c = useSectionContent('asset-library');
  const ap = c.approval || {};
  const rows = ap.rows || [];
  return (
    <div id="al-approval" className="subsection">
      <h3>{ap.title}</h3>
      <div className="al-callout">
        <div className="al-callout-head">
          <span className="al-callout-mark" aria-hidden="true">!</span>
          <div>
            <div className="al-callout-title-kr" style={{ fontFamily: ASSET_FONTS.kr }}>{ap.calloutTitleKr}</div>
            <div className="al-callout-title-en">{ap.calloutTitleEn}</div>
          </div>
        </div>

        <div className="al-callout-body">
          <p style={{ fontFamily: ASSET_FONTS.kr }}>{ap.bodyKr}</p>
          <p>{ap.bodyEn}</p>
        </div>

        <div className="al-callout-rows">
          {rows.map((r, i) => (
            <div className="al-callout-row" key={i}>
              <span className="al-callout-key">
                <span style={{ fontFamily: ASSET_FONTS.kr }}>{r.keyKr}</span>
                <span className="sep">/</span>
                <span>{r.keyEn}</span>
              </span>
              {r.isMail ? (
                <a href={`mailto:${r.val}`} className="al-callout-val mono">{r.val}</a>
              ) : r.val ? (
                <span className="al-callout-val">{r.val}</span>
              ) : (
                <span className="al-callout-val">
                  <span style={{ fontFamily: ASSET_FONTS.kr }}>{r.valKr}</span>
                  <span className="sep">/</span>
                  <span>{r.valEn}</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VersionFooter() {
  const c = useSectionContent('asset-library');
  const v = c.version || {};
  const rows = v.rows || [];
  return (
    <div id="al-version" className="subsection">
      <h3>{v.title}</h3>
      <div className="al-legal">
        {rows.map((r, i) => (
          <div className="al-legal-row" key={i}>
            <span className="al-legal-key">{r.key}</span>
            <span className={`al-legal-val${r.mono ? ' mono' : ''}`}>{r.value}</span>
          </div>
        ))}
        <p className="al-legal-fineprint">{v.fineprint}</p>
      </div>
    </div>
  );
}

/* ---------- Page wrapper ---------- */

function AssetLibrary() {
  const c = useSectionContent('asset-library');
  return (
    <section id="asset-library" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <LogoFiles />
      <ColorValues />
      <TypographyAssets />
      <ApprovalCallout />
      <VersionFooter />
    </section>
  );
}

window.AssetLibrary = AssetLibrary;

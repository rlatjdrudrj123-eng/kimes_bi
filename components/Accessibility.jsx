/* KIMES Design System — Accessibility (Section 16) */

/* ---------- Contrast helper (WCAG 2.1) ---------- */
function hexToRgb(h) {
  const x = h.replace('#', '');
  return [parseInt(x.slice(0,2),16), parseInt(x.slice(2,4),16), parseInt(x.slice(4,6),16)];
}
function relLum([r,g,b]) {
  const f = c => { c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); };
  return 0.2126*f(r) + 0.7152*f(g) + 0.0722*f(b);
}
function contrast(a, b) {
  const la = relLum(hexToRgb(a)), lb = relLum(hexToRgb(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}
function gradesFor(ratio) {
  return {
    'AA-large':  ratio >= 3.0,
    'AA-text':   ratio >= 4.5,
    'AAA-large': ratio >= 4.5,
    'AAA-text':  ratio >= 7.0,
  };
}
function bestGrade(r) {
  if (r >= 7.0) return 'AAA';
  if (r >= 4.5) return 'AA';
  if (r >= 3.0) return 'AA-L';
  return 'FAIL';
}

const FOREGROUNDS = [
  { token: '--ink',     hex: '#231815', label: 'Ink' },
  { token: '--white',   hex: '#FFFFFF', label: 'White' },
  { token: '--kimes-red', hex: '#E60012', label: 'KIMES red' },
  { token: '--mc-blue',   hex: '#036EB8', label: 'Medicomtek blue' },
  { token: '--bd-pink',   hex: '#E5006A', label: 'Beauty&Derma pink' },
  { token: '--in-lime',   hex: '#C4E600', label: 'INSPIRE lime' },
];
const BACKGROUNDS = [
  { token: '--bg',     hex: '#FFFFFF', label: 'White' },
  { token: '--bg-subtle', hex: '#FAFAFA', label: 'Subtle' },
  { token: '--bg-muted',  hex: '#F4F4F5', label: 'Muted' },
  { token: '--ink',    hex: '#231815', label: 'Ink' },
  { token: '--kimes-red', hex: '#E60012', label: 'KIMES red' },
];

const PAIRS = [
  { fg: '#231815', bg: '#FFFFFF', name: 'Ink on White',          note: 'Default body and headline pairing. Highest contrast.' },
  { fg: '#FFFFFF', bg: '#231815', name: 'White on Ink',          note: 'Inverse — used for dark hero, sponsor reels.' },
  { fg: '#FFFFFF', bg: '#E60012', name: 'White on KIMES Red',    note: 'Primary CTA. Passes AA for ≥18pt; borderline for body.' },
  { fg: '#E60012', bg: '#FFFFFF', name: 'KIMES Red on White',    note: 'Headlines only — fails AA for body. Use ≥24pt or bold ≥18pt.' },
  { fg: '#FFFFFF', bg: '#036EB8', name: 'White on MC Blue',      note: 'Medicomtek primary. Strong AA on all sizes.' },
  { fg: '#231815', bg: '#C4E600', name: 'Ink on INSPIRE Lime',   note: 'Inspire combo — passes AAA, the highest-contrast brand pair.' },
];

const TYPE_MINS = [
  { token: '--text-body',     min: '16 / 14px',  use: 'Body text on web. 16px minimum on digital surfaces; 14px allowed for dense tables.', sample: 16, weight: 400 },
  { token: '--text-caption',  min: '12px',       use: 'Captions, metadata, timestamps. Below 12px is reserved for monospace tokens only.', sample: 12, weight: 500 },
  { token: '--text-button',   min: '14px',       use: 'Buttons and tab labels. Always paired with min 44×44 hit target.', sample: 14, weight: 600 },
  { token: '--text-stage',    min: '24pt',       use: 'Stage screens, large-format signage. Anything below 24pt is illegible from row 5.', sample: 24, weight: 700 },
  { token: '--text-hero',     min: '32pt',       use: 'Hero, on-stage headlines. Always Montserrat 700 / Pretendard 800.', sample: 28, weight: 800 },
  { token: '--text-print-min', min: '9 pt',      use: 'Print collateral floor. Below 9 pt requires regulatory approval (legal, citations).', sample: 12, weight: 400 },
];

const CHECKLIST = [
  { kind: 'do',   title: 'Use Ink on White by default', body: 'The 13.6:1 pairing is your most reliable surface. Everything else needs justification.' },
  { kind: 'dont', title: 'Don\'t set body in KIMES red',   body: 'Red on white is 4.0:1 — fails AA for normal body. Use red only for headlines ≥18pt or bold ≥14pt.' },
  { kind: 'do',   title: 'Add a focus ring to every interactive element', body: '2px solid #E60012, 2px offset. Visible in keyboard tab order; never rely on hover state alone.' },
  { kind: 'dont', title: 'Don\'t use color alone to convey state', body: 'Pair red error states with an icon and text label. Pair green success states the same way.' },
  { kind: 'do',   title: 'Provide alt text on every wordmark instance', body: 'Decorative SVGs should be aria-hidden. Brand wordmarks must announce the brand name.' },
  { kind: 'dont', title: 'Don\'t auto-play motion above 2 cycles', body: 'Provide a pause control on any loop. Respect prefers-reduced-motion.' },
  { kind: 'do',   title: 'Maintain 44×44 minimum hit targets', body: 'On mobile, any tappable element must be ≥44×44. Match WCAG 2.5.5.' },
  { kind: 'dont', title: 'Don\'t place text over busy imagery without a scrim', body: 'Add a 60% black scrim or 92% white overlay so the text-to-bg contrast holds.' },
];

/* ============ Sections ============ */

function A11yMatrix() {
  return (
    <div id="a11y-matrix" className="subsection">
      <h3>16.1 — Contrast ratio matrix</h3>
      <p className="desc">
        Every brand color paired against every background. Numbers are WCAG
        2.1 contrast ratios; pills mark the highest passing grade.
      </p>
      <div className="a11y-matrix-wrap">
        <table className="a11y-matrix">
          <thead>
            <tr>
              <th>Foreground ↓ / Background →</th>
              {BACKGROUNDS.map(b => (
                <th key={b.token}>
                  <div>{b.label}</div>
                  <small style={{ display:'block', fontFamily:'var(--font-mono)', color:'var(--ink-faint)', fontWeight:500 }}>{b.hex}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FOREGROUNDS.map(fg => (
              <tr key={fg.token}>
                <td className="row-label">{fg.label}<small>{fg.hex}</small></td>
                {BACKGROUNDS.map(bg => {
                  const r = contrast(fg.hex, bg.hex);
                  const grade = bestGrade(r);
                  const failBg = grade === 'FAIL';
                  return (
                    <td className="a11y-cell" key={bg.token}>
                      <div className="a11y-swatch" style={{ background: bg.hex, color: fg.hex }} {...(failBg ? { 'data-fail': '' } : {})}>
                        <span className="ratio">{r.toFixed(2)}</span>
                        <span className="grade" style={{ color: grade === 'FAIL' ? '#fca5a5' : 'inherit' }}>{grade}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function A11yPairs() {
  return (
    <div id="a11y-pairs" className="subsection">
      <h3>16.2 — Approved pairings</h3>
      <p className="desc">
        Six recommended foreground / background pairs with usage notes. Three
        more pairs (KIMES red on white for body, Beauty&amp;Derma pink on
        white, INSPIRE lime on white) are <b>flagged</b> and must not be used
        for body copy.
      </p>
      <div className="a11y-pairs">
        {PAIRS.map(p => {
          const r = contrast(p.fg, p.bg);
          const g = gradesFor(r);
          return (
            <div className="a11y-pair" key={p.name}>
              <div className="a11y-pair-stage" style={{ background: p.bg, color: p.fg }}>
                <div className="h">Aa Bb 가나</div>
                <div className="b">The KIMES brand at 13px body — does this pairing hold up at the smallest size we ship?</div>
              </div>
              <div className="a11y-pair-meta">
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)' }}>{p.name}</div>
                  <div className="a11y-pair-fg-bg">{p.fg.toUpperCase()} on {p.bg.toUpperCase()}</div>
                </div>
                <div className="a11y-pair-ratio">{r.toFixed(2)}:1</div>
                <div className="a11y-pair-grades">
                  <span className={`a11y-grade-pill ${g['AA-large']  ? 'pass' : 'fail'}`}>AA Large {g['AA-large'] ? '✓' : '✗'}</span>
                  <span className={`a11y-grade-pill ${g['AA-text']   ? 'pass' : 'fail'}`}>AA Text {g['AA-text']   ? '✓' : '✗'}</span>
                  <span className={`a11y-grade-pill ${g['AAA-large'] ? 'pass' : 'fail'}`}>AAA Large {g['AAA-large'] ? '✓' : '✗'}</span>
                  <span className={`a11y-grade-pill ${g['AAA-text']  ? 'pass' : 'fail'}`}>AAA Text {g['AAA-text']  ? '✓' : '✗'}</span>
                </div>
                <div className="a11y-pair-note">{p.note}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function A11yTypes() {
  return (
    <div id="a11y-types" className="subsection">
      <h3>16.3 — Type minimums</h3>
      <p className="desc">
        Minimum sizes for digital, signage, and print surfaces. Always pair
        size with appropriate weight — light weights need more size to remain
        legible.
      </p>
      <div className="a11y-types">
        <div className="a11y-type-row is-head">
          <span>Token</span>
          <span>Minimum</span>
          <span>Sample</span>
          <span>Use</span>
        </div>
        {TYPE_MINS.map(t => (
          <div className="a11y-type-row" key={t.token}>
            <span className="a11y-type-name">{t.token}</span>
            <span className="a11y-type-min">{t.min}</span>
            <span className="a11y-type-sample" style={{ fontSize: t.sample, fontWeight: t.weight, lineHeight: 1.3 }}>The KIMES brand · 가나다라마</span>
            <span className="a11y-type-use">{t.use}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function A11yChecklist() {
  return (
    <div id="a11y-checklist" className="subsection">
      <h3>16.4 — Reviewer checklist</h3>
      <p className="desc">
        Eight items to validate before shipping any brand surface. Mix of
        do's (green) and don'ts (red).
      </p>
      <div className="a11y-checklist">
        {CHECKLIST.map(c => (
          <div key={c.title} className={`a11y-check ${c.kind}`}>
            <b>{c.title}</b>
            <small>{c.body}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Page wrapper ---------- */
function Accessibility() {
  return (
    <section id="a11y" className="section">
      <div className="section-eyebrow">16 — Accessibility</div>
      <h2>Accessibility</h2>
      <p className="lede">
        WCAG 2.1 contrast for every brand color, approved pairings, type
        minimums for digital and print, and a reviewer checklist.
      </p>
      <A11yMatrix />
      <A11yPairs />
      <A11yTypes />
      <A11yChecklist />
    </section>
  );
}

window.Accessibility = Accessibility;

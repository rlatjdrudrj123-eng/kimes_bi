/* KIMES Design System — Accessibility (Section 16) */

const useSectionContent = window.useSectionContent;

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

/* ============ Sections ============ */

function A11yMatrix() {
  const c = useSectionContent('a11y');
  const matrix = c.matrix || {};
  const foregrounds = c.foregrounds || [];
  const backgrounds = c.backgrounds || [];
  return (
    <div id="a11y-matrix" className="subsection">
      <h3>{matrix.title}</h3>
      <p className="desc">{matrix.desc}</p>
      <div className="a11y-matrix-wrap">
        <table className="a11y-matrix">
          <thead>
            <tr>
              <th>{matrix.rowHeader}</th>
              {backgrounds.map(b => (
                <th key={b.token}>
                  <div>{b.label}</div>
                  <small style={{ display:'block', fontFamily:'var(--font-mono)', color:'var(--ink-faint)', fontWeight:500 }}>{b.hex}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {foregrounds.map(fg => (
              <tr key={fg.token}>
                <td className="row-label">{fg.label}<small>{fg.hex}</small></td>
                {backgrounds.map(bg => {
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
  const c = useSectionContent('a11y');
  const pairs = c.pairs || {};
  const items = pairs.items || [];
  return (
    <div id="a11y-pairs" className="subsection">
      <h3>{pairs.title}</h3>
      <p className="desc" dangerouslySetInnerHTML={{ __html: pairs.desc || '' }} />
      <div className="a11y-pairs">
        {items.map(p => {
          const r = contrast(p.fg, p.bg);
          const g = gradesFor(r);
          return (
            <div className="a11y-pair" key={p.name}>
              <div className="a11y-pair-stage" style={{ background: p.bg, color: p.fg }}>
                <div className="h">{pairs.sampleHead}</div>
                <div className="b">{pairs.sampleBody}</div>
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
  const c = useSectionContent('a11y');
  const types = c.types || {};
  const headers = types.headers || {};
  const items = types.items || [];
  const sampleText = c.sampleText || 'The KIMES brand · 가나다라마';
  return (
    <div id="a11y-types" className="subsection">
      <h3>{types.title}</h3>
      <p className="desc">{types.desc}</p>
      <div className="a11y-types">
        <div className="a11y-type-row is-head">
          <span>{headers.token}</span>
          <span>{headers.min}</span>
          <span>{headers.sample}</span>
          <span>{headers.use}</span>
        </div>
        {items.map(t => (
          <div className="a11y-type-row" key={t.token}>
            <span className="a11y-type-name">{t.token}</span>
            <span className="a11y-type-min">{t.min}</span>
            <span className="a11y-type-sample" style={{ fontSize: t.sample, fontWeight: t.weight, lineHeight: 1.3 }}>{sampleText}</span>
            <span className="a11y-type-use">{t.use}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function A11yChecklist() {
  const c = useSectionContent('a11y');
  const checklist = c.checklist || {};
  const items = checklist.items || [];
  return (
    <div id="a11y-checklist" className="subsection">
      <h3>{checklist.title}</h3>
      <p className="desc">{checklist.desc}</p>
      <div className="a11y-checklist">
        {items.map(item => (
          <div key={item.title} className={`a11y-check ${item.kind}`}>
            <b>{item.title}</b>
            <small>{item.body}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Page wrapper ---------- */
function Accessibility() {
  const c = useSectionContent('a11y');
  return (
    <section id="a11y" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <A11yMatrix />
      <A11yPairs />
      <A11yTypes />
      <A11yChecklist />
    </section>
  );
}

window.Accessibility = Accessibility;

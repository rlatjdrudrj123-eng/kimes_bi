/* eslint-disable */
/**
 * KIMES Components — Buttons.
 *
 * Buttons live as CSS classes (.kbtn / .kbtn--primary / etc.) so they can
 * appear in any brand-themed scope without a JS dependency. The CSS itself
 * lives in components/buttons.css; this file just renders the docs page.
 *
 * Brand themes are scope classes (.theme-kimes / .theme-mc / .theme-bd /
 * .theme-in) that override --btn-* custom properties. Drop a button inside
 * any element with a theme class and it picks up the right colors.
 *
 * NOTE: visible text on every button is ALL CAPS for primary, sentence case
 * for secondary/outline/ghost. Per the brand spec.
 */
const { useState } = React;

/* ---- Generic button render helpers ---- */
function Btn({ variant = 'primary', size = 'md', state = '', className = '', children, label, ...rest }) {
  // Use forced "force-hover/active/disabled" classes to demonstrate states without
  // requiring the user to actually hover. real buttons use :hover/:active/:disabled.
  const cls = [
    'kbtn',
    `kbtn--${variant}`,
    size !== 'md' ? `kbtn--${size}` : '',
    state ? `force-${state}` : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} disabled={state === 'disabled'} {...rest}>
      {label || children}
    </button>
  );
}

/* ---- Section: intro ---- */
function ButtonsIntro() {
  return (
    <section id="buttons" className="section">
      <div className="section-eyebrow">01 — Buttons</div>
      <h2>Buttons</h2>
      <p className="lede">
        Buttons inherit their color from the active brand theme. Each
        component supports four brand themes: <strong>KIMES</strong> (red),
        <strong> MedicomteK</strong> (blue), <strong>Beauty&amp;Derma</strong> (purple),
        and <strong>INSPIRE</strong> (lime on gray). Switch themes by adding
        a single scope class — <code>.theme-kimes</code>, <code>.theme-mc</code>,
        <code>.theme-bd</code>, or <code>.theme-in</code> — to any ancestor.
      </p>
    </section>
  );
}

/* ---- Subsection: variants ---- */
function ButtonVariants() {
  const items = [
    { v: 'primary',   label: 'REGISTER NOW',  desc: 'High-emphasis CTA. ALL CAPS, brand fill.' },
    { v: 'secondary', label: 'View schedule', desc: 'Filled neutral. Pairs alongside primary in toolbars.' },
    { v: 'outline',   label: 'Add to calendar', desc: 'Stroked, brand-colored. For low-stakes actions.' },
    { v: 'ghost',     label: 'Cancel',         desc: 'No fill, no border. For tertiary / inline actions.' },
  ];
  return (
    <div id="variants" className="subsection">
      <h3>Variants</h3>
      <p className="desc">
        Four levels of emphasis. Use one primary button per surface — anything
        more dilutes the call to action.
      </p>
      <div className="btn-variants-grid theme-kimes">
        {items.map(it => (
          <div key={it.v} className="btn-variant-row">
            <div className="btn-variant-name">
              <span className="vlabel">{it.v}</span>
              <span className="vdesc">{it.desc}</span>
            </div>
            <div className="btn-variant-demo">
              <Btn variant={it.v} label={it.label} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Subsection: sizes ---- */
function ButtonSizes() {
  const sizes = [
    { s: 'sm', name: 'Small',  spec: '32px tall · 12px text' },
    { s: 'md', name: 'Medium', spec: '40px tall · 14px text · default' },
    { s: 'lg', name: 'Large',  spec: '48px tall · 16px text · landing CTAs' },
  ];
  return (
    <div id="sizes" className="subsection">
      <h3>Sizes</h3>
      <p className="desc">
        Default to <strong>Medium</strong>. Use <strong>Large</strong> for hero
        CTAs and registration flows; reserve <strong>Small</strong> for table-row
        actions and dense toolbars.
      </p>
      <div className="btn-sizes-row theme-kimes">
        {sizes.map(s => (
          <div key={s.s} className="btn-size-cell">
            <Btn variant="primary" size={s.s} label="REGISTER" />
            <div className="size-meta">
              <span className="vlabel">{s.name}</span>
              <span className="vdesc">{s.spec}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Subsection: states ---- */
function ButtonStates() {
  const states = [
    { s: '',         name: 'Default'  },
    { s: 'hover',    name: 'Hover'    },
    { s: 'active',   name: 'Active'   },
    { s: 'disabled', name: 'Disabled' },
  ];
  const variants = ['primary', 'secondary', 'outline', 'ghost'];
  return (
    <div id="states" className="subsection">
      <h3>States</h3>
      <p className="desc">
        Hover darkens the fill by ~8%. Active darkens by ~16% and shifts the
        button down 1px. Disabled drops opacity to 40% and removes the cursor.
      </p>
      <div className="btn-state-grid theme-kimes">
        <div className="state-head"></div>
        {states.map(s => (
          <div key={s.s || 'def'} className="state-head">{s.name}</div>
        ))}
        {variants.map(v => (
          <React.Fragment key={v}>
            <div className="state-row-label">{v}</div>
            {states.map(s => (
              <div key={v + s.s} className="state-cell">
                <Btn variant={v} state={s.s} label={v === 'primary' ? 'BUTTON' : 'Button'} />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ---- Subsection: brand themes ---- */
function ButtonBrandThemes() {
  const brands = [
    { theme: 'theme-kimes', name: 'KIMES',          tint: '#E60012', label: 'REGISTER' },
    { theme: 'theme-mc',    name: 'MedicomteK',     tint: '#005BAC', label: 'EXPLORE' },
    { theme: 'theme-bd',    name: 'Beauty&Derma',   tint: '#7B6FB7', label: 'JOIN' },
    { theme: 'theme-in',    name: 'INSPIRE',        tint: '#BFD633', label: 'INSPIRE', dark: true },
  ];
  return (
    <div id="brand-themes" className="subsection">
      <h3>Brand themes</h3>
      <p className="desc">
        The <em>same</em> button class — <code>.kbtn.kbtn--primary</code> — rendered
        inside each brand-theme scope. INSPIRE's primary uses lime on a dark
        gray surface; the other three use solid color on white.
      </p>
      <div className="btn-themes-row">
        {brands.map(b => (
          <div key={b.theme} className={`btn-theme-card ${b.theme} ${b.dark ? 'is-dark' : ''}`}>
            <div className="theme-card-tag">
              <span className="dot" style={{ background: b.tint }}></span>
              {b.name}
            </div>
            <Btn variant="primary" label={b.label} />
            <div className="theme-card-secondary">
              <Btn variant="secondary" size="sm" label="Secondary" />
              <Btn variant="outline"   size="sm" label="Outline" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Subsection: code tokens ---- */
function ButtonCodeTokens() {
  const rows = [
    { name: '--btn-radius',         val: '4px',           usage: 'Corner radius — matches print-graphic style' },
    { name: '--btn-padding-x',      val: '20px',          usage: 'Horizontal padding (md size)' },
    { name: '--btn-padding-y',      val: '10px',          usage: 'Vertical padding (md size)' },
    { name: '--btn-font',           val: 'Montserrat',    usage: 'Label typeface — bold weight' },
    { name: '--btn-font-weight',    val: '700',           usage: 'Bold; primary uses 800' },
    { name: '--btn-font-size',      val: '14px',          usage: 'md size · 12 / 14 / 16 across sm/md/lg' },
    { name: '--btn-tracking',       val: '0.04em',        usage: 'Letter-spacing for ALL CAPS labels' },
    { name: '--btn-primary-bg',     val: 'theme-tied',    usage: 'Brand primary fill (e.g. #E60012)' },
    { name: '--btn-primary-text',   val: '#fff or #000',  usage: 'Auto-contrasted per brand' },
    { name: '--btn-primary-hover',  val: 'darken 8%',     usage: 'oklch lightness step' },
    { name: '--btn-primary-active', val: 'darken 16%',    usage: 'oklch lightness step' },
    { name: '--btn-disabled-opacity', val: '0.4',         usage: 'Applied to entire button' },
    { name: '--btn-transition',     val: '120ms ease-out', usage: 'background + transform transition' },
  ];
  return (
    <div id="tokens" className="subsection">
      <h3>Design tokens</h3>
      <p className="desc">
        CSS custom properties exposed by <code>components/buttons.css</code>.
        Override at the theme scope to retheme without touching the
        component.
      </p>
      <div className="token-table-wrap">
        <table className="token-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.name}>
                <td className="name-cell">{r.name}</td>
                <td className="mono">{r.val}</td>
                <td className="usage">{r.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---- Hero for the Components page ---- */
function ComponentsHero() {
  return (
    <section id="components-intro" className="section hero">
      <div className="section-eyebrow">KIMES 2026 — Components</div>
      <h1>Component library</h1>
      <p className="lede">
        Themeable React + CSS components used across all four KIMES sub-brand
        properties. Every component picks up its colors from the active
        brand-theme scope; switch themes by changing a single class on any
        ancestor element.
      </p>
      <div className="meta">
        <div><span>Version</span><strong>2026.0</strong></div>
        <div><span>Theming</span><strong>4 brand scopes</strong></div>
        <div><span>Pattern</span><strong>BEM + CSS vars</strong></div>
      </div>
    </section>
  );
}

Object.assign(window, {
  ComponentsHero,
  ButtonsIntro,
  ButtonVariants,
  ButtonSizes,
  ButtonStates,
  ButtonBrandThemes,
  ButtonCodeTokens,
});

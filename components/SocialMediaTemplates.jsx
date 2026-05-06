/* eslint-disable */
/**
 * KIMES Applications — Social Media Templates.
 *
 * STRUCTURE GUIDE — never sample content. Every template renders as a
 * wireframe: dashed boundaries on placeholder zones, measurement labels
 * in red, monospace specs. Real text and imagery happen in Figma.
 */

const SCALE_FEED_MD = 0.30;   // Section-2 detail wireframe — 1080→324
const SCALE_FEED_SM = 0.20;   // Section-1 overview, Section-3 series, Section-4 brand row
const SCALE_STORY_SM = 0.13;  // Section-5 story variants — 1080×1920 @ ~140×250
const SCALE_STORY_OV = 0.20;  // Section-1 story overview

/* ---------- helpers ---------- */
function px(v) { return typeof v === 'number' ? v + 'px' : v; }
function scale(v, s) { return Math.round(v * s); }

// Wireframe canvas — sized in source pixels (1080-wide etc) but visually
// scaled by `s`. We render at the scaled size so dashed lines stay crisp.
function Canvas({ w, h, s, className = '', children }) {
  return (
    <div
      className={`wire ${className}`}
      style={{ width: scale(w, s), height: scale(h, s) }}
      data-src-w={w}
      data-src-h={h}
    >
      {children}
    </div>
  );
}

// A zone uses SOURCE pixel coords; we convert at render time using the
// inherited scale from the closest Canvas via context.
const ScaleCtx = React.createContext(1);

function ScaledCanvas({ w, h, s, className = '', children }) {
  return (
    <ScaleCtx.Provider value={s}>
      <Canvas w={w} h={h} s={s} className={className}>{children}</Canvas>
    </ScaleCtx.Provider>
  );
}

function Zone({ x, y, w, h, role, spec, className = '', children }) {
  const s = React.useContext(ScaleCtx);
  return (
    <div
      className={`wire-zone ${className}`}
      style={{
        left: scale(x, s), top: scale(y, s),
        width: scale(w, s), height: scale(h, s),
      }}
    >
      {role && <span className="role">{role}</span>}
      {spec && <span className="spec">{spec}</span>}
      {children}
    </div>
  );
}

function Margin({ inset }) {
  const s = React.useContext(ScaleCtx);
  return (
    <div
      className="wire-margin"
      style={{
        left: scale(inset, s), top: scale(inset, s),
        right: scale(inset, s), bottom: scale(inset, s),
      }}
    />
  );
}

function Dim({ x, y, children }) {
  const s = React.useContext(ScaleCtx);
  return (
    <div className="dim" style={{ left: scale(x, s), top: scale(y, s) }}>
      {children}
    </div>
  );
}

/* ============================================================
   SECTION 1 — Format overview
   ============================================================ */
function FormatOverview() {
  return (
    <section id="social" className="section app-hero">
      <div className="section-eyebrow">01 — Social media templates</div>
      <h1>Social media templates</h1>
      <p className="lede">
        Structure guide for Instagram and KakaoStory posts across all four
        KIMES sub-brands. Every template here is a wireframe — placeholder
        zones with pixel measurements, no sample content. Designers fill
        these in Figma using the typography, color, and logo rules from
        the rest of the system.
      </p>
      <div className="meta">
        <div><span>Channel</span><strong>Instagram · KakaoStory</strong></div>
        <div><span>Formats</span><strong>3 (Square · Vertical · Story)</strong></div>
        <div><span>Default</span><strong>Feed Vertical 1080×1350</strong></div>
      </div>

      <div id="formats" className="subsection">
        <h3>Format overview</h3>
        <p className="desc">
          Three approved formats. Vertical (4:5) is the KIMES default —
          it gets the largest in-feed real estate while still allowing
          square and story crops to be derived from the same artwork.
        </p>
        <div className="formats-row">
          <FormatThumb w={1080} h={1080} ratio="1:1" name="Feed Square" specs={['1080 × 1080', 'Instagram feed', 'Optional']} />
          <FormatThumb w={1080} h={1350} ratio="4:5" name="Feed Vertical" specs={['1080 × 1350', 'Instagram feed', 'KIMES default']} highlight />
          <FormatThumb w={1080} h={1920} ratio="9:16" name="Story" specs={['1080 × 1920', 'Instagram / KakaoStory', '24h ephemeral']} />
        </div>
      </div>
    </section>
  );
}

function FormatThumb({ w, h, ratio, name, specs, highlight }) {
  const s = w === 1080 && h === 1920 ? SCALE_STORY_OV : SCALE_FEED_SM;
  return (
    <div className="format-cell">
      <ScaledCanvas w={w} h={h} s={s}>
        <Margin inset={w === 1080 && h === 1920 ? 60 : 80} />
        <Zone x={w === 1080 && h === 1920 ? 60 : 80} y={w === 1080 && h === 1920 ? 250 : 80} w={300} h={80} role="LOGO" />
        <Zone x={w === 1080 && h === 1920 ? 60 : 80} y={w === 1080 && h === 1920 ? 380 : 220} w={w - (w === 1080 && h === 1920 ? 120 : 160)} h={120} role="HEADLINE" />
        <Zone x={w === 1080 && h === 1920 ? 60 : 80} y={w === 1080 && h === 1920 ? 540 : 380} w={w - (w === 1080 && h === 1920 ? 120 : 160)} h={Math.min(360, h - 600)} role="BODY" />
        {h === 1920 && <Zone className="is-ui" x={0} y={0} w={w} h={250} role="UI ZONE" />}
        {h === 1920 && <Zone className="is-ui" x={0} y={1670} w={w} h={250} role="UI ZONE" />}
        {h !== 1920 && <Zone x={w - 220} y={h - 140} w={140} h={60} role="01 / N" />}
      </ScaledCanvas>
      <div className="meta">
        <strong>{name}{highlight ? ' ★' : ''}</strong>
        {specs.map(s => <div key={s}>{s}</div>)}
        <div style={{ marginTop: 4, opacity: 0.7 }}>Ratio {ratio}</div>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 2 — Vertical feed structure (1080×1350)
   ============================================================ */
function VerticalFeedStructure() {
  const s = SCALE_FEED_MD;
  const W = 1080, H = 1350;
  return (
    <div id="vertical-structure" className="subsection">
      <h3>Vertical feed structure (1080 × 1350)</h3>
      <p className="desc">
        The KIMES default. Outer margin 80px on all sides; reserve a 120px
        bottom safe area for Instagram's caption / actions overlay. Logo
        anchors top-left, headline below, body fills the middle, page
        indicator pins bottom-right.
      </p>
      <div className="formats-row" style={{ justifyContent: 'flex-start' }}>
        <ScaledCanvas w={W} h={H} s={s}>
          <Margin inset={80} />

          {/* Bottom UI safe area */}
          <Zone className="is-ui" x={0} y={H - 120} w={W} h={120}
            role="INSTAGRAM UI — KEEP CLEAR" spec="120 px" />

          {/* Logo zone — top-left, 80px tall */}
          <Zone x={80} y={80} w={320} h={80}
            role="LOGO" spec="320 × 80 · Pretendard / Montserrat" />

          {/* Headline */}
          <Zone x={80} y={220} w={W - 160} h={220}
            role="HEADLINE" spec="Pretendard Bold 84 px · 1.1 line-height" />

          {/* Body copy */}
          <Zone x={80} y={480} w={W - 160} h={520}
            role="BODY COPY" spec="Pretendard Reg 36 px · 1.5 line-height" />

          {/* Page indicator */}
          <Zone x={W - 240} y={H - 80 - 60 - 120} w={160} h={60}
            role="PAGE / TOTAL" spec="Montserrat Bold 36 px" />

          {/* Dimensions */}
          <Dim x={W / 2 - 30} y={20}>1080 px</Dim>
          <Dim x={20} y={H / 2 - 6}>1350 px</Dim>
          <Dim x={20} y={20}>margin 80</Dim>
          <Dim x={W - 90} y={H - 110}>UI 120</Dim>
        </ScaledCanvas>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 3 — Slide series structure
   ============================================================ */
function SeriesStructure() {
  const s = SCALE_FEED_SM;
  const W = 1080, H = 1350;
  return (
    <div id="series" className="subsection">
      <h3>Slide series structure</h3>
      <p className="desc">
        Standard 6-card carousel. Roles are fixed; content varies. Designers
        plug into the structure in this order, but may skip cards 3 or 5
        when the story doesn't need them.
      </p>
      <div className="series-row">
        {/* Card 1 — COVER */}
        <SeriesCell label="COVER" desc="Full-bleed brand color, large logo + title" w={W} h={H} s={s}>
          <Zone x={0} y={0} w={W} h={H} className="is-ui" role="BRAND COLOR" spec="full bleed" />
          <Zone x={W/2-260} y={H/2-220} w={520} h={140} role="LOGO" spec="centered" />
          <Zone x={W/2-360} y={H/2-30} w={720} h={250} role="TITLE" spec="Pretendard Black 96 px" />
        </SeriesCell>

        {/* Card 2 — OPENER */}
        <SeriesCell label="OPENER" desc="Eyebrow + headline + body" w={W} h={H} s={s}>
          <Margin inset={80} />
          <Zone x={80} y={80} w={300} h={60} role="EYEBROW" spec="Mono 24" />
          <Zone x={80} y={200} w={W-160} h={260} role="HEADLINE" />
          <Zone x={80} y={540} w={W-160} h={460} role="BODY" />
        </SeriesCell>

        {/* Card 3 — STAT */}
        <SeriesCell label="STAT" desc="Single large element centered" w={W} h={H} s={s}>
          <Margin inset={80} />
          <Zone x={W/2-280} y={H/2-220} w={560} h={300} role="BIG NUMBER" spec="Montserrat Black 360 px" />
          <Zone x={W/2-200} y={H/2+120} w={400} h={80} role="LABEL" />
        </SeriesCell>

        {/* Card 4 — LIST */}
        <SeriesCell label="LIST" desc="Multiple parallel items" w={W} h={H} s={s}>
          <Margin inset={80} />
          <Zone x={80} y={80} w={W-160} h={120} role="HEADLINE" />
          <Zone x={80} y={260}  w={W-160} h={170} role="ITEM 01" />
          <Zone x={80} y={460}  w={W-160} h={170} role="ITEM 02" />
          <Zone x={80} y={660}  w={W-160} h={170} role="ITEM 03" />
          <Zone x={80} y={860}  w={W-160} h={170} role="ITEM 04" />
        </SeriesCell>

        {/* Card 5 — SUB-BRAND */}
        <SeriesCell label="SUB-BRAND" desc="Secondary brand callout" w={W} h={H} s={s}>
          <Margin inset={80} />
          <Zone x={80} y={80} w={300} h={60} role="EYEBROW" />
          <Zone x={80} y={200} w={W-160} h={200} role="HEADLINE" />
          <Zone x={80} y={H-460} w={W-160} h={300} className="is-photo"
            role="SUB-BRAND PLATE" spec="logo on solid color" />
        </SeriesCell>

        {/* Card 6 — CLOSING / CTA */}
        <SeriesCell label="CLOSING" desc="Full-bleed + logo + CTA" w={W} h={H} s={s}>
          <Zone x={0} y={0} w={W} h={H} className="is-ui" role="BRAND COLOR" spec="full bleed" />
          <Zone x={W/2-260} y={H/2-260} w={520} h={140} role="LOGO" spec="centered" />
          <Zone x={W/2-300} y={H/2-50} w={600} h={140} role="CTA HEADLINE" />
          <Zone x={W/2-200} y={H/2+150} w={400} h={120} role="ACTION" spec="@kimes2026 · kimes.kr" />
        </SeriesCell>
      </div>
    </div>
  );
}

function SeriesCell({ label, desc, w, h, s, children }) {
  return (
    <div className="series-cell">
      <ScaledCanvas w={w} h={h} s={s}>{children}</ScaledCanvas>
      <span className="role-label">{label}</span>
      <span className="desc">{desc}</span>
    </div>
  );
}

/* ============================================================
   SECTION 4 — Brand color application
   ============================================================ */
function BrandColorApplication() {
  const s = SCALE_FEED_SM;
  const W = 1080, H = 1350;
  const brands = [
    { name: 'KIMES',         hex: '#E60012', cls: 'fill-kimes', logo: 'kimesWhite' },
    { name: 'MedicomteK',    hex: '#036EB8', cls: 'fill-mc',    logo: 'mc' },
    { name: 'Beauty&Derma',  hex: '#5D3B8B', cls: 'fill-bd',    logo: 'bdWhite' },
    { name: 'INSPIRE',       hex: '#595757', cls: 'fill-in',    logo: 'inLimeTagline' },
  ];
  return (
    <div id="brand-color" className="subsection">
      <h3>Brand color application</h3>
      <p className="desc">
        Same cover wireframe rendered in each sub-brand's primary color.
        Logo zone always reverses to the high-contrast lockup —
        white for KIMES / MedicomteK / Beauty&amp;Derma, lime for INSPIRE.
      </p>
      <div className="brand-fills-row">
        {brands.map(b => (
          <div className="brand-fill-cell" key={b.name}>
            <ScaledCanvas w={W} h={H} s={s} className={`brand-fill ${b.cls}`}>
              <Zone x={W/2-260} y={H/2-220} w={520} h={180} className="logo-zone">
                {window.LOGO_SVGS && window.LOGO_SVGS[b.logo] && (
                  <svg
                    viewBox={window.LOGO_SVGS[b.logo].viewBox}
                    style={{ height: '100%', width: 'auto', maxHeight: '100%', maxWidth: '90%' }}
                    dangerouslySetInnerHTML={{ __html: window.LOGO_SVGS[b.logo].inner }}
                  />
                )}
              </Zone>
              <Zone x={W/2-360} y={H/2+20} w={720} h={250} role="TITLE" />
            </ScaledCanvas>
            <span className="name">{b.name}</span>
            <span className="swatch"><i style={{ background: b.hex }} />{b.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 5 — Story structure
   ============================================================ */
function StoryStructure() {
  const s = SCALE_STORY_SM;
  const W = 1080, H = 1920;
  return (
    <div id="story" className="subsection">
      <h3>Story structure (1080 × 1920)</h3>
      <p className="desc">
        Stories reserve <strong>250 px</strong> top and bottom for Instagram's
        profile / reply UI. The active content zone is the middle 1420 px.
        Logo can sit top-left small, or bottom-center medium when the story
        is photo-led.
      </p>
      <div className="stories-row">
        <StoryVariant label="ANNOUNCEMENT" w={W} h={H} s={s}>
          <Zone x={0} y={0} w={W} h={H} className="is-ui" role="BRAND COLOR" spec="full bleed" />
          <Zone className="is-ui" x={0} y={0} w={W} h={250} role="UI" spec="250 px reserved" />
          <Zone className="is-ui" x={0} y={H-250} w={W} h={250} role="UI" spec="250 px reserved" />
          <Zone x={60} y={310} w={300} h={70} role="LOGO" />
          <Zone x={60} y={H/2-260} w={W-120} h={520} role="HEADLINE" spec="Pretendard Black 130 px" />
          <Dim x={W/2-30} y={20}>1080</Dim>
          <Dim x={20} y={130}>UI 250</Dim>
        </StoryVariant>

        <StoryVariant label="PHOTO" w={W} h={H} s={s}>
          <Zone x={0} y={0} w={W} h={H} className="is-photo" role="PHOTO AREA" spec="full bleed" />
          <Zone className="is-ui" x={0} y={0} w={W} h={250} role="UI" />
          <Zone className="is-ui" x={0} y={H-250} w={W} h={250} role="UI" />
          <Zone x={60} y={H-560} w={W-120} h={140} role="GRADIENT MASK" spec="dark → transparent" />
          <Zone x={60} y={H-400} w={W-120} h={120} role="CAPTION" />
          <Zone x={W/2-200} y={H-260-90} w={400} h={70} role="LOGO" spec="bottom-center · 70 px" />
        </StoryVariant>

        <StoryVariant label="QUOTE" w={W} h={H} s={s}>
          <Zone x={0} y={0} w={W} h={H} className="is-ui" role="DARK BG" spec="#231815 / #595757" />
          <Zone className="is-ui" x={0} y={0} w={W} h={250} role="UI" />
          <Zone className="is-ui" x={0} y={H-250} w={W} h={250} role="UI" />
          <Zone x={60} y={H/2-300} w={W-120} h={400} role="QUOTE" spec="Pretendard Light 96 px · italic" />
          <Zone x={60} y={H/2+150} w={W-120} h={120} role="ATTRIBUTION" />
          <Zone x={60} y={310} w={300} h={70} role="LOGO" spec="top-left · 70 px" />
        </StoryVariant>
      </div>
    </div>
  );
}

function StoryVariant({ label, w, h, s, children }) {
  return (
    <div className="story-cell">
      <ScaledCanvas w={w} h={h} s={s}>{children}</ScaledCanvas>
      <span className="label">{label}</span>
    </div>
  );
}

/* ============================================================
   SECTION 6 — Construction rules
   ============================================================ */
function ConstructionRules() {
  const rows = [
    ['Outer margin',         '80 px on Feed (1:1, 4:5) · 60 px on Story (9:16)'],
    ['Bottom UI clearance',  '120 px on Feed · 250 px on Story (top + bottom)'],
    ['Logo minimum size',    '60 px tall on a 1080-wide canvas'],
    ['Logo zone position',   'Top-left for content cards · Top-center or center for cover / closing'],
    ['Page indicator',       'Bottom-right · Montserrat Bold · 36 px · "01 / N" format'],
    ['Brand color usage',    'One brand color per series — never mix sub-brands inside a single carousel'],
    ['Photo treatment',      'Full-bleed only · never crop into circles, hearts, or geometric shapes'],
    ['Logo on photo',        'Place on a solid-color plate first · never directly on imagery'],
    ['Type pairing',         'Pretendard for Korean copy · Montserrat for Latin labels and numbers'],
    ['Slide count',          '4–8 cards per series · 6 is the standard cadence'],
  ];
  return (
    <div id="rules" className="subsection">
      <h3>Construction rules</h3>
      <p className="desc">
        Reference table for designers building social posts. These are the
        non-negotiables — every social asset shipped under any KIMES brand
        must hold to all ten.
      </p>
      <div className="rules-table-wrap">
        <table className="rules-table">
          <thead>
            <tr><th>Element</th><th>Rule</th></tr>
          </thead>
          <tbody>
            {rows.map(([el, rule]) => (
              <tr key={el}>
                <td className="element">{el}</td>
                <td className="rule">{rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 7 — DO and DON'T
   ============================================================ */
function DoDont() {
  const dos = [
    'Use ONE brand color per carousel series',
    'Maintain the 80 / 60 px outer margins',
    'Number every slide as "01 / N"',
    'Use Pretendard for Korean, Montserrat for Latin',
    'Reverse logos to white on dark / brand-color fills',
    'Reserve the Instagram UI zones at top and bottom',
  ];
  const donts = [
    "Don't place logos within Instagram UI safe zones",
    "Don't mix multiple brand colors in one series",
    "Don't apply gradients, drop shadows, or 3D effects",
    "Don't crop, distort, or rotate the brand logo",
    "Don't place one brand's logo on another brand's color",
    "Don't lay the logo directly on top of photography",
  ];
  return (
    <div id="do-dont" className="subsection">
      <h3>Do &amp; Don&apos;t</h3>
      <p className="desc">
        Quick checks for every post before publish. When in doubt, default
        to "less treatment, more structure."
      </p>
      <div className="dodont">
        <div className="dodont-col do">
          <h4>Do</h4>
          <ul>{dos.map(d => <li key={d}>{d}</li>)}</ul>
        </div>
        <div className="dodont-col dont">
          <h4>Don&apos;t</h4>
          <ul>{donts.map(d => <li key={d}>{d}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  FormatOverview,
  VerticalFeedStructure,
  SeriesStructure,
  BrandColorApplication,
  StoryStructure,
  ConstructionRules,
  DoDont,
});

/* KIMES Design System — Motion & animation kit (Section 15) */

const EASINGS = [
  { name: 'Brand Out',    spec: 'cubic-bezier(0.22, 0.61, 0.36, 1)', use: 'Default for entries, reveals, and brand wordmark loops.', path: 'M 4 76 C 25 76, 60 14, 116 14' },
  { name: 'Standard',     spec: 'cubic-bezier(0.4, 0.0, 0.2, 1)',     use: 'UI transitions inside product surfaces.',                 path: 'M 4 76 C 50 76, 70 14, 116 14' },
  { name: 'Decelerate',   spec: 'cubic-bezier(0.0, 0.0, 0.2, 1)',     use: 'Elements entering the viewport.',                         path: 'M 4 76 C 4 76, 70 14, 116 14' },
  { name: 'Accelerate',   spec: 'cubic-bezier(0.4, 0.0, 1.0, 1.0)',   use: 'Elements leaving the viewport.',                          path: 'M 4 76 C 50 76, 116 76, 116 14' },
];

const DURATIONS = [
  { name: '--motion-xs',  ms: 120,  use: 'Hover, focus, micro-feedback.', pct: 8  },
  { name: '--motion-sm',  ms: 220,  use: 'Tooltip, popover, small reveals.', pct: 15 },
  { name: '--motion-md',  ms: 360,  use: 'Modal entry, card flips.', pct: 24 },
  { name: '--motion-lg',  ms: 600,  use: 'Page-level transitions, hero reveals.', pct: 40 },
  { name: '--motion-xl',  ms: 1200, use: 'Brand wordmark entry — sponsor reels, stage screens.', pct: 80 },
  { name: '--motion-loop',ms: 4000, use: 'Wordmark idle loop on stage / signage.', pct: 100 },
];

const VARIANTS = [
  {
    id: 'kimes-entry',
    name: 'KIMES — slash sweep entry',
    desc: 'A diagonal red highlight passes across the wordmark, anchored to the slash-cut i. Lands on the static logo at 1.2s.',
    tag: '1.2s · ease-out',
    Stage: () => (
      <div className="mo-mark-wrap">
        <KimesWordmark height={72} />
      </div>
    ),
    dark: false,
  },
  {
    id: 'kimes-reveal',
    name: 'KIMES — wipe reveal',
    desc: 'Wordmark revealed by a left-to-right wipe. Suitable for video stingers and pre-roll.',
    tag: '1.6s · ease-in-out',
    Stage: () => (
      <span className="mo-anim-reveal">
        <KimesWordmark height={64} />
      </span>
    ),
    dark: false,
  },
  {
    id: 'mc-entry',
    name: 'MedicomteK — fade-up',
    desc: 'Soft 8px rise + fade. Calm, instrument-grade. Uses Brand Out easing.',
    tag: '0.6s · brand-out',
    Stage: () => (
      <div className="mo-anim-entry">
        <MedicomtekWordmark height={56} />
      </div>
    ),
    dark: false,
  },
  {
    id: 'bd-stagger',
    name: 'Beauty&Derma — letter stagger',
    desc: 'Each character fades up with a 80ms stagger. For product launches and beauty-tech segments.',
    tag: '0.6s × 6 · stagger 80ms',
    Stage: () => (
      <span className="mo-anim-stagger" style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 38, letterSpacing: '-0.02em' }}>
        <span>B</span><span>e</span><span>a</span><span>u</span><span>t</span><span>y</span>
      </span>
    ),
    dark: false,
  },
  {
    id: 'inspire-pulse',
    name: 'INSPIRE — pulse dot',
    desc: 'Heartbeat-tempo pulse on the brand dot. Ambient signature for digital surfaces.',
    tag: '1.6s · sine · loop',
    Stage: () => (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
        <span className="mo-anim-pulse-dot"></span>
        <InspireWordmark height={44} />
      </div>
    ),
    dark: false,
  },
  {
    id: 'kimes-dark',
    name: 'KIMES — dark variant',
    desc: 'White wordmark on near-black surface with the same slash sweep. For sponsor reels and stage backdrops.',
    tag: '1.2s · ease-out',
    Stage: () => (
      <div className="mo-mark-wrap">
        <KimesWordmark height={72} variant="white" />
      </div>
    ),
    dark: true,
  },
];

const MOTION_FORMATS = [
  {
    name: 'Lottie',
    ext: '.json',
    desc: 'Vector-based, scalable, themeable at runtime. Use for web, app, and stage screens where final output may be retimed.',
    specs: [
      ['Size budget', '≤ 80 KB'],
      ['Frame rate', '30 fps'],
      ['Color mode', 'sRGB · brand tokens injected at runtime'],
    ],
  },
  {
    name: 'MP4',
    ext: '.mp4',
    desc: 'Pre-rendered, transparent-fallback safe. Use for sponsor reels, social platforms that block Lottie, and live broadcast.',
    specs: [
      ['Codec', 'H.264 · 8-bit'],
      ['Resolution', '1920×1080 · 1080×1920 · 1080×1080'],
      ['Frame rate', '30 fps'],
      ['Audio', 'None — silent stinger'],
    ],
  },
  {
    name: 'WebM (alpha)',
    ext: '.webm',
    desc: 'For overlay use cases that need a transparent background — keynote screens and chroma-keyed broadcast.',
    specs: [
      ['Codec', 'VP9 · alpha channel'],
      ['Resolution', '1920×1080'],
      ['Frame rate', '30 fps'],
    ],
  },
];

const MOTION_DONTS = [
  { title: 'Don\'t spin or rotate the wordmark', body: 'Rotation breaks the slash-cut motif and reads as 2010s-era startup energy.' },
  { title: 'Don\'t bounce on entry',              body: 'Overshoot easing (e.g. back / elastic) is off-brand. The Brand Out curve is non-overshooting by design.' },
  { title: 'Don\'t loop louder than 5%',          body: 'Idle loops should be ambient — translate ≤ 3px, scale ≤ 1.01. Anything more competes with content.' },
  { title: 'Don\'t exceed 1.6s for entries',      body: 'Stage screens must support a 12-frame attention budget at 60fps. Cap entry at --motion-xl (1.2s).' },
  { title: 'Don\'t recolor the slash sweep',      body: 'The diagonal highlight is always brand red. Do not re-tint per surface.' },
  { title: 'Don\'t animate body type',            body: 'Reserve motion for marks, hero text, and key transitions. Body copy stays still.' },
];

/* ---------- Easing curve renderer ---------- */
function EasingCurve({ d }) {
  return (
    <svg viewBox="0 0 120 90" className="mo-easing-svg" style={{ width: '100%', height: '100%' }}>
      <line x1="4" y1="76" x2="116" y2="76" stroke="#e5e5e5" strokeWidth="1" />
      <line x1="4" y1="14" x2="4"   y2="76" stroke="#e5e5e5" strokeWidth="1" />
      <path d={d} stroke="#E60012" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="4"   cy="76" r="3" fill="#231815" />
      <circle cx="116" cy="14" r="3" fill="#231815" />
    </svg>
  );
}

/* ============ Sections ============ */

function MotionSignature() {
  const [paused, setPaused] = React.useState(false);
  return (
    <div id="mo-signature" className="subsection">
      <h3>15.1 — Signature loop</h3>
      <p className="desc">
        The KIMES brand mark in motion. A diagonal sweep — anchored to the
        slash-cut <em>i</em> — passes across the wordmark on a 4-second loop.
        This is the master loop used on stage screens, sponsor reels, and the
        site hero.
      </p>
      <div className="mo-signature">
        <div className="mo-stage">
          <div className={`mo-mark-wrap${paused ? ' paused' : ''}`}>
            <KimesWordmark height={96} />
          </div>
        </div>
        <div className="mo-stage-controls">
          <button className={paused ? '' : 'is-active'} onClick={() => setPaused(false)}>Play</button>
          <button className={paused ? 'is-active' : ''} onClick={() => setPaused(true)}>Pause</button>
          <div className="scrub"><div className="scrub-fill" style={{ width: paused ? '40%' : '100%', transition: paused ? 'none' : 'width 4s linear' }}></div></div>
          <div className="timecode">4.00s · loop</div>
        </div>
      </div>
    </div>
  );
}

function MotionVariants() {
  return (
    <div id="mo-variants" className="subsection">
      <h3>15.2 — Variant kit</h3>
      <p className="desc">
        Six brand-mark animations covering entry, reveal, ambient, and dark
        surfaces — one per major use case. Each is shipped as Lottie + MP4.
      </p>
      <div className="mo-variants">
        {VARIANTS.map(v => (
          <div className="mo-variant" key={v.id}>
            <div className={`mo-variant-stage${v.dark ? ' dark' : ''}`}>
              <v.Stage />
            </div>
            <div className="mo-variant-meta">
              <div className="mo-variant-name">{v.name}</div>
              <div className="mo-variant-tag">{v.tag}</div>
              <div className="mo-variant-desc">{v.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MotionEasings() {
  return (
    <div id="mo-easings" className="subsection">
      <h3>15.3 — Easing curves</h3>
      <p className="desc">
        Four curated curves. <b>Brand Out</b> is the default — slightly more
        decelerating than Material Standard, with no overshoot. Reach for
        Standard for mid-product UI; Decelerate / Accelerate only when an
        element is entering or leaving the frame.
      </p>
      <div className="mo-easings">
        {EASINGS.map(e => (
          <div className="mo-easing" key={e.name}>
            <div className="mo-easing-curve"><EasingCurve d={e.path} /></div>
            <div>
              <div className="mo-easing-name">{e.name}</div>
              <div className="mo-easing-spec">{e.spec}</div>
            </div>
            <div className="mo-easing-use">{e.use}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MotionDurations() {
  return (
    <div id="mo-durations" className="subsection">
      <h3>15.4 — Duration scale</h3>
      <p className="desc">
        Six tokens span micro-feedback to ambient loop. Always pick the
        shortest duration that feels intentional — speed is brand-appropriate.
      </p>
      <div className="mo-durations">
        <div className="mo-dur-row is-head">
          <span>Token</span>
          <span>ms</span>
          <span>Visual length</span>
          <span>Use</span>
        </div>
        {DURATIONS.map(d => (
          <div className="mo-dur-row" key={d.name}>
            <span className="mo-dur-name">{d.name}</span>
            <span className="mo-dur-ms">{d.ms}ms</span>
            <span className="mo-dur-bar"><span className="mo-dur-fill" style={{ width: `${d.pct}%` }}></span></span>
            <span className="mo-dur-use">{d.use}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MotionFormats() {
  return (
    <div id="mo-formats" className="subsection">
      <h3>15.5 — Delivery formats</h3>
      <p className="desc">
        Three formats cover every distribution surface. Lottie for runtime
        flexibility, MP4 for compatibility, WebM for transparent overlays.
      </p>
      <div className="mo-formats">
        {MOTION_FORMATS.map(f => (
          <div className="mo-format" key={f.name}>
            <div className="mo-format-head">
              <span className="mo-format-name">{f.name}</span>
              <span className="mo-format-ext">{f.ext}</span>
            </div>
            <div className="mo-format-desc">{f.desc}</div>
            <div className="mo-format-specs">
              {f.specs.map(([k, v]) => <span key={k}><b>{k}</b> · {v}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MotionDonts() {
  return (
    <div id="mo-donts" className="subsection">
      <h3>15.6 — Don'ts</h3>
      <p className="desc">
        Six failure modes that break the brand. Reviewers should reject any
        animation that violates these.
      </p>
      <div className="mo-donts">
        {MOTION_DONTS.map(d => (
          <div className="mo-dont" key={d.title}>
            <b>{d.title}</b>
            <small>{d.body}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Page wrapper ---------- */
function Motion() {
  return (
    <section id="motion" className="section">
      <div className="section-eyebrow">15 — Motion</div>
      <h2>Motion &amp; animation kit</h2>
      <p className="lede">
        How the KIMES brand moves. One signature loop, six variant animations,
        a duration scale, and the three delivery formats every sponsor and
        stage screen needs.
      </p>
      <MotionSignature />
      <MotionVariants />
      <MotionEasings />
      <MotionDurations />
      <MotionFormats />
      <MotionDonts />
    </section>
  );
}

window.Motion = Motion;

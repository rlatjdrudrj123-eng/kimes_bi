/* eslint-disable */
/**
 * KIMES Components — Cards.
 *
 * Four card types used across the KIMES exhibition properties:
 *   - Exhibitor (listings, search results)
 *   - Session   (conference schedule)
 *   - Stat      (homepage event-scale metrics)
 *   - News      (press release listings)
 *
 * Cards follow the same theming pattern as buttons: drop them inside
 * a .theme-kimes / .theme-mc / .theme-bd / .theme-in scope and the
 * accent (--card-accent) repaints automatically.
 */

/* ---- Reusable arrow icon ---- */
function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter"/>
    </svg>
  );
}

/* ---- Card primitives ---- */
function ExhibitorCard({ name, booth, mark, tags = [] }) {
  return (
    <article className="kcard kcard--exhibitor">
      <div className="logo-area">
        <div className="logo-placeholder">{mark}</div>
      </div>
      <div className="body">
        <h4 className="name">{name}</h4>
        <div className="booth">Booth {booth}</div>
        <div className="tags">
          {tags.map((t, i) => (
            <span key={t} className={`tag ${i === 0 ? 'is-accent' : ''}`}>{t}</span>
          ))}
        </div>
      </div>
      <div className="footer">
        <a className="footer-link" href="#">View details <ArrowRight /></a>
      </div>
    </article>
  );
}

function SessionCard({ time, title, speaker, affiliation, track, themeClass }) {
  return (
    <article className={`kcard kcard--session ${themeClass}`}>
      <div className="accent-bar" />
      <div className="body">
        <div className="time">{time}</div>
        <div className="session-info">
          <h4 className="title">{title}</h4>
          <div className="speaker">{speaker} · {affiliation}</div>
        </div>
        <span className="track-pill">{track}</span>
      </div>
    </article>
  );
}

function StatCard({ value, label }) {
  return (
    <article className="kcard kcard--stat">
      <div className="accent-line" />
      <div className="number">{value}</div>
      <div className="label">{label}</div>
    </article>
  );
}

function NewsCard({ date, headline, excerpt }) {
  return (
    <article className="kcard kcard--news">
      <div className="thumb" />
      <div className="body">
        <div className="date">{date}</div>
        <h4 className="headline">{headline}</h4>
        <p className="excerpt">{excerpt}</p>
      </div>
    </article>
  );
}

/* ---- Section: intro ---- */
function CardsIntro() {
  return (
    <section id="cards" className="section">
      <div className="section-eyebrow">02 — Cards</div>
      <h2>Cards</h2>
      <p className="lede">
        Cards are the workhorse surface of the KIMES exhibition site —
        exhibitor listings, conference schedules, news, and event stats all
        live in cards. Every card uses an 8px radius, a 0.5px border (no
        shadows), and a white default background. The brand accent — pill
        background, accent bar, or accent line — is the theme hook.
      </p>
    </section>
  );
}

/* ---- Subsection: Exhibitor ---- */
const exhibitors = [
  { name: 'Samsung Medison',   booth: 'A-101', mark: 'SM', tags: ['Imaging',  'Ultrasound', 'AI'] },
  { name: 'Lunit',             booth: 'A-208', mark: 'LN', tags: ['AI Diagnostics', 'Oncology'] },
  { name: 'Vatech Co., Ltd.',  booth: 'B-115', mark: 'VT', tags: ['Dental Imaging', 'CT'] },
  { name: 'JW Bioscience',     booth: 'C-302', mark: 'JW', tags: ['IVD',     'Diagnostics'] },
  { name: 'Mediana',           booth: 'D-410', mark: 'MD', tags: ['Patient Monitoring', 'ICU'] },
  { name: 'InBody',            booth: 'E-220', mark: 'IB', tags: ['Body Composition', 'Wellness'] },
];

function ExhibitorCardsSection() {
  return (
    <div id="exhibitor-cards" className="subsection">
      <h3>Exhibitor card</h3>
      <p className="desc">
        Used on the exhibitor directory and search results. Vertical layout
        with a logo area, company name, booth number, category tags, and a
        details link. Hover lifts the border weight only — no shadow.
      </p>
      <div className="cards-demo-frame theme-kimes">
        <div className="cards-grid-3">
          {exhibitors.map(e => <ExhibitorCard key={e.name} {...e} />)}
        </div>
      </div>
    </div>
  );
}

/* ---- Subsection: Session ---- */
const sessions = [
  {
    time: '10:00 — 11:30',
    title: 'Opening Keynote: The Future of Korean Medical Devices',
    speaker: 'Dr. Sung-Joon Park',
    affiliation: 'Seoul National University Hospital',
    track: 'Main',
    themeClass: 'theme-kimes',
  },
  {
    time: '11:45 — 12:45',
    title: 'AI in Diagnostic Imaging — Clinical Validation Pathways',
    speaker: 'Prof. Min-Hee Choi',
    affiliation: 'KAIST Medical Engineering',
    track: 'Tech',
    themeClass: 'theme-mc',
  },
  {
    time: '14:00 — 15:00',
    title: 'Aesthetic Devices: The Korean Beauty-Tech Pipeline',
    speaker: 'Dr. Yu-Jin Lee',
    affiliation: 'Beauty&Derma Research Forum',
    track: 'Beauty',
    themeClass: 'theme-bd',
  },
  {
    time: '15:30 — 17:00',
    title: 'Digital Therapeutics & Remote Patient Monitoring',
    speaker: 'Dr. Jae-Won Kim',
    affiliation: 'INSPIRE Digital Health Council',
    track: 'Digital',
    themeClass: 'theme-in',
  },
];

function SessionCardsSection() {
  return (
    <div id="session-cards" className="subsection">
      <h3>Session card</h3>
      <p className="desc">
        Conference schedule rows. Horizontal layout with a 4px brand-color
        accent bar on the left edge. Each track maps to one of the four
        brand themes — KIMES red (main), MedicomteK blue (tech),
        Beauty&amp;Derma purple, INSPIRE lime (digital).
      </p>
      <div className="cards-demo-frame">
        <div className="cards-stack">
          {sessions.map(s => <SessionCard key={s.title} {...s} />)}
        </div>
      </div>
    </div>
  );
}

/* ---- Subsection: Stat ---- */
const stats = [
  { value: '1,490',   label: 'Exhibitors' },
  { value: '41',      label: 'Countries' },
  { value: '4',       label: 'Days' },
  { value: '80,000+', label: 'Visitors' },
];

function StatCardsSection() {
  return (
    <div id="stat-cards" className="subsection">
      <h3>Stat card</h3>
      <p className="desc">
        Big-number metrics for the homepage hero. Tabular numerals so digits
        align across cards. The 32px brand-color accent line at top is the
        only theming hook.
      </p>
      <div className="cards-demo-frame theme-kimes">
        <div className="cards-grid-4">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </div>
    </div>
  );
}

/* ---- Subsection: News ---- */
const news = [
  {
    date: 'Apr 12, 2026',
    headline: 'KIMES 2026 Sets New Record with 1,490 Exhibitors from 41 Countries',
    excerpt: 'The largest medical device exhibition in Korea reaches its biggest-ever scale, with new pavilions from Germany, Japan, and Switzerland.',
  },
  {
    date: 'Apr 08, 2026',
    headline: 'INSPIRE Digital Health Forum Announces Speaker Lineup',
    excerpt: 'Sixty-two speakers from twelve countries will explore digital therapeutics, AI diagnostics, and remote patient monitoring across four days.',
  },
  {
    date: 'Mar 30, 2026',
    headline: 'Registration Opens for Beauty&Derma Industry Summit',
    excerpt: 'The aesthetic medicine track returns to KIMES with an expanded program covering injectables, lasers, and cosmeceutical innovation.',
  },
];

function NewsCardsSection() {
  return (
    <div id="news-cards" className="subsection">
      <h3>News card</h3>
      <p className="desc">
        Press release listings. Vertical layout with a 16:9 thumbnail area
        on top, dated headline, and a 2-line excerpt. Headlines clamp to two
        lines so the grid stays even at any viewport.
      </p>
      <div className="cards-demo-frame theme-kimes">
        <div className="cards-grid-3">
          {news.map(n => <NewsCard key={n.headline} {...n} />)}
        </div>
      </div>
    </div>
  );
}

/* ---- Subsection: Code tokens ---- */
function CardCodeTokens() {
  const rows = [
    { name: '--card-bg',            val: '#ffffff',                  usage: 'Default surface — never tinted' },
    { name: '--card-border',        val: 'rgba(24,24,27,0.10)',      usage: 'Default border — 0.5px stroke' },
    { name: '--card-border-hover',  val: 'rgba(24,24,27,0.32)',      usage: 'Hover state — border darkens' },
    { name: '--card-radius',        val: '8px',                      usage: '2× button radius (4px) — softer surfaces' },
    { name: '--card-padding',       val: '20px',                     usage: 'Body padding for vertical cards' },
    { name: '--card-gap',           val: '12px',                     usage: 'Vertical rhythm inside the body' },
    { name: '--card-text',          val: '#18181b',                  usage: 'Primary text — name, headline' },
    { name: '--card-text-soft',     val: '#3f3f46',                  usage: 'Body text — speaker, excerpt' },
    { name: '--card-text-muted',    val: '#71717a',                  usage: 'Meta — date, label, booth' },
    { name: '--card-thumb-bg',      val: '#e5e7eb',                  usage: 'Logo / image placeholder fill' },
    { name: '--card-tag-bg',        val: '#f4f4f5',                  usage: 'Default tag pill background' },
    { name: '--card-tag-text',      val: '#3f3f46',                  usage: 'Default tag pill text' },
    { name: '--card-accent',        val: 'theme-tied',               usage: 'Accent bar / line / tag fill' },
    { name: '--card-accent-soft',   val: 'theme-tied (~10% alpha)',  usage: 'Pill background for primary tag / track' },
    { name: '--card-transition',    val: '140ms ease-out',           usage: 'Border + arrow nudge' },
  ];
  return (
    <div id="card-tokens" className="subsection">
      <h3>Design tokens</h3>
      <p className="desc">
        Custom properties exposed by <code>components/cards.css</code>.
        <code>--card-accent</code> is the only theme-tied token — everything
        else is fixed across brands so card chrome stays consistent.
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

Object.assign(window, {
  CardsIntro,
  ExhibitorCardsSection,
  SessionCardsSection,
  StatCardsSection,
  NewsCardsSection,
  CardCodeTokens,
  ExhibitorCard,
  SessionCard,
  StatCard,
  NewsCard,
});

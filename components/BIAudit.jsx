/* KIMES BI Audit — international medical-exhibition BI standard.
   Benchmarks: Arab Health, MEDICA, FIME, CMEF, Hospitalar, HIMSS Global. */

const PILLARS = [
  { id: 'visual',  name: 'Visual identity system', sub: 'Logo, color, typography coherence',     score: 88, weight: 18, grade: 'A' },
  { id: 'product', name: 'Sub-brand architecture',  sub: 'Family hierarchy, lockup discipline',   score: 82, weight: 14, grade: 'B' },
  { id: 'digital', name: 'Digital & motion',        sub: 'Web, app, social, animated lockups',    score: 58, weight: 16, grade: 'C' },
  { id: 'env',     name: 'Environmental & exhibit', sub: 'Signage, booth, on-site wayfinding',    score: 71, weight: 14, grade: 'B' },
  { id: 'ops',     name: 'Governance & ops',        sub: 'Templates, asset library, contributor', score: 64, weight: 12, grade: 'C' },
  { id: 'a11y',    name: 'Accessibility',           sub: 'Contrast, type sizing, alt text',       score: 55, weight: 12, grade: 'C' },
  { id: 'i18n',    name: 'Internationalization',    sub: 'KO/EN parity, RTL, CJK type pairing',   score: 70, weight: 14, grade: 'B' },
];

const STRENGTHS = [
  { title: 'Distinctive slash-cut motif',       body: 'The diagonal cut on the i across KIMES and MedicomteK is memorable and proprietary — rare among medical-trade BIs which default to generic geometric sans.', ref: 'PILLAR 01' },
  { title: 'Disciplined four-brand family',     body: 'Clear parent/sub-brand split, year-locked variants, and one shared anchor color keep the portfolio readable at a glance.', ref: 'PILLAR 02' },
  { title: 'Print-ready color tokens',          body: 'Pantone, CMYK, RGB, and HEX defined per brand — meets print + digital production requirements out of the box.', ref: 'PILLAR 01' },
  { title: 'Pretendard + Montserrat pairing',   body: 'Pretendard handles Korean with native metrics; Montserrat provides Latin parity. Both open-source and embed-safe internationally.', ref: 'PILLAR 07' },
  { title: 'Clear-space + minimum-size rules',  body: 'Explicit ratios and 12mm/40px minimums prevent the most common misuse failures across booth and digital production.', ref: 'PILLAR 04' },
];

const GAPS = [
  { title: 'No motion / animation specification', body: 'No defined entry, loop, or transition for any wordmark. Arab Health 2024 and MEDICA ship Lottie/MP4 kits for sponsor reels and stage screens.', ref: 'PILLAR 03' },
  { title: 'Accessibility tokens absent',         body: 'No documented contrast pairings; #E60012 on white is borderline (4.0:1). No minimum body-text size or focus-state guidance for digital surfaces.', ref: 'PILLAR 06' },
  { title: 'Booth & signage system thin',         body: 'No exhibit hierarchy: hall banners, booth numbering, registration desk, wayfinding pictograms, or stage-screen lockup specs.', ref: 'PILLAR 04' },
  { title: 'No social / OG asset templates',      body: '1:1, 4:5, 9:16, and 1200×630 OG variants are required for LinkedIn, Instagram, KakaoTalk. None defined.', ref: 'PILLAR 03' },
  { title: 'English-first parity untested',       body: 'Latin-only versions of MedicomteK and Beauty&Derma have not been pressure-tested for international press kits and overseas sponsors.', ref: 'PILLAR 07' },
  { title: 'Governance documentation thin',       body: 'No contribution model, review cadence, change-log, or central DAM. Hard to scale across an event with 1,400+ exhibitors.', ref: 'PILLAR 05' },
];

const PARTIALS = [
  { title: 'Iconography library',     body: 'A 24-icon set exists but lacks wayfinding category icons (parking, registration, halls A–E, accessibility). Peers ship 30–60 icons.', ref: 'PILLAR 05' },
  { title: 'Photography direction',   body: 'Color and type defined but no art direction, lighting, or subject guidelines for booth photography or hero imagery.', ref: 'PILLAR 01' },
  { title: 'Print production specs',  body: 'CMYK/Pantone present, but no spot-color override list, large-format dot-gain notes, or fabric/vinyl substrate guidance.', ref: 'PILLAR 04' },
];

const BENCH = [
  ['Bilingual logo lockups',     'KO + EN pairs',              'full',    'partial', 'full',    'At parity with Arab Health; MEDICA still EN-primary.'],
  ['Color tokens (4 systems)',   'Pantone/CMYK/RGB/HEX',       'full',    'full',    'full',    'Industry baseline. KIMES meets it.'],
  ['Sub-brand architecture',     'Clear parent / family',      'full',    'partial', 'full',    'CMEF and Hospitalar lack a true family system. KIMES leads peers.'],
  ['Distinctive wordmark',       'Beyond geometric sans',      'full',    'partial', 'full',    'Slash-cut i is memorable. Peers default to Helvetica.'],
  ['Motion / animated lockups',  'Lottie or MP4 kit',          'none',    'partial', 'full',    'Arab Health 2024 ships a 9-asset motion kit. KIMES has none.'],
  ['Social/OG templates',        '1:1, 4:5, 9:16, OG',         'none',    'full',    'full',    'Universal among peers; not yet published.'],
  ['Accessibility audit',        'WCAG AA contrast',           'none',    'partial', 'partial', 'Even leaders are inconsistent here. Opportunity to lead.'],
  ['Booth/exhibit system',       'Hall, hierarchy, signage',   'partial', 'full',    'full',    'Strong logo but missing booth-level hierarchy.'],
  ['Iconography library',        'Wayfinding + utility',       'partial', 'full',    'full',    'Has 24 icons; needs 30–60 for full wayfinding.'],
  ['Photography guidelines',     'Direction + treatment',      'partial', 'partial', 'full',    'On-par with peers; HIMSS leads with full library.'],
  ['Asset DAM / CDN',            'Single source of truth',     'none',    'partial', 'full',    'No public DAM. Sponsors request via email.'],
  ['Print production specs',     'Spot, substrate, dot-gain',  'partial', 'full',    'full',    'CMYK present; substrate-specific overrides missing.'],
];

const ROADMAP = [
  { phase: '0–30 days', tag: 'Now', items: [
    { t: 'AA contrast matrix',    d: 'Document #E60012 vs all approved backgrounds; flag white pairing as AAA for ≥18pt only.' },
    { t: 'Social/OG templates',   d: 'Eight templates: 1:1, 4:5, 9:16, OG 1200×630, plus Korean/English variants.' },
    { t: 'Motion baseline',       d: 'One Lottie + one MP4 per parent wordmark. 1.2s entry, brand-red glide on the slash-cut.' },
  ]},
  { phase: '30–90 days', tag: 'Next', items: [
    { t: 'Booth & wayfinding kit', d: 'Hall banners, booth-number system, 30 wayfinding pictograms, registration/stage lockups.' },
    { t: 'DAM rollout',            d: 'Public CDN with versioned SVG, AI, PNG, and PDF; per-asset license metadata.' },
    { t: 'English-first audit',    d: 'Validate Latin-only lockups for MedicomteK and Beauty&Derma against international press use cases.' },
  ]},
  { phase: '90–180 days', tag: 'Later', items: [
    { t: 'Photography direction',  d: 'Lighting, subject framing, post-production LUT for booth and hero imagery.' },
    { t: 'Print substrate guide',  d: 'Fabric, vinyl, large-format dot-gain, and spot-color overrides.' },
    { t: 'Governance v1',          d: 'Contribution model, quarterly review cadence, public change-log.' },
  ]},
];

const PEERS = [
  { name: 'Arab Health',     city: 'Dubai',       year: '2024', strength: 'Motion kit, social templates' },
  { name: 'MEDICA',          city: 'Düsseldorf',  year: '2023', strength: 'Booth signage, exhibit hierarchy' },
  { name: 'HIMSS Global',    city: 'Orlando',     year: '2024', strength: 'Photography, DAM, governance' },
  { name: 'FIME',            city: 'Miami',       year: '2024', strength: 'Bilingual press kits' },
  { name: 'CMEF',            city: 'Shanghai',    year: '2024', strength: 'Print production system' },
  { name: 'Hospitalar',      city: 'São Paulo',   year: '2024', strength: 'Color tokens, accessibility' },
];

/* ---------- Helpers ---------- */
function gradeColor(g){ return g==='A' ? '#16a34a' : g==='B' ? '#0891b2' : g==='C' ? '#d97706' : '#dc2626'; }
function statusDot(s){
  if (s==='full')    return <span className="bench-dot full"  aria-label="Full">●</span>;
  if (s==='partial') return <span className="bench-dot part"  aria-label="Partial">◐</span>;
  return <span className="bench-dot none" aria-label="None">○</span>;
}

/* ---------- Composite score ---------- */
function compositeScore(){
  const total  = PILLARS.reduce((a,p)=>a+p.weight,0);
  const scored = PILLARS.reduce((a,p)=>a+p.score*p.weight,0);
  return Math.round(scored/total);
}

/* ============================================================
   Sections
   ============================================================ */

function AuditSummary() {
  const score = compositeScore();
  const verdict = score >= 80 ? 'Strong foundation' : score >= 70 ? 'Solid, with clear gaps' : score >= 60 ? 'Workable, needs investment' : 'Early stage';
  const grade   = score >= 85 ? 'A' : score >= 75 ? 'B+' : score >= 65 ? 'B' : score >= 55 ? 'C+' : 'C';
  return (
    <div id="au-summary" className="subsection">
      <h3>17.1 — Composite assessment</h3>
      <p className="desc">
        Aggregate score across 7 weighted pillars, benchmarked against six leading
        international medical-exhibition BIs.
      </p>
      <div className="au-summary">
        <div className="au-score-card">
          <div className="au-score-label">Composite score</div>
          <div className="au-score-value" style={{ color: gradeColor(grade[0]) }}>{score}<span>/100</span></div>
          <div className="au-score-grade" style={{ background: gradeColor(grade[0]) }}>{grade}</div>
          <div className="au-score-verdict">{verdict}</div>
        </div>
        <div className="au-pillars">
          {PILLARS.map(p => (
            <div className="au-pillar" key={p.id}>
              <div className="au-pillar-head">
                <span className="au-pillar-name">{p.name}</span>
                <span className="au-pillar-grade" style={{ color: gradeColor(p.grade) }}>{p.grade}</span>
              </div>
              <div className="au-pillar-sub">{p.sub}</div>
              <div className="au-pillar-bar">
                <div className="au-pillar-fill" style={{ width: `${p.score}%`, background: gradeColor(p.grade) }}></div>
              </div>
              <div className="au-pillar-meta">
                <span>{p.score}/100</span>
                <span>weight {p.weight}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StrengthsAndGaps() {
  return (
    <div id="au-strengths" className="subsection">
      <h3>17.2 — Strengths & gaps</h3>
      <p className="desc">
        Five areas where KIMES already meets or exceeds international peers,
        followed by six concrete gaps and three partials.
      </p>
      <div className="au-list-grid">
        <div className="au-list au-list-pos">
          <div className="au-list-head">
            <span className="au-list-mark pos" aria-hidden="true">+</span>
            <span>Strengths</span>
            <span className="au-list-count">{STRENGTHS.length}</span>
          </div>
          {STRENGTHS.map(s => (
            <div className="au-item" key={s.title}>
              <div className="au-item-title">{s.title}</div>
              <div className="au-item-body">{s.body}</div>
              <div className="au-item-ref">{s.ref}</div>
            </div>
          ))}
        </div>
        <div className="au-list au-list-neg">
          <div className="au-list-head">
            <span className="au-list-mark neg" aria-hidden="true">!</span>
            <span>Gaps</span>
            <span className="au-list-count">{GAPS.length}</span>
          </div>
          {GAPS.map(g => (
            <div className="au-item" key={g.title}>
              <div className="au-item-title">{g.title}</div>
              <div className="au-item-body">{g.body}</div>
              <div className="au-item-ref">{g.ref}</div>
            </div>
          ))}
        </div>
        <div className="au-list au-list-mid">
          <div className="au-list-head">
            <span className="au-list-mark mid" aria-hidden="true">~</span>
            <span>Partial</span>
            <span className="au-list-count">{PARTIALS.length}</span>
          </div>
          {PARTIALS.map(p => (
            <div className="au-item" key={p.title}>
              <div className="au-item-title">{p.title}</div>
              <div className="au-item-body">{p.body}</div>
              <div className="au-item-ref">{p.ref}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Benchmark() {
  return (
    <div id="au-benchmark" className="subsection">
      <h3>17.3 — Peer benchmark</h3>
      <p className="desc">
        Twelve criteria scored across KIMES, the average of six peer events, and the
        category leader. ● full · ◐ partial · ○ none.
      </p>
      <div className="au-bench">
        <div className="au-bench-head">
          <span>Criterion</span>
          <span>Detail</span>
          <span>KIMES</span>
          <span>Peer avg</span>
          <span>Leader</span>
          <span>Note</span>
        </div>
        {BENCH.map(([crit, sub, k, p, l, note]) => (
          <div className="au-bench-row" key={crit}>
            <span className="au-bench-crit">{crit}</span>
            <span className="au-bench-sub">{sub}</span>
            <span>{statusDot(k)}</span>
            <span>{statusDot(p)}</span>
            <span>{statusDot(l)}</span>
            <span className="au-bench-note">{note}</span>
          </div>
        ))}
      </div>
      <div className="au-peers">
        <div className="au-peers-head">Peer set</div>
        <div className="au-peers-list">
          {PEERS.map(p => (
            <div className="au-peer" key={p.name}>
              <div className="au-peer-name">{p.name}</div>
              <div className="au-peer-meta">{p.city} · {p.year}</div>
              <div className="au-peer-strength">{p.strength}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Roadmap() {
  return (
    <div id="au-roadmap" className="subsection">
      <h3>17.4 — Remediation roadmap</h3>
      <p className="desc">
        Prioritized by impact and dependency. Now items unblock Next; Next items
        unblock Later.
      </p>
      <div className="au-roadmap">
        {ROADMAP.map(phase => (
          <div className="au-phase" key={phase.phase}>
            <div className="au-phase-head">
              <span className="au-phase-tag">{phase.tag}</span>
              <span className="au-phase-when">{phase.phase}</span>
            </div>
            <div className="au-phase-items">
              {phase.items.map(it => (
                <div className="au-phase-item" key={it.t}>
                  <div className="au-phase-title">{it.t}</div>
                  <div className="au-phase-desc">{it.d}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Methodology() {
  return (
    <div id="au-method" className="subsection">
      <h3>17.5 — Methodology</h3>
      <p className="desc">
        Scoring framework, data sources, and limitations.
      </p>
      <div className="au-method">
        <div className="au-method-row">
          <div className="au-method-key">Pillars</div>
          <div className="au-method-val">
            7 weighted pillars sum to 100%. Weights reflect typical importance
            for medical-trade exhibitions where exhibit, digital, and i18n are
            equally critical.
          </div>
        </div>
        <div className="au-method-row">
          <div className="au-method-key">Scoring</div>
          <div className="au-method-val">
            0–100 per pillar. Composite is weight-averaged. Grade thresholds:
            A ≥85, B+ ≥75, B ≥65, C+ ≥55, C ≥45.
          </div>
        </div>
        <div className="au-method-row">
          <div className="au-method-key">Benchmarks</div>
          <div className="au-method-val">
            Arab Health (Dubai), MEDICA (Düsseldorf), FIME (Miami), CMEF
            (Shanghai), Hospitalar (São Paulo), HIMSS Global (Orlando).
            Public brand assets, press kits, and on-site documentation as of
            2024.
          </div>
        </div>
        <div className="au-method-row">
          <div className="au-method-key">Limitations</div>
          <div className="au-method-val">
            External assessment from public materials. Internal governance
            documents, contracts, and unpublished assets are not visible and
            may shift Pillar 05 (Governance) upward.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Page wrapper
   ============================================================ */

function BIAudit() {
  return (
    <section id="bi-audit" className="section">
      <div className="section-eyebrow">17 — BI audit</div>
      <h2>BI audit</h2>
      <p className="lede">
        How the KIMES 2026 brand identity measures up to leading international
        medical-exhibition BIs — what's strong, what's missing, and a phased
        plan to close the gaps.
      </p>
      <AuditSummary />
      <StrengthsAndGaps />
      <Benchmark />
      <Roadmap />
      <Methodology />
    </section>
  );
}

window.BIAudit = BIAudit;

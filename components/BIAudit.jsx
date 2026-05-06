/* KIMES BI Audit — international medical-exhibition BI standard.
   Benchmarks: Arab Health, MEDICA, FIME, CMEF, Hospitalar, HIMSS Global. */

const useSectionContent = window.useSectionContent;

/* ---------- Helpers ---------- */
function gradeColor(g) { return g === 'A' ? '#16a34a' : g === 'B' ? '#0891b2' : g === 'C' ? '#d97706' : '#dc2626'; }
function statusDot(s) {
  if (s === 'full')    return <span className="bench-dot full"  aria-label="Full">●</span>;
  if (s === 'partial') return <span className="bench-dot part"  aria-label="Partial">◐</span>;
  return <span className="bench-dot none" aria-label="None">○</span>;
}
function compositeScoreFor(pillars) {
  const total  = pillars.reduce((a, p) => a + (p.weight || 0), 0);
  const scored = pillars.reduce((a, p) => a + (p.score || 0) * (p.weight || 0), 0);
  return total ? Math.round(scored / total) : 0;
}

/* ============================================================
   Sections
   ============================================================ */

function AuditSummary() {
  const c = useSectionContent('bi-audit');
  const pillars = c.pillars || [];
  const summary = c.summary || {};
  const score = compositeScoreFor(pillars);
  const verdict = score >= 80 ? 'Strong foundation' : score >= 70 ? 'Solid, with clear gaps' : score >= 60 ? 'Workable, needs investment' : 'Early stage';
  const grade   = score >= 85 ? 'A' : score >= 75 ? 'B+' : score >= 65 ? 'B' : score >= 55 ? 'C+' : 'C';
  return (
    <div id="au-summary" className="subsection">
      <h3>{summary.title}</h3>
      <p className="desc">{summary.desc}</p>
      <div className="au-summary">
        <div className="au-score-card">
          <div className="au-score-label">{summary.scoreLabel}</div>
          <div className="au-score-value" style={{ color: gradeColor(grade[0]) }}>{score}<span>/100</span></div>
          <div className="au-score-grade" style={{ background: gradeColor(grade[0]) }}>{grade}</div>
          <div className="au-score-verdict">{verdict}</div>
        </div>
        <div className="au-pillars">
          {pillars.map(p => (
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
  const c = useSectionContent('bi-audit');
  const lists = c.lists || {};
  const headers = lists.headers || { strengths: 'Strengths', gaps: 'Gaps', partials: 'Partial' };
  const strengths = c.strengths || [];
  const gaps      = c.gaps || [];
  const partials  = c.partials || [];
  return (
    <div id="au-strengths" className="subsection">
      <h3>{lists.title}</h3>
      <p className="desc">{lists.desc}</p>
      <div className="au-list-grid">
        <div className="au-list au-list-pos">
          <div className="au-list-head">
            <span className="au-list-mark pos" aria-hidden="true">+</span>
            <span>{headers.strengths}</span>
            <span className="au-list-count">{strengths.length}</span>
          </div>
          {strengths.map(s => (
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
            <span>{headers.gaps}</span>
            <span className="au-list-count">{gaps.length}</span>
          </div>
          {gaps.map(g => (
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
            <span>{headers.partials}</span>
            <span className="au-list-count">{partials.length}</span>
          </div>
          {partials.map(p => (
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
  const c = useSectionContent('bi-audit');
  const benchmark = c.benchmark || {};
  const headers = benchmark.headers || {};
  const bench = c.bench || [];
  const peers = c.peers || [];
  return (
    <div id="au-benchmark" className="subsection">
      <h3>{benchmark.title}</h3>
      <p className="desc">{benchmark.desc}</p>
      <div className="au-bench">
        <div className="au-bench-head">
          <span>{headers.criterion}</span>
          <span>{headers.detail}</span>
          <span>{headers.kimes}</span>
          <span>{headers.peerAvg}</span>
          <span>{headers.leader}</span>
          <span>{headers.note}</span>
        </div>
        {bench.map(row => (
          <div className="au-bench-row" key={row.criterion}>
            <span className="au-bench-crit">{row.criterion}</span>
            <span className="au-bench-sub">{row.detail}</span>
            <span>{statusDot(row.kimes)}</span>
            <span>{statusDot(row.peer)}</span>
            <span>{statusDot(row.leader)}</span>
            <span className="au-bench-note">{row.note}</span>
          </div>
        ))}
      </div>
      <div className="au-peers">
        <div className="au-peers-head">{c.peersHead}</div>
        <div className="au-peers-list">
          {peers.map(p => (
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
  const c = useSectionContent('bi-audit');
  const roadmap = c.roadmap || {};
  const phases = roadmap.phases || [];
  return (
    <div id="au-roadmap" className="subsection">
      <h3>{roadmap.title}</h3>
      <p className="desc">{roadmap.desc}</p>
      <div className="au-roadmap">
        {phases.map(phase => (
          <div className="au-phase" key={phase.phase}>
            <div className="au-phase-head">
              <span className="au-phase-tag">{phase.tag}</span>
              <span className="au-phase-when">{phase.phase}</span>
            </div>
            <div className="au-phase-items">
              {(phase.items || []).map(it => (
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
  const c = useSectionContent('bi-audit');
  const methodology = c.methodology || {};
  const rows = methodology.rows || [];
  return (
    <div id="au-method" className="subsection">
      <h3>{methodology.title}</h3>
      <p className="desc">{methodology.desc}</p>
      <div className="au-method">
        {rows.map(r => (
          <div className="au-method-row" key={r.key}>
            <div className="au-method-key">{r.key}</div>
            <div className="au-method-val">{r.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Page wrapper
   ============================================================ */

function BIAudit() {
  const c = useSectionContent('bi-audit');
  return (
    <section id="bi-audit" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <AuditSummary />
      <StrengthsAndGaps />
      <Benchmark />
      <Roadmap />
      <Methodology />
    </section>
  );
}

window.BIAudit = BIAudit;

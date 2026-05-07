/* eslint-disable */
const useSectionContent = window.useSectionContent;
const useSiteLang       = window.useSiteLang;

/**
 * Typography in use — section 06.
 *
 * Six subsections: Hierarchy mocks, Mixing KR + Latin, Numbers,
 * Punctuation, Alignment, Don'ts.
 *
 * Korean blocks use --font-kr (Pretendard); Latin/numerals use
 * --font-sans (Montserrat). The "wrong" examples deliberately apply
 * the wrong font to the wrong content to demonstrate failure.
 */

const FK = "var(--font-kr)";    // Pretendard
const FM = "var(--font-sans)";  // Montserrat
const RED = "#E60012";
const INK = "var(--ink)";

/* ============================================================
   07.1 — Hierarchy in use
   ============================================================ */

// Inline annotation chip (red dashed outline + token label)
function Anno({ children }) {
  return <span className="tu-anno">{children}</span>;
}

function HierarchyMocks() {
  const c = useSectionContent('typography-in-use');
  const sub = (c.subsections && c.subsections.hierarchy) || {};
  return (
    <div id="tu-hierarchy" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>

      <div className="tu-mock-grid">
        {/* Mock 1 — Event header (English) */}
        <div className="tu-mock">
          <div className="tu-mock-stage tu-mock-stage-en">
            <div className="tu-line">
              <span style={{
                fontFamily: FM,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-soft)',
              }}>
                MARCH 19—22, 2026 · COEX SEOUL
              </span>
              <Anno>caption · Montserrat 700</Anno>
            </div>
            <div className="tu-line" style={{ marginTop: 14 }}>
              <span style={{
                fontFamily: FM,
                fontSize: 56,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: INK,
              }}>
                KIMES 2026
              </span>
              <Anno>display · Montserrat 900</Anno>
            </div>
            <div className="tu-line" style={{ marginTop: 12 }}>
              <span style={{
                fontFamily: FM,
                fontSize: 22,
                fontWeight: 400,
                lineHeight: 1.3,
                color: 'var(--ink-soft)',
              }}>
                Korea International Medical &amp; Hospital Equipment Show
              </span>
              <Anno>h3 · Montserrat 400</Anno>
            </div>
          </div>
          <div className="tu-mock-cap">Event header — English</div>
        </div>

        {/* Mock 2 — Korean article opener */}
        <div className="tu-mock">
          <div className="tu-mock-stage tu-mock-stage-en">
            <div className="tu-line">
              <span style={{
                fontFamily: `${FK}, ${FM}`,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--ink-soft)',
              }}>
                보도자료 · PRESS
              </span>
              <Anno>caption · Pretendard + Montserrat 700</Anno>
            </div>
            <div className="tu-line" style={{ marginTop: 14 }}>
              <span style={{
                fontFamily: `${FK}, ${FM}`,
                fontSize: 36,
                fontWeight: 900,
                lineHeight: 1.18,
                letterSpacing: '-0.01em',
                color: INK,
              }}>
                KIMES 2026, 41개국 1,490개 기업 참가
              </span>
              <Anno>h1 · Pretendard 900 (Latin in Montserrat)</Anno>
            </div>
            <div className="tu-line" style={{ marginTop: 12 }}>
              <span style={{
                fontFamily: `${FK}, ${FM}`,
                fontSize: 17,
                fontWeight: 400,
                lineHeight: 1.55,
                color: 'var(--ink-soft)',
              }}>
                한국 최대 의료기기 전시회 KIMES 2026이 코엑스에서 개막한다.
              </span>
              <Anno>body-lg · Pretendard 400</Anno>
            </div>
          </div>
          <div className="tu-mock-cap">Article opener — Korean</div>
        </div>

        {/* Mock 3 — Stat highlight */}
        <div className="tu-mock">
          <div className="tu-mock-stage tu-mock-stage-stat">
            <div style={{
              fontFamily: FM,
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: RED,
            }}>
              1,490
            </div>
            <Anno>display · Montserrat 900 · KIMES Red</Anno>
            <div style={{
              marginTop: 12,
              fontFamily: `${FM}, ${FK}`,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ink-soft)',
            }}>
              EXHIBITORS · 출품 기업
            </div>
            <Anno>caption · Montserrat 700 + Pretendard 700</Anno>
          </div>
          <div className="tu-mock-cap">Stat highlight — Bilingual</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   07.2 — Mixing Korean + Latin
   ============================================================ */
function MixingRules() {
  // Inline span helpers — applied via <code>-style structure but rendered
  // as actual styled text. Each rule has ✓ correct vs ✗ incorrect.
  function Sample({ ok, children }) {
    return (
      <div className={`tu-sample ${ok ? 'ok' : 'bad'}`}>
        <span className={`verdict ${ok ? 'ok' : 'avoid'}`}>{ok ? '✓' : '✗'}</span>
        <span className="tu-sample-text">{children}</span>
      </div>
    );
  }

  // Korean text wraps everything in Pretendard. To force Latin into Pretendard
  // (the wrong example), we wrap it explicitly in a span with FK only.
  // To do it correctly, we wrap Latin in FM.
  const kr = { fontFamily: FK };
  const enRight = { fontFamily: FM };
  const enWrong = { fontFamily: FK };

  const c = useSectionContent('typography-in-use');
  const sub = (c.subsections && c.subsections.mixing) || {};
  return (
    <div id="tu-mixing" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>

      <div className="tu-rule">
        <div className="tu-rule-head">
          <span className="tu-rule-num">1</span>
          <span className="tu-rule-name">Numerals always Montserrat</span>
        </div>
        <div className="tu-rule-grid">
          <Sample ok>
            <span style={kr}>전시기간 </span>
            <span style={enRight}>March 19—22, 2026</span>
          </Sample>
          <Sample ok={false}>
            <span style={kr}>전시기간 </span>
            <span style={enWrong}>March 19—22, 2026</span>
          </Sample>
        </div>
      </div>

      <div className="tu-rule">
        <div className="tu-rule-head">
          <span className="tu-rule-num">2</span>
          <span className="tu-rule-name">Acronyms always Montserrat</span>
        </div>
        <div className="tu-rule-grid">
          <Sample ok>
            <span style={enRight}>AI </span>
            <span style={kr}>기반 진단 시스템</span>
          </Sample>
          <Sample ok={false}>
            <span style={enWrong}>AI </span>
            <span style={kr}>기반 진단 시스템</span>
          </Sample>
        </div>
      </div>

      <div className="tu-rule">
        <div className="tu-rule-head">
          <span className="tu-rule-num">3</span>
          <span className="tu-rule-name">Brand names always Montserrat</span>
        </div>
        <div className="tu-rule-grid">
          <Sample ok>
            <span style={enRight}>KIMES </span>
            <span style={kr}>사무국</span>
          </Sample>
          <Sample ok={false}>
            <span style={enWrong}>KIMES </span>
            <span style={kr}>사무국</span>
          </Sample>
        </div>
      </div>

      <div className="tu-rule">
        <div className="tu-rule-head">
          <span className="tu-rule-num">4</span>
          <span className="tu-rule-name">Match weight and size on the same line</span>
        </div>
        <div className="tu-rule-grid">
          <Sample ok>
            <span style={{ ...kr, fontSize: 18, fontWeight: 600 }}>참가 기업 </span>
            <span style={{ ...enRight, fontSize: 18, fontWeight: 600 }}>EXHIBITORS</span>
          </Sample>
          <Sample ok={false}>
            <span style={{ ...kr, fontSize: 18, fontWeight: 700 }}>참가 기업 </span>
            <span style={{ ...enRight, fontSize: 18, fontWeight: 400 }}>EXHIBITORS</span>
          </Sample>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   07.3 — Number & data display
   ============================================================ */
function NumberFormats() {
  const rows = [
    { ctx: 'Stats / large numbers', fmt: 'Comma separator',                 ex: '1,490' },
    { ctx: 'Booth number',          fmt: 'ALL CAPS, hyphen',                ex: 'BOOTH A-101' },
    { ctx: 'Date — Korean',         fmt: '연 / 월 / 일',                       ex: '2026년 3월 19일', kr: true },
    { ctx: 'Date — English',        fmt: 'Month name + comma',              ex: 'March 19, 2026' },
    { ctx: 'Date range',            fmt: 'Em-dash, never hyphen',           ex: 'March 19—22, 2026' },
    { ctx: 'Time',                  fmt: 'Colon · em-dash for ranges',      ex: '10:00 — 11:30' },
    { ctx: 'Percentage',            fmt: 'No space before %',               ex: '25%' },
    { ctx: 'Price — KRW',           fmt: 'Won symbol + comma',              ex: '₩50,000' },
  ];

  const c = useSectionContent('typography-in-use');
  const sub = (c.subsections && c.subsections.numbers) || {};
  const headers = sub.headers || {};
  return (
    <div id="tu-numbers" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="tu-table-wrap">
        <table className="tu-table">
          <thead>
            <tr>
              <th>{headers.ctx}</th>
              <th>{headers.fmt}</th>
              <th>{headers.ex}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.ctx}>
                <td>{r.ctx}</td>
                <td>{r.fmt}</td>
                <td className="ex" style={{ fontFamily: r.kr ? `${FK}, ${FM}` : FM }}>
                  {r.ex}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   07.4 — Punctuation & dividers
   ============================================================ */
function PunctuationRules() {
  const rows = [
    { mark: '—',  name: 'Em-dash',    use: 'Date ranges, parenthetical breaks', ex: 'March 19—22 · "결과 — 단독 1위"' },
    { mark: '·',  name: 'Middle dot', use: 'Inline metadata separator',          ex: '보도자료 · PRESS' },
    { mark: '/',  name: 'Slash',      use: 'Bilingual labels',                   ex: '참가 기업 / EXHIBITORS' },
    { mark: ':',  name: 'Colon',      use: 'Standard label–value pair',          ex: 'Date: March 19' },
  ];
  const avoid = [
    { mark: '-',  what: 'Hyphen for ranges',     instead: 'Use em-dash —' },
    { mark: ',',  what: 'Comma in metadata sep', instead: 'Use middle dot ·' },
  ];

  const c = useSectionContent('typography-in-use');
  const sub = (c.subsections && c.subsections.punctuation) || {};
  const headers = sub.headers || {};
  return (
    <div id="tu-punctuation" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>

      <div className="tu-table-wrap">
        <table className="tu-table">
          <thead>
            <tr>
              <th style={{ width: 56 }}>{headers.mark}</th>
              <th>{headers.name}</th>
              <th>{headers.use}</th>
              <th>{headers.ex}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.mark}>
                <td className="ex" style={{ fontSize: 22, fontWeight: 700, color: INK, fontFamily: FM }}>{r.mark}</td>
                <td>{r.name}</td>
                <td>{r.use}</td>
                <td className="ex" style={{ fontFamily: `${FK}, ${FM}` }}>{r.ex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tu-avoid">
        <span className="tu-avoid-label">{sub.avoidLabel || 'Avoid'}</span>
        <div className="tu-avoid-list">
          {avoid.map(a => (
            <div className="tu-avoid-item" key={a.what}>
              <span className="tu-avoid-mark">{a.mark}</span>
              <span><strong>{a.what}</strong> — {a.instead}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   07.5 — Alignment & line breaks
   ============================================================ */
function AlignmentRules() {
  const c = useSectionContent('typography-in-use');
  const sub = (c.subsections && c.subsections.alignment) || {};
  return (
    <div id="tu-alignment" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="tu-align-grid">

        {/* 1 — left vs justify */}
        <div className="tu-align-card">
          <div className="tu-align-pair">
            <div className="tu-align-cell ok">
              <span className="verdict ok">✓</span>
              <p style={{ fontFamily: `${FK}, ${FM}`, fontSize: 14, lineHeight: 1.6, textAlign: 'left' }}>
                KIMES는 매년 3월 코엑스에서 1,490개 기업과 8만여 명의 전문 관람객이 참여하는 한국 최대 의료기기 전시회입니다.
              </p>
              <span className="tu-align-tag">Default — Left-aligned</span>
            </div>
            <div className="tu-align-cell bad">
              <span className="verdict avoid">✗</span>
              <p style={{ fontFamily: `${FK}, ${FM}`, fontSize: 14, lineHeight: 1.6, textAlign: 'justify' }}>
                KIMES는 매년 3월 코엑스에서 1,490개 기업과 8만여 명의 전문 관람객이 참여하는 한국 최대 의료기기 전시회입니다.
              </p>
              <span className="tu-align-tag">Avoid — Justified body in Korean</span>
            </div>
          </div>
          <div className="tu-align-rule">Never justify Korean body — creates word-spacing gaps.</div>
        </div>

        {/* 2 — center for headlines */}
        <div className="tu-align-card">
          <div className="tu-align-pair">
            <div className="tu-align-cell ok">
              <span className="verdict ok">✓</span>
              <p style={{ fontFamily: FM, fontSize: 22, lineHeight: 1.2, textAlign: 'center', fontWeight: 800 }}>
                KIMES 2026
              </p>
              <span className="tu-align-tag">OK — Short headline, center</span>
            </div>
            <div className="tu-align-cell bad">
              <span className="verdict avoid">✗</span>
              <p style={{ fontFamily: `${FK}, ${FM}`, fontSize: 14, lineHeight: 1.6, textAlign: 'center' }}>
                KIMES는 매년 3월 코엑스에서 1,490개 기업과 8만여 명의 전문 관람객이 참여하는 한국 최대 의료기기 전시회입니다.
              </p>
              <span className="tu-align-tag">Avoid — Centered body paragraph</span>
            </div>
          </div>
          <div className="tu-align-rule">Center is for short headlines on covers / posters only.</div>
        </div>

        {/* 3 — Korean breaks at word boundaries */}
        <div className="tu-align-card">
          <div className="tu-align-pair">
            <div className="tu-align-cell ok">
              <span className="verdict ok">✓</span>
              <p style={{ fontFamily: `${FK}, ${FM}`, fontSize: 14, lineHeight: 1.7, wordBreak: 'keep-all', maxWidth: 220 }}>
                KIMES는 매년 3월 코엑스에서 개최되는 한국 최대 의료기기 전시회입니다.
              </p>
              <span className="tu-align-tag">word-break: keep-all</span>
            </div>
            <div className="tu-align-cell bad">
              <span className="verdict avoid">✗</span>
              <p style={{ fontFamily: `${FK}, ${FM}`, fontSize: 14, lineHeight: 1.7, wordBreak: 'break-all', maxWidth: 220 }}>
                KIMES는 매년 3월 코엑스에서 개최되는 한국 최대 의료기기 전시회입니다.
              </p>
              <span className="tu-align-tag">word-break: break-all</span>
            </div>
          </div>
          <div className="tu-align-rule">Korean must break at 어절 (word) boundaries, not random characters.</div>
        </div>

      </div>
    </div>
  );
}

/* ============================================================
   07.6 — Don'ts (8-cell grid)
   ============================================================ */
function TypographyDonts() {
  const lang = useSiteLang();
  const items = [
    {
      id: 'kr-in-mont',
      ko: '한글에 Montserrat 사용',
      en: 'Korean text in Montserrat',
      art: () => (
        <div style={{ fontFamily: FM, fontSize: 17, color: INK, lineHeight: 1.4 }}>
          한국 최대 의료기기 전시회
        </div>
      ),
    },
    {
      id: 'num-in-pretendard',
      ko: '숫자에 Pretendard 사용',
      en: 'Numbers in Pretendard',
      art: () => (
        <div style={{ fontFamily: FK, fontSize: 17, color: INK, lineHeight: 1.4 }}>
          전시기간 March 19—22, 2026
        </div>
      ),
    },
    {
      id: 'italic-mont',
      ko: '이탤릭 사용',
      en: 'Italic Montserrat',
      art: () => (
        <div style={{ fontFamily: FM, fontStyle: 'italic', fontSize: 19, fontWeight: 700, color: INK, lineHeight: 1.3 }}>
          KIMES 2026 — coming soon
        </div>
      ),
    },
    {
      id: 'mixed-weights',
      ko: '한 줄 내 굵기 혼용',
      en: 'Mixed weights randomly',
      art: () => (
        <div style={{ fontFamily: `${FK}, ${FM}`, fontSize: 17, lineHeight: 1.4, color: INK }}>
          <span style={{ fontWeight: 900 }}>KIMES </span>
          <span style={{ fontWeight: 300 }}>2026 </span>
          <span style={{ fontWeight: 700 }}>참가 </span>
          <span style={{ fontWeight: 400 }}>기업 </span>
          <span style={{ fontWeight: 800 }}>모집</span>
        </div>
      ),
    },
    {
      id: 'tracked-pretendard',
      ko: 'Pretendard 본문에 자간 적용',
      en: 'Letter-spacing on Pretendard body',
      art: () => (
        <div style={{ fontFamily: FK, fontSize: 14, lineHeight: 1.6, color: INK, letterSpacing: '0.18em' }}>
          한국 최대 의료기기 전시회 KIMES 2026
        </div>
      ),
    },
    {
      id: 'justified',
      ko: '본문 양쪽 정렬',
      en: 'Justified body — Korean gaps',
      art: () => (
        <div style={{ fontFamily: `${FK}, ${FM}`, fontSize: 13, lineHeight: 1.6, color: INK, textAlign: 'justify', maxWidth: 200 }}>
          KIMES는 매년 3월 코엑스에서 개최되는 한국 최대 의료기기 전시회입니다.
        </div>
      ),
    },
    {
      id: 'third-typeface',
      ko: '제3의 서체 사용',
      en: 'Third typeface beyond brand',
      art: () => (
        <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 22, fontStyle: 'italic', color: INK, lineHeight: 1.3 }}>
          KIMES 2026
        </div>
      ),
    },
    {
      id: 'logo-as-text',
      ko: '로고를 일반 텍스트로 재조판',
      en: 'KIMES wordmark re-typeset in plain Montserrat',
      art: () => (
        <div style={{ fontFamily: FM, fontSize: 38, fontWeight: 800, color: RED, lineHeight: 1, letterSpacing: '-0.01em' }}>
          KIMES
        </div>
      ),
    },
  ];

  const c = useSectionContent('typography-in-use');
  const sub = (c.subsections && c.subsections.donts) || {};
  return (
    <div id="tu-donts" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="tu-donts-grid">
        {items.map(item => (
          <div className="tu-dont-cell" key={item.id}>
            <span className="tu-dont-x" aria-hidden="true">✗</span>
            <div className="tu-dont-art">{item.art()}</div>
            <div className="tu-dont-meta">
              <span className="vlabel">{lang === 'ko' ? item.ko : item.en}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Page wrapper
   ============================================================ */
function TypographyInUse() {
  const c = useSectionContent('typography-in-use');
  return (
    <section id="typography-in-use" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <HierarchyMocks />
      <MixingRules />
      <NumberFormats />
      <PunctuationRules />
      <AlignmentRules />
      <TypographyDonts />
    </section>
  );
}

window.TypographyInUse = TypographyInUse;

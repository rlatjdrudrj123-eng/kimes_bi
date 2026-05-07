/* KIMES Design System — Social / OG templates (Section 17) */

const useSectionContent = window.useSectionContent;

const SOCIAL_FORMATS = [
{ aspect: '1:1', dims: '1080×1080', pixel: '1:1', shape: { w: 110, h: 110 }, platforms: ['Instagram', 'Threads', 'LinkedIn', 'KakaoCh.'] },
{ aspect: '4:5', dims: '1080×1350', pixel: '4:5', shape: { w: 96, h: 120 }, platforms: ['Instagram (feed)', 'LinkedIn'] },
{ aspect: '9:16', dims: '1080×1920', pixel: '9:16', shape: { w: 70, h: 124 }, platforms: ['Stories', 'Reels', 'TikTok', 'Shorts'] },
{ aspect: 'OG', dims: '1200×630', pixel: '1.9:1', shape: { w: 156, h: 82 }, platforms: ['LinkedIn share', 'Twitter card', 'KakaoTalk preview'] }];


const SPECS = [
{ name: 'Instagram feed (square)', aspect: '1:1', px: '1080×1080', safe: '40 px', note: 'Profile crops to circle in some surfaces — keep mark inside center 80%.' },
{ name: 'Instagram feed (tall)', aspect: '4:5', px: '1080×1350', safe: '48 px', note: 'Highest engagement format on feed; preferred for static posters.' },
{ name: 'Stories / Reels', aspect: '9:16', px: '1080×1920', safe: '14% top / 14% bottom', note: 'Top band hidden by username; bottom band hidden by reply UI on most clients.' },
{ name: 'OG card (web link)', aspect: '1200/630', px: '1200×630', safe: '60 px', note: 'LinkedIn previews crop to 1.91:1; Twitter and KakaoTalk both consume 1200×630 cleanly.' },
{ name: 'TikTok / Shorts', aspect: '9:16', px: '1080×1920', safe: '15% bottom for caption', note: 'Reserve full bottom 15% for client-side caption stack.' },
{ name: 'KakaoTalk channel cover', aspect: '5:2', px: '1500×600', safe: '40 px', note: 'Korea-specific. Used for KIMES Channel header.' }];


/* ---------- Canvas templates ---------- */

function PosterCanvas({ aspectClass, brand, title, date, hall, edition }) {
  const accent = brand === 'kimes' ? '#E60012' : brand === 'mc' ? '#036EB8' : brand === 'bd' ? '#E5006A' : '#C4E600';
  return (
    <div className={`so-canvas so-aspect-${aspectClass} so-layout-poster`} style={{ background: accent }}>
      <div>
        <div className="head">{edition}</div>
        <span className="corner-tag">KIMES 2026 · #01</span>
      </div>
      <div className="title" style={{ textWrap: 'balance', fontSize: "58px" }}>{title}</div>
      <div className="meta">
        <span>{date}</span>
        <span>{hall}</span>
      </div>
      <span className="footer-tag">{aspectClass.toUpperCase()}</span>
    </div>);

}

function QuoteCanvas({ aspectClass, body, attr }) {
  return (
    <div className={`so-canvas so-aspect-${aspectClass} so-layout-quote`}>
      <span className="corner-tag dark">KIMES 2026 · #02</span>
      <div className="quote-mark">"</div>
      <div className="quote-body" style={{ textWrap: 'balance' }}>{body}</div>
      <div className="quote-attr">{attr}</div>
      <span className="footer-tag dark">{aspectClass.toUpperCase()}</span>
    </div>);

}

function CountdownCanvas({ aspectClass, days }) {
  return (
    <div className={`so-canvas so-aspect-${aspectClass} so-layout-countdown`}>
      <div className="head">Days until KIMES 2026</div>
      <span className="corner-tag">KIMES 2026 · #03</span>
      <div className="num-wrap">
        <div className="num">{days}</div>
      </div>
      <div className="meta">
        <span>March 19–22 · COEX</span>
        <span>kimes.kr</span>
      </div>
      <span className="footer-tag">{aspectClass.toUpperCase()}</span>
    </div>);

}

function OgCanvas() {
  return (
    <div className="so-canvas so-aspect-og so-layout-og">
      <div>
        <div className="head">KIMES 2026 · 41st edition</div>
        <div className="title" style={{ textWrap: 'balance' }}>Korea International Medical &amp; Hospital Equipment Show</div>
        <div className="meta">
          <span>March 19 – 22, 2026 · COEX, Seoul</span>
          <span style={{ color: 'var(--ink-muted)' }}>1,400+ exhibitors · 60+ countries</span>
        </div>
      </div>
      <div className="right">
        <div className="label">Days to go</div>
        <div className="num">317</div>
        <div className="sub">Hall A–E · kimes.kr</div>
      </div>
    </div>);

}

function StackCanvas({ aspectClass, title, body, foot }) {
  return (
    <div className={`so-canvas so-aspect-${aspectClass} so-layout-stack`}>
      <div className="head">MEDICOMTEK · CONNECTED CARE</div>
      <span className="corner-tag">KIMES 2026 · #05</span>
      <div className="title" style={{ textWrap: 'balance' }}>{title}</div>
      <div className="body" style={{ textWrap: 'pretty' }}>{body}</div>
      <div className="foot">
        <span>{foot}</span>
        <span>medicomtek.kr</span>
      </div>
      <span className="footer-tag">{aspectClass.toUpperCase()}</span>
    </div>);

}

function BdCanvas({ aspectClass }) {
  return (
    <div className={`so-canvas so-aspect-${aspectClass} so-layout-bd`}>
      <div>
        <div className="head">Beauty &amp; Derma — Track 03</div>
        <span className="corner-tag">KIMES 2026 · #06</span>
      </div>
      <div className="title" style={{ textWrap: 'balance' }}>Aesthetic medicine, refined.</div>
      <div className="meta">Hall D · March 20</div>
      <span className="footer-tag">{aspectClass.toUpperCase()}</span>
    </div>);

}

function InspireCanvas({ aspectClass }) {
  return (
    <div className={`so-canvas so-aspect-${aspectClass} so-layout-inspire`}>
      <div className="head">INSPIRE Digital Health · Stage 02</div>
      <span className="corner-tag dark">KIMES 2026 · #07</span>
      <div className="body" style={{ textWrap: 'balance' }}>
        <span className="pulse"></span>
        Health meets innovation — live from COEX.
      </div>
      <div className="foot">
        <span>March 21 · 14:00 KST</span>
        <span>kimes.kr/inspire</span>
      </div>
    </div>);

}

const TEMPLATES = [
{ id: 't1', name: '#01 — Hero poster', tag: '4:5 · KIMES red', desc: 'Anchor poster for feed and LinkedIn announcements. Korean / English copy slot, dates and hall pinned to the bottom rail.', Canvas: () => <PosterCanvas aspectClass="4x5" brand="kimes" edition="41st edition · 2026" title="The future of medical innovation begins here." date="March 19–22, 2026" hall="COEX · Seoul" /> },
{ id: 't2', name: '#02 — Pull quote', tag: '1:1 · light', desc: 'Editorial style for press, exhibitor testimonials, and stage-talk teasers. Balances brand red against white surface.', Canvas: () => <QuoteCanvas aspectClass="1x1" body="The next wave of Korean medical devices is precision-engineered, AI-assisted, and globally validated." attr="Dr. Park Young-hee · Chair, KIMES 2026" /> },
{ id: 't3', name: '#03 — Countdown', tag: '9:16 · dark', desc: 'Stories / Reels countdown. Brand-red accent dot anchors the numeral; updates daily from D-365 to D-day.', Canvas: () => <CountdownCanvas aspectClass="9x16" days="317" /> },
{ id: 't4', name: '#04 — OG share card', tag: '1200×630 · OG', desc: 'Universal link preview for kimes.kr and partner sites. Two-zone layout keeps the headline left-justified; right zone holds the live countdown.', Canvas: () => <OgCanvas /> },
{ id: 't5', name: '#05 — MedicomteK', tag: '4:5 · MC blue', desc: 'Sub-brand variant for MedicomteK posts. Uses the brand blue and tightened typography appropriate for the sister exhibition.', Canvas: () => <StackCanvas aspectClass="4x5" title="Where devices learn to talk." body="MedicomteK gathers Korea's leading connected-care manufacturers, hospital integrators, and protocol authors at KIMES 2026." foot="Hall C · March 20" /> },
{ id: 't6', name: '#06 — Beauty&Derma', tag: '1:1 · BD pink', desc: 'Beauty & Derma sub-brand. Soft circular accent maintains family identity while signaling the aesthetics track.', Canvas: () => <BdCanvas aspectClass="1x1" /> },
{ id: 't7', name: '#07 — INSPIRE live', tag: '9:16 · INSPIRE lime', desc: 'INSPIRE Digital Health sub-brand. High-contrast lime/ink combination meets AAA contrast for outdoor mobile viewing.', Canvas: () => <InspireCanvas aspectClass="9x16" /> },
{ id: 't8', name: '#08 — Hero poster (KO)', tag: '4:5 · 한국어', desc: '#01 with Korean copy. Demonstrates Pretendard handling at hero scale; identical layout, accents, and hierarchy.', Canvas: () => <PosterCanvas aspectClass="4x5" brand="kimes" edition="제41회 · 2026" title="대한민국 의료혁신, 여기에서 시작됩니다." date="2026년 3월 19–22일" hall="코엑스 · 서울" /> }];


/* ============ Sections ============ */

function SocialFormats() {
  const c = useSectionContent('social-templates');
  const sub = (c.subsections && c.subsections.formats) || {};
  return (
    <div id="so-formats" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="so-formats">
        {SOCIAL_FORMATS.map((f) =>
        <div className="so-format" key={f.aspect}>
            <div className="so-format-shape" style={{ width: f.shape.w, height: f.shape.h }}>{f.aspect}</div>
            <div>
              <div className="so-format-name">{f.aspect}{f.aspect !== 'OG' ? ' aspect' : ' card'}</div>
              <div className="so-format-spec">{f.dims} · {f.pixel}</div>
            </div>
            <div className="so-format-platforms">
              {f.platforms.map((p) => <span className="so-platform" key={p}>{p}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>);

}

function SocialGallery() {
  const c = useSectionContent('social-templates');
  const sub = (c.subsections && c.subsections.gallery) || {};
  return (
    <div id="so-gallery" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="so-gallery">
        {TEMPLATES.map((t) =>
        <div className="so-template-card" key={t.id}>
            <div className="so-template-stage">
              <t.Canvas />
            </div>
            <div className="so-template-meta">
              <div className="so-template-name">{t.name}</div>
              <div className="so-template-tag">{t.tag}</div>
              <div className="so-template-desc">{t.desc}</div>
            </div>
          </div>
        )}
      </div>
    </div>);

}

function SocialSafezone() {
  const c = useSectionContent('social-templates');
  const sub = (c.subsections && c.subsections.safezone) || {};
  const rules = sub.rules || [];
  return (
    <div id="so-safezone" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="so-safezone">
        <div className="so-safezone-diagram">
          <div className="top-band">{sub.topBand}</div>
          <div className="safe-area"></div>
          <div className="bottom-band">{sub.bottomBand}</div>
        </div>
        <div className="so-safezone-content">
          <h4>{sub.heading}</h4>
          <p>{sub.body}</p>
          <ul>
            {rules.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      </div>
    </div>);

}

function SocialSpecs() {
  const c = useSectionContent('social-templates');
  const sub = (c.subsections && c.subsections.specs) || {};
  const headers = sub.headers || {};
  return (
    <div id="so-specs" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="so-specs">
        <div className="so-specs-row is-head">
          <span>{headers.name}</span>
          <span>{headers.aspect}</span>
          <span>{headers.px}</span>
          <span>{headers.safe}</span>
          <span>{headers.note}</span>
        </div>
        {SPECS.map((s) =>
        <div className="so-specs-row" key={s.name}>
            <span className="so-specs-name">{s.name}</span>
            <span className="so-specs-mono">{s.aspect}</span>
            <span className="so-specs-mono">{s.px}</span>
            <span className="so-specs-mono">{s.safe}</span>
            <span className="so-specs-note">{s.note}</span>
          </div>
        )}
      </div>
    </div>);

}

/* ---------- Page wrapper ---------- */
function SocialTemplates() {
  const c = useSectionContent('social-templates');
  return (
    <section id="social-templates" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
      <SocialFormats />
      <SocialGallery />
      <SocialSafezone />
      <SocialSpecs />
    </section>);

}

window.SocialTemplates = SocialTemplates;
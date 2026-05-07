/* KIMES Design System — Social / OG templates (Section 17) */

const useSectionContent = window.useSectionContent;
const useSiteLang       = window.useSiteLang;
function trS(en, ko, lang) { return lang === 'ko' && ko ? ko : en; }

const SOCIAL_FORMATS = [
{ aspect: '1:1', dims: '1080×1080', pixel: '1:1', shape: { w: 110, h: 110 }, platforms: ['Instagram', 'Threads', 'LinkedIn', 'KakaoCh.'] },
{ aspect: '4:5', dims: '1080×1350', pixel: '4:5', shape: { w: 96, h: 120 }, platforms: ['Instagram (feed)', 'LinkedIn'] },
{ aspect: '9:16', dims: '1080×1920', pixel: '9:16', shape: { w: 70, h: 124 }, platforms: ['Stories', 'Reels', 'TikTok', 'Shorts'] },
{ aspect: 'OG', dims: '1200×630', pixel: '1.9:1', shape: { w: 156, h: 82 }, platforms: ['LinkedIn share', 'Twitter card', 'KakaoTalk preview'] }];


const SPECS = [
{ name: 'Instagram feed (square)', krName: 'Instagram 피드 (정사각)', aspect: '1:1', px: '1080×1080', safe: '40 px', krSafe: '40 px', note: 'Profile crops to circle in some surfaces — keep mark inside center 80%.', krNote: '일부 표면에서 프로필이 원형으로 크롭됨 — 마크는 중앙 80% 안에.' },
{ name: 'Instagram feed (tall)', krName: 'Instagram 피드 (세로형)', aspect: '4:5', px: '1080×1350', safe: '48 px', krSafe: '48 px', note: 'Highest engagement format on feed; preferred for static posters.', krNote: '피드에서 가장 높은 참여율; 정적 포스터에 선호.' },
{ name: 'Stories / Reels', krName: '스토리 / 릴스', aspect: '9:16', px: '1080×1920', safe: '14% top / 14% bottom', krSafe: '상단 14% / 하단 14%', note: 'Top band hidden by username; bottom band hidden by reply UI on most clients.', krNote: '대부분 클라이언트에서 상단은 사용자명, 하단은 답글 UI로 가려짐.' },
{ name: 'OG card (web link)', krName: 'OG 카드 (웹 링크)', aspect: '1200/630', px: '1200×630', safe: '60 px', krSafe: '60 px', note: 'LinkedIn previews crop to 1.91:1; Twitter and KakaoTalk both consume 1200×630 cleanly.', krNote: 'LinkedIn은 1.91:1로 크롭; Twitter·카카오톡은 1200×630을 그대로 사용.' },
{ name: 'TikTok / Shorts', krName: 'TikTok / Shorts', aspect: '9:16', px: '1080×1920', safe: '15% bottom for caption', krSafe: '하단 15% 캡션용', note: 'Reserve full bottom 15% for client-side caption stack.', krNote: '하단 15%는 클라이언트 캡션 스택용으로 비워둘 것.' },
{ name: 'KakaoTalk channel cover', krName: '카카오톡 채널 커버', aspect: '5:2', px: '1500×600', safe: '40 px', krSafe: '40 px', note: 'Korea-specific. Used for KIMES Channel header.', krNote: '한국 전용. KIMES 채널 헤더에 사용.' }];


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
{ id: 't1', name: '#01 — Hero poster',     krName: '#01 — 히어로 포스터',     tag: '4:5 · KIMES red',         krTag: '4:5 · KIMES 레드',           desc: 'Anchor poster for feed and LinkedIn announcements. Korean / English copy slot, dates and hall pinned to the bottom rail.', krDesc: '피드·LinkedIn 발표용 메인 포스터. 한·영 카피 슬롯, 날짜·홀 정보는 하단 레일 고정.', Canvas: () => <PosterCanvas aspectClass="4x5" brand="kimes" edition="41st edition · 2026" title="The future of medical innovation begins here." date="March 19–22, 2026" hall="COEX · Seoul" /> },
{ id: 't2', name: '#02 — Pull quote',       krName: '#02 — 풀 쿼트',             tag: '1:1 · light',             krTag: '1:1 · 라이트',                desc: 'Editorial style for press, exhibitor testimonials, and stage-talk teasers. Balances brand red against white surface.', krDesc: '프레스·참가업체 후기·무대 토크 티저용 에디토리얼 스타일. 흰 표면 위 브랜드 레드 균형.', Canvas: () => <QuoteCanvas aspectClass="1x1" body="The next wave of Korean medical devices is precision-engineered, AI-assisted, and globally validated." attr="Dr. Park Young-hee · Chair, KIMES 2026" /> },
{ id: 't3', name: '#03 — Countdown',         krName: '#03 — 카운트다운',         tag: '9:16 · dark',             krTag: '9:16 · 다크',                 desc: 'Stories / Reels countdown. Brand-red accent dot anchors the numeral; updates daily from D-365 to D-day.', krDesc: '스토리·릴스 카운트다운. 브랜드 레드 액센트 도트가 숫자를 잡아줌; D-365부터 D-day까지 매일 업데이트.', Canvas: () => <CountdownCanvas aspectClass="9x16" days="317" /> },
{ id: 't4', name: '#04 — OG share card',     krName: '#04 — OG 공유 카드',       tag: '1200×630 · OG',           krTag: '1200×630 · OG',                desc: 'Universal link preview for kimes.kr and partner sites. Two-zone layout keeps the headline left-justified; right zone holds the live countdown.', krDesc: 'kimes.kr·파트너 사이트용 범용 링크 프리뷰. 두 영역 레이아웃 — 왼쪽 헤드라인, 오른쪽 라이브 카운트다운.', Canvas: () => <OgCanvas /> },
{ id: 't5', name: '#05 — MedicomteK',       krName: '#05 — MedicomteK',          tag: '4:5 · MC blue',           krTag: '4:5 · MC 블루',                desc: 'Sub-brand variant for MedicomteK posts. Uses the brand blue and tightened typography appropriate for the sister exhibition.', krDesc: 'MedicomteK 포스트용 서브브랜드 변형. 브랜드 블루와 자매 전시회에 맞는 타이포 사용.', Canvas: () => <StackCanvas aspectClass="4x5" title="Where devices learn to talk." body="MedicomteK gathers Korea's leading connected-care manufacturers, hospital integrators, and protocol authors at KIMES 2026." foot="Hall C · March 20" /> },
{ id: 't6', name: '#06 — Beauty&Derma',     krName: '#06 — Beauty&Derma',        tag: '1:1 · BD pink',           krTag: '1:1 · BD 핑크',                desc: 'Beauty & Derma sub-brand. Soft circular accent maintains family identity while signaling the aesthetics track.', krDesc: 'Beauty & Derma 서브브랜드. 부드러운 원형 액센트가 패밀리 아이덴티티를 유지하면서 미용 트랙을 신호.', Canvas: () => <BdCanvas aspectClass="1x1" /> },
{ id: 't7', name: '#07 — INSPIRE live',     krName: '#07 — INSPIRE 라이브',     tag: '9:16 · INSPIRE lime',     krTag: '9:16 · INSPIRE 라임',         desc: 'INSPIRE Digital Health sub-brand. High-contrast lime/ink combination meets AAA contrast for outdoor mobile viewing.', krDesc: 'INSPIRE Digital Health 서브브랜드. 라임·잉크 고대비 조합이 옥외 모바일 시청 환경에서 AAA 명도 대비 충족.', Canvas: () => <InspireCanvas aspectClass="9x16" /> },
{ id: 't8', name: '#08 — Hero poster (KO)', krName: '#08 — 히어로 포스터 (한국어)', tag: '4:5 · 한국어',          krTag: '4:5 · 한국어',                desc: '#01 with Korean copy. Demonstrates Pretendard handling at hero scale; identical layout, accents, and hierarchy.', krDesc: '#01의 한국어 카피 버전. 히어로 스케일에서 Pretendard 처리 시연; 동일 레이아웃·액센트·위계.', Canvas: () => <PosterCanvas aspectClass="4x5" brand="kimes" edition="제41회 · 2026" title="대한민국 의료혁신, 여기에서 시작됩니다." date="2026년 3월 19–22일" hall="코엑스 · 서울" /> }];


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
  const lang = useSiteLang();
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
              <div className="so-template-name">{trS(t.name, t.krName, lang)}</div>
              <div className="so-template-tag">{trS(t.tag, t.krTag, lang)}</div>
              <div className="so-template-desc">{trS(t.desc, t.krDesc, lang)}</div>
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
  const lang = useSiteLang();
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
            <span className="so-specs-name">{trS(s.name, s.krName, lang)}</span>
            <span className="so-specs-mono">{s.aspect}</span>
            <span className="so-specs-mono">{s.px}</span>
            <span className="so-specs-mono">{trS(s.safe, s.krSafe, lang)}</span>
            <span className="so-specs-note">{trS(s.note, s.krNote, lang)}</span>
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
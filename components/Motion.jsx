/* KIMES Design System — Motion & animation kit (Section 15) */

const useSectionContent = window.useSectionContent;
const useSiteLang       = window.useSiteLang;
function trM(en, ko, lang) { return lang === 'ko' && ko ? ko : en; }

const EASINGS = [
  { name: 'Brand Out',    spec: 'cubic-bezier(0.22, 0.61, 0.36, 1)', use: 'Default for entries, reveals, and brand wordmark loops.', krUse: '엔트리·리빌·브랜드 워드마크 루프의 기본값.',   path: 'M 4 76 C 25 76, 60 14, 116 14' },
  { name: 'Standard',     spec: 'cubic-bezier(0.4, 0.0, 0.2, 1)',     use: 'UI transitions inside product surfaces.',                 krUse: '제품 표면 내 UI 전환.',                         path: 'M 4 76 C 50 76, 70 14, 116 14' },
  { name: 'Decelerate',   spec: 'cubic-bezier(0.0, 0.0, 0.2, 1)',     use: 'Elements entering the viewport.',                         krUse: '뷰포트로 진입하는 요소.',                       path: 'M 4 76 C 4 76, 70 14, 116 14' },
  { name: 'Accelerate',   spec: 'cubic-bezier(0.4, 0.0, 1.0, 1.0)',   use: 'Elements leaving the viewport.',                          krUse: '뷰포트에서 빠져나가는 요소.',                   path: 'M 4 76 C 50 76, 116 76, 116 14' },
];

const DURATIONS = [
  { name: '--motion-xs',  ms: 120,  use: 'Hover, focus, micro-feedback.',                       krUse: '호버, 포커스, 마이크로 피드백.',           pct: 8  },
  { name: '--motion-sm',  ms: 220,  use: 'Tooltip, popover, small reveals.',                    krUse: '툴팁, 팝오버, 작은 리빌.',                pct: 15 },
  { name: '--motion-md',  ms: 360,  use: 'Modal entry, card flips.',                            krUse: '모달 엔트리, 카드 플립.',                 pct: 24 },
  { name: '--motion-lg',  ms: 600,  use: 'Page-level transitions, hero reveals.',                krUse: '페이지 단위 전환, 히어로 리빌.',           pct: 40 },
  { name: '--motion-xl',  ms: 1200, use: 'Brand wordmark entry — sponsor reels, stage screens.', krUse: '브랜드 워드마크 엔트리 — 스폰서 릴, 무대.', pct: 80 },
  { name: '--motion-loop',ms: 4000, use: 'Wordmark idle loop on stage / signage.',               krUse: '무대·사이니지의 워드마크 유휴 루프.',     pct: 100 },
];

const VARIANTS = [
  {
    id: 'kimes-entry',
    name: 'KIMES — slash sweep entry',
    krName: 'KIMES — 슬래시 스윕 엔트리',
    desc: 'A diagonal red highlight passes across the wordmark, anchored to the slash-cut i. Lands on the static logo at 1.2s.',
    krDesc: '슬래시컷 i를 기준으로 대각선 레드 하이라이트가 워드마크를 가로지릅니다. 1.2초에 정적 로고로 안착.',
    tag: '1.2s · ease-out',
    krTag: '1.2초 · ease-out',
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
    krName: 'KIMES — 와이프 리빌',
    desc: 'Wordmark revealed by a left-to-right wipe. Suitable for video stingers and pre-roll.',
    krDesc: '좌→우 와이프로 워드마크 노출. 영상 스팅거·프리롤에 적합.',
    tag: '1.6s · ease-in-out',
    krTag: '1.6초 · ease-in-out',
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
    krName: 'MedicomteK — 페이드업',
    desc: 'Soft 8px rise + fade. Calm, instrument-grade. Uses Brand Out easing.',
    krDesc: '8px 부드러운 상승 + 페이드. 차분하고 정밀 기기 톤. Brand Out 이징.',
    tag: '0.6s · brand-out',
    krTag: '0.6초 · brand-out',
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
    krName: 'Beauty&Derma — 글자 스태거',
    desc: 'Each character fades up with a 80ms stagger. For product launches and beauty-tech segments.',
    krDesc: '각 글자가 80ms 간격으로 페이드업. 제품 런칭, 뷰티테크 세그먼트용.',
    tag: '0.6s × 6 · stagger 80ms',
    krTag: '0.6초 × 6 · 스태거 80ms',
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
    krName: 'INSPIRE — 펄스 도트',
    desc: 'Heartbeat-tempo pulse on the brand dot. Ambient signature for digital surfaces.',
    krDesc: '심박 템포의 펄스가 브랜드 도트에 적용. 디지털 표면의 앰비언트 시그니처.',
    tag: '1.6s · sine · loop',
    krTag: '1.6초 · sine · 루프',
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
    krName: 'KIMES — 다크 변형',
    desc: 'White wordmark on near-black surface with the same slash sweep. For sponsor reels and stage backdrops.',
    krDesc: '근-블랙 표면 위 화이트 워드마크에 동일 슬래시 스윕. 스폰서 릴, 무대 백드롭용.',
    tag: '1.2s · ease-out',
    krTag: '1.2초 · ease-out',
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
    krDesc: '벡터 기반, 자유 스케일, 런타임 테마 변경 가능. 웹·앱·무대 스크린 등 최종 출력이 재타이밍될 수 있는 곳에 사용.',
    specs: [
      ['Size budget', '≤ 80 KB',                                    '용량 한도', '≤ 80 KB'],
      ['Frame rate', '30 fps',                                       '프레임 레이트', '30 fps'],
      ['Color mode', 'sRGB · brand tokens injected at runtime',       '컬러 모드', 'sRGB · 런타임에 브랜드 토큰 주입'],
    ],
  },
  {
    name: 'MP4',
    ext: '.mp4',
    desc: 'Pre-rendered, transparent-fallback safe. Use for sponsor reels, social platforms that block Lottie, and live broadcast.',
    krDesc: '사전 렌더링, 투명 폴백 안전. 스폰서 릴, Lottie를 차단하는 SNS 플랫폼, 라이브 방송에 사용.',
    specs: [
      ['Codec', 'H.264 · 8-bit',                                                 '코덱', 'H.264 · 8-bit'],
      ['Resolution', '1920×1080 · 1080×1920 · 1080×1080',                        '해상도', '1920×1080 · 1080×1920 · 1080×1080'],
      ['Frame rate', '30 fps',                                                   '프레임 레이트', '30 fps'],
      ['Audio', 'None — silent stinger',                                          '오디오', '없음 — 무음 스팅거'],
    ],
  },
  {
    name: 'WebM (alpha)',
    ext: '.webm',
    desc: 'For overlay use cases that need a transparent background — keynote screens and chroma-keyed broadcast.',
    krDesc: '투명 배경이 필요한 오버레이 — 키노트 스크린, 크로마키 방송용.',
    specs: [
      ['Codec', 'VP9 · alpha channel',     '코덱', 'VP9 · 알파 채널'],
      ['Resolution', '1920×1080',           '해상도', '1920×1080'],
      ['Frame rate', '30 fps',              '프레임 레이트', '30 fps'],
    ],
  },
];

const MOTION_DONTS = [
  { title: 'Don\'t spin or rotate the wordmark', krTitle: '워드마크를 회전시키지 마세요',  body: 'Rotation breaks the slash-cut motif and reads as 2010s-era startup energy.', krBody: '회전은 슬래시컷 모티브를 깨뜨리고 2010년대 스타트업 톤으로 읽힙니다.' },
  { title: 'Don\'t bounce on entry',              krTitle: '엔트리에 바운스 금지',          body: 'Overshoot easing (e.g. back / elastic) is off-brand. The Brand Out curve is non-overshooting by design.', krBody: '오버슈트 이징(back / elastic)은 브랜드와 어울리지 않음. Brand Out 커브는 설계상 오버슈트하지 않습니다.' },
  { title: 'Don\'t loop louder than 5%',          krTitle: '루프는 5% 이하로',              body: 'Idle loops should be ambient — translate ≤ 3px, scale ≤ 1.01. Anything more competes with content.', krBody: '유휴 루프는 앰비언트해야 함 — 이동 ≤ 3px, 스케일 ≤ 1.01. 그 이상은 콘텐츠와 경쟁합니다.' },
  { title: 'Don\'t exceed 1.6s for entries',      krTitle: '엔트리 1.6초 초과 금지',         body: 'Stage screens must support a 12-frame attention budget at 60fps. Cap entry at --motion-xl (1.2s).', krBody: '무대 스크린은 60fps에서 12프레임 주의 한도를 지원해야 함. 엔트리는 --motion-xl (1.2초)로 제한.' },
  { title: 'Don\'t recolor the slash sweep',      krTitle: '슬래시 스윕 색상 변경 금지',     body: 'The diagonal highlight is always brand red. Do not re-tint per surface.',                                            krBody: '대각선 하이라이트는 항상 브랜드 레드. 표면별 재착색 금지.' },
  { title: 'Don\'t animate body type',            krTitle: '본문 타입 애니메이션 금지',      body: 'Reserve motion for marks, hero text, and key transitions. Body copy stays still.',                                  krBody: '모션은 마크·히어로 텍스트·핵심 전환에만. 본문은 정지 유지.' },
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
  const c = useSectionContent('motion');
  const sub = (c.subsections && c.subsections.signature) || {};
  return (
    <div id="mo-signature" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc" dangerouslySetInnerHTML={{ __html: sub.desc || '' }} />
      <div className="mo-signature">
        <div className="mo-stage">
          <div className={`mo-mark-wrap${paused ? ' paused' : ''}`}>
            <KimesWordmark height={96} />
          </div>
        </div>
        <div className="mo-stage-controls">
          <button className={paused ? '' : 'is-active'} onClick={() => setPaused(false)}>{sub.play || 'Play'}</button>
          <button className={paused ? 'is-active' : ''} onClick={() => setPaused(true)}>{sub.pause || 'Pause'}</button>
          <div className="scrub"><div className="scrub-fill" style={{ width: paused ? '40%' : '100%', transition: paused ? 'none' : 'width 4s linear' }}></div></div>
          <div className="timecode">{sub.timecode || '4.00s · loop'}</div>
        </div>
      </div>
    </div>
  );
}

function MotionVariants() {
  const c = useSectionContent('motion');
  const lang = useSiteLang();
  const sub = (c.subsections && c.subsections.variants) || {};
  return (
    <div id="mo-variants" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="mo-variants">
        {VARIANTS.map(v => (
          <div className="mo-variant" key={v.id}>
            <div className={`mo-variant-stage${v.dark ? ' dark' : ''}`}>
              <v.Stage />
            </div>
            <div className="mo-variant-meta">
              <div className="mo-variant-name">{trM(v.name, v.krName, lang)}</div>
              <div className="mo-variant-tag">{trM(v.tag, v.krTag, lang)}</div>
              <div className="mo-variant-desc">{trM(v.desc, v.krDesc, lang)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MotionEasings() {
  const c = useSectionContent('motion');
  const lang = useSiteLang();
  const sub = (c.subsections && c.subsections.easings) || {};
  return (
    <div id="mo-easings" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc" dangerouslySetInnerHTML={{ __html: sub.desc || '' }} />
      <div className="mo-easings">
        {EASINGS.map(e => (
          <div className="mo-easing" key={e.name}>
            <div className="mo-easing-curve"><EasingCurve d={e.path} /></div>
            <div>
              <div className="mo-easing-name">{e.name}</div>
              <div className="mo-easing-spec">{e.spec}</div>
            </div>
            <div className="mo-easing-use">{trM(e.use, e.krUse, lang)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MotionDurations() {
  const c = useSectionContent('motion');
  const lang = useSiteLang();
  const sub = (c.subsections && c.subsections.durations) || {};
  const headers = sub.headers || {};
  return (
    <div id="mo-durations" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="mo-durations">
        <div className="mo-dur-row is-head">
          <span>{headers.token}</span>
          <span>{headers.ms}</span>
          <span>{headers.bar}</span>
          <span>{headers.use}</span>
        </div>
        {DURATIONS.map(d => (
          <div className="mo-dur-row" key={d.name}>
            <span className="mo-dur-name">{d.name}</span>
            <span className="mo-dur-ms">{d.ms}ms</span>
            <span className="mo-dur-bar"><span className="mo-dur-fill" style={{ width: `${d.pct}%` }}></span></span>
            <span className="mo-dur-use">{trM(d.use, d.krUse, lang)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MotionFormats() {
  const c = useSectionContent('motion');
  const lang = useSiteLang();
  const sub = (c.subsections && c.subsections.formats) || {};
  return (
    <div id="mo-formats" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="mo-formats">
        {MOTION_FORMATS.map(f => (
          <div className="mo-format" key={f.name}>
            <div className="mo-format-head">
              <span className="mo-format-name">{f.name}</span>
              <span className="mo-format-ext">{f.ext}</span>
            </div>
            <div className="mo-format-desc">{trM(f.desc, f.krDesc, lang)}</div>
            <div className="mo-format-specs">
              {f.specs.map((row) => {
                const [enK, enV, koK, koV] = row;
                return <span key={enK}><b>{lang === 'ko' && koK ? koK : enK}</b> · {lang === 'ko' && koV ? koV : enV}</span>;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MotionDonts() {
  const c = useSectionContent('motion');
  const lang = useSiteLang();
  const sub = (c.subsections && c.subsections.donts) || {};
  return (
    <div id="mo-donts" className="subsection">
      <h3>{sub.title}</h3>
      <p className="desc">{sub.desc}</p>
      <div className="mo-donts">
        {MOTION_DONTS.map(d => (
          <div className="mo-dont" key={d.title}>
            <b>{trM(d.title, d.krTitle, lang)}</b>
            <small>{trM(d.body, d.krBody, lang)}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Page wrapper ---------- */
function Motion() {
  const c = useSectionContent('motion');
  return (
    <section id="motion" className="section">
      <div className="section-eyebrow">{c.eyebrow}</div>
      <h2>{c.title}</h2>
      <p className="lede" dangerouslySetInnerHTML={{ __html: c.lede || '' }} />
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

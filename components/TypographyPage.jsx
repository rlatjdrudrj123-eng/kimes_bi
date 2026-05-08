// §8 — /typography. 참가업체가 KIMES를 자기 자료에 표기할 때의 가이드.
// 두 자산 모델(워드마크 vs 텍스트 표기) → 사용 서체 → 한·영 혼용 → 권장
// 조판 → 자유 조판 사례 → 가드레일.
//
// 명세 §8.1~§8.7 평면 구조. 모든 텍스트 사례는 진짜 CSS 렌더 (이미지 X) —
// 사용자가 검사 도구로 폰트 사양 확인 가능.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;

// §8.2 사용 서체 — Montserrat / Pretendard 카드 데이터.
// 각 카드: 큰 샘플 + 6 굵기 + 외부 링크. 외부 링크는 폰트 배포처라
// assets.status 와 무관하게 항상 작동.
const FONT_CARDS = [
  {
    id: 'montserrat',
    name: 'Montserrat',
    role: '라틴 / 영문',
    sample: 'Aa Bb 123',
    fontFamily: '"Montserrat", sans-serif',
    weights: [
      { num: 100, label: 'Thin' },
      { num: 300, label: 'Light' },
      { num: 400, label: 'Regular' },
      { num: 600, label: 'SemiBold' },
      { num: 700, label: 'Bold' },
      { num: 800, label: 'ExtraBold' },
    ],
    license: 'SIL Open Font License 1.1',
    url: 'https://fonts.google.com/specimen/Montserrat',
    urlLabel: 'Google Fonts',
    previewText: 'KIMES 2027',
  },
  {
    id: 'pretendard',
    name: 'Pretendard',
    role: '한글',
    sample: '한글 Aa 123',
    fontFamily: '"Pretendard", "Pretendard Variable", sans-serif',
    weights: [
      { num: 100, label: 'Thin' },
      { num: 300, label: 'Light' },
      { num: 400, label: 'Regular' },
      { num: 600, label: 'SemiBold' },
      { num: 700, label: 'Bold' },
      { num: 800, label: 'ExtraBold' },
    ],
    license: 'SIL Open Font License 1.1',
    url: 'https://github.com/orioncactus/pretendard/releases/latest',
    urlLabel: 'GitHub',
    previewText: 'KIMES 2027 참가',
  },
];

// §8.3 한·영 혼용 4가지 규칙. 각 항목 ✓/✗ 시각 쌍.
// 표현 의도: ✗는 경고(빨강) 대신 차분한 회색 톤 — 정보 전달 결.
const MIXING_RULES = [
  {
    id: 1,
    title: '숫자는 Montserrat',
    desc: '한글 환경에 라틴 숫자가 들어갈 때 라틴 폰트로 통일하면 자연스럽습니다.',
    ok:  { ko: '전시기간', en: 'March 18–21, 2027', latinClass: 'ty-mix-en' },
    no:  { ko: '전시기간', en: 'March 18–21, 2027', latinClass: 'ty-mix-en-bad' },
  },
  {
    id: 2,
    title: '약어·브랜드명은 Montserrat',
    desc: '영어 약어(AI, IoT)와 브랜드명(KIMES)은 라틴 폰트로 표기.',
    ok:  { ko: '기반 진단 / ', en: 'AI', extraKo: ' 사무국 / ', extraEn: 'KIMES', latinClass: 'ty-mix-en' },
    no:  { ko: '기반 진단 / ', en: 'AI', extraKo: ' 사무국 / ', extraEn: 'KIMES', latinClass: 'ty-mix-en-bad' },
  },
  {
    id: 3,
    title: '같은 줄 굵기·크기 통일',
    desc: '한 줄에 한글·영문이 같이 있을 때 굵기와 크기를 맞춰 시각 흐름을 유지.',
    ok:  { ko: '참가 기업', en: '  EXHIBITORS', sameWeight: true },
    no:  { ko: '참가 기업', en: '  EXHIBITORS', sameWeight: false },
  },
  {
    id: 4,
    title: '한글 본문 좌측 정렬',
    desc: 'word-break: keep-all로 어절 단위 줄바꿈. 가운데 정렬은 짧은 헤드라인에만.',
    ok:  { ko: '한국 의료기기 산업의 모든 것을 한자리에서 확인하세요.', breakAll: true },
    no:  { ko: '한국 의료기기 산업의 모든 것을 한자리에서 확인하세요.', breakAll: false },
  },
];

// §8.5 텍스트 자유 조판 사례 갤러리 7개. 라벨 없이 시각 + 사용 상황 한 줄.
// 디자이너 언어(폰트 분류, 톤 분류) 회피 — §22.11 매핑.
const GALLERY = [
  {
    id: 1,
    text: 'KIMES 2027',
    style: { fontFamily: '"Montserrat", sans-serif', fontWeight: 800, fontSize: 36, color: 'var(--kimes-red)', letterSpacing: '-0.01em' },
    situation: '일반 마케팅·보도자료',
  },
  {
    id: 2,
    text: 'KIMES 2027 참가',
    style: { fontFamily: '"Pretendard", "Pretendard Variable", sans-serif', fontWeight: 800, fontSize: 30, color: 'var(--kimes-black)', letterSpacing: '-0.02em' },
    situation: '한국어 자료 중심',
  },
  {
    id: 3,
    text: 'KIMES 2027',
    style: { fontFamily: 'Georgia, "Noto Serif KR", serif', fontWeight: 400, fontSize: 32, color: 'var(--kimes-black)', letterSpacing: '0.01em', fontStyle: 'italic' },
    situation: '보수적·전통적 회사 자료',
  },
  {
    id: 4,
    text: 'KIMES 2027',
    style: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600, fontSize: 13, color: 'var(--text-secondary)', letterSpacing: '0.18em', textTransform: 'uppercase' },
    situation: '명함 옆면·이메일 시그니처·작은 메타 표기',
  },
  {
    id: 5,
    text: 'KIMES 2027',
    style: { fontFamily: '"Montserrat", sans-serif', fontWeight: 900, fontSize: 56, color: 'var(--kimes-black)', letterSpacing: '-0.025em', lineHeight: 1 },
    situation: '광고·이벤트 사이니지',
  },
  {
    id: 6,
    text: 'KIMES 2027',
    style: { fontFamily: '"Montserrat", sans-serif', fontWeight: 800, fontSize: 36, color: '#0E7C66', letterSpacing: '-0.01em' },
    situation: '회사 브랜드 컬러로 KIMES 표기 (통합 캠페인)',
    note: '예시 컬러는 가상 회사 컬러',
  },
  {
    id: 7,
    composite: 'data',
    situation: '데이터 강조 — 1,400+ KIMES 2027 같은 수치 동반',
  },
];

function TypographyPage() {
  const { year, eventTitle } = window.KIMES_EVENT;

  return (
    <PageShell
      eyebrow="04"
      title="Typography"
      subtitle="타이포그래피"
      lede={`KIMES를 자기 자료에 표기하는 두 가지 방법 — 공식 워드마크와 자유 조판 텍스트입니다. 각각 어떤 자리에서 어떻게 쓰는지, 한·영 혼용은 어떻게 다루는지 안내합니다. 페이지 안 모든 사례는 진짜 CSS 렌더이므로 검사 도구로 폰트 사양을 그대로 확인하실 수 있습니다.`}
    >
      {/* §8.1 두 자산 모델 ----------------------------------------------- */}
      <SectionHeading id="purpose" title="Two Asset Models" subtitle="두 자산 모델" />
      <p>
        KIMES 표기에는 두 가지 자산이 있고, 각각 자유의 폭이 다릅니다. 보증
        ·증명이 필요한 자리에는 워드마크 SVG, 그 외 마케팅·콘텐츠는 텍스트
        자유 조판입니다.
      </p>
      <div className="ty-models">
        <article className="ty-model">
          <div className="ty-model-head">
            <span className="ty-model-tag">자산 1</span>
            <h3 className="ty-model-name">KIMES 워드마크</h3>
          </div>
          <p className="ty-model-def">공식 KIMES SVG 자산. 변형 없이 그대로 사용.</p>
          <ul className="ty-model-uses">
            <li>보도자료 헤더 락업</li>
            <li>부스 인증 마크 (KIMES 사무국 발급 자리)</li>
            <li>명함의 공식 참가 표시</li>
            <li>공문·계약서 헤더</li>
          </ul>
          <Link to="/logo" className="ty-model-cta">자산 다운로드 → /logo</Link>
        </article>
        <article className="ty-model">
          <div className="ty-model-head">
            <span className="ty-model-tag">자산 2</span>
            <h3 className="ty-model-name">KIMES 텍스트 표기</h3>
          </div>
          <p className="ty-model-def">"KIMES" 4글자 텍스트. 회사 디자인 시스템에 맞춰 자유 조판.</p>
          <ul className="ty-model-uses">
            <li>부스 그래픽</li>
            <li>광고 카피</li>
            <li>SNS 콘텐츠</li>
            <li>사내 발표 자료·영상 자막</li>
          </ul>
          <a href="#gallery" className="ty-model-cta">자유 조판 사례 ↓</a>
        </article>
      </div>
      <p className="ty-models-foot">
        글로벌 B2B 전시·기업 트렌드(KT, CES, MWC, IFA, SXSW)에서는 고정 워드
        마크는 공식·증명 자리에만 쓰고, 마케팅·콘텐츠에서는 브랜드 이름을
        텍스트로 자유 조판합니다. KIMES도 이 방향을 따릅니다.
      </p>

      {/* §8.2 사용 서체 -------------------------------------------------- */}
      <SectionHeading id="fonts" title="Fonts" subtitle="사용 서체" />
      <p>
        KIMES는 <strong>Montserrat</strong>(라틴) + <strong>Pretendard</strong>
        (한글) 페어를 권장합니다. 두 서체 모두 무료·오픈소스로 회사·기관에서
        자유롭게 받아 쓸 수 있습니다.
      </p>
      <div className="ty-font-grid">
        {FONT_CARDS.map(card => <FontCard key={card.id} card={card} />)}
      </div>

      {/* §8.3 한·영 혼용 4가지 규칙 ------------------------------------- */}
      <SectionHeading id="mixing" title="Mixed Composition" subtitle="한·영 혼용 4가지 규칙" />
      <p>
        표기 일관성을 위한 최소 규칙입니다. 자유 조판이라도 다음 4가지는
        지켜주세요. 각 항목 ✓ 권장 / ✗ 잘못된 예시 1쌍.
      </p>
      <div className="ty-mix-grid">
        {MIXING_RULES.map(r => <MixingRule key={r.id} rule={r} />)}
      </div>

      {/* §8.4 KIMES 표기 권장 조판 --------------------------------------- */}
      <SectionHeading id="recommended" title="Recommended Notation" subtitle="KIMES 표기 권장 조판" />
      <p>
        <strong>강제가 아닌 권장</strong>입니다. 회사 디자인 시스템에 맞춰
        자유 조정 가능합니다. "KIMES {year} 참가" 같은 텍스트 표기를 자료에
        넣을 때 이 사양을 기준으로 시작하시면 결이 자연스럽습니다.
      </p>
      <div className="ty-rec">
        <div className="ty-rec-sample" aria-label="권장 조판 샘플">
          <div className="ty-rec-main">KIMES {year}</div>
          <div className="ty-rec-sub">참가 · EXHIBITOR</div>
        </div>
        <table className="ty-rec-spec">
          <tbody>
            <tr><th>메인 라인</th><td>Montserrat 800 ExtraBold · 18pt 환산</td></tr>
            <tr><th>보조 라인</th><td>Pretendard 700 Bold · 11pt 환산</td></tr>
            <tr><th>줄 간격</th><td>메인 글자 높이의 0.4배</td></tr>
            <tr><th>색</th><td>KIMES Red 또는 KIMES Black</td></tr>
            <tr><th>연도</th><td><code>KIMES_EVENT.year</code> 동적 — 회차 갱신 시 자동</td></tr>
          </tbody>
        </table>
      </div>

      {/* §8.5 자유 조판 사례 갤러리 7개 --------------------------------- */}
      <SectionHeading id="gallery" title="Free Composition Gallery" subtitle="자유 조판 사례" />
      <p>
        의료기기·병원설비 산업 전시에 어울리는 결로 7가지 사례. 모두 OK —
        자유 조판 영역이라 ✗ 사례는 없습니다. 각 카드는 진짜 CSS 렌더 (이미지
        X)이므로 검사 도구로 폰트·굵기·크기·색을 확인하실 수 있습니다.
      </p>
      <div className="ty-gallery">
        {GALLERY.map(g => <GalleryCard key={g.id} item={g} />)}
      </div>

      {/* §8.6 워드마크 자리에는 SVG 사용 (가드레일) ---------------------- */}
      <SectionHeading id="guardrail" title="Wordmark Use" subtitle="워드마크 자리에는 SVG" />
      <section className="ty-guard">
        <p>
          공식 보증·증명이 필요한 자리(보도자료 헤더 마크, 부스 인증 마크,
          공문 헤더 등)에는 KIMES 워드마크 SVG를 사용해주세요. 다른 폰트로
          "KIMES"를 타이핑해서 워드마크 자리에 박는 것은 피해주세요. 그
          외 마케팅·콘텐츠 텍스트 표기는 자유롭게 조판하셔도 됩니다.
        </p>
        <Link to="/logo#versions" className="btn btn-primary btn-md">
          KIMES 워드마크 다운로드 →
        </Link>
      </section>

      {/* §8.7 cross-link ------------------------------------------------- */}
      <p className="ty-cross">
        로고 자산은 → <Link to="/logo">/logo</Link>{' · '}
        우리 회사 로고와 함께 사용은 → <Link to="/co-branding">/co-branding</Link>
      </p>
    </PageShell>
  );
}

// §8.2 서체 카드 — 큰 샘플 + 6 굵기 + 외부 링크. 외부 링크는 폰트 배포처
// 직접 연결이라 assets.status 와 무관하게 항상 작동.
function FontCard({ card }) {
  return (
    <article className="ty-font-card">
      <div className="ty-font-head">
        <h3 className="ty-font-name">{card.name}</h3>
        <span className="ty-font-role">{card.role}</span>
      </div>
      <div
        className="ty-font-sample"
        style={{ fontFamily: card.fontFamily, fontWeight: 800 }}
        aria-label={`${card.name} 샘플`}
      >
        {card.sample}
      </div>
      <div className="ty-font-weights">
        {card.weights.map(w => (
          <div key={w.num} className="ty-font-weight">
            <div
              className="ty-font-weight-preview"
              style={{ fontFamily: card.fontFamily, fontWeight: w.num }}
            >
              {card.previewText}
            </div>
            <div className="ty-font-weight-meta">
              <span className="ty-font-weight-num">{w.num}</span>
              <span className="ty-font-weight-label">{w.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="ty-font-foot">
        <div className="ty-font-license">{card.license}</div>
        <a
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline"
        >
          {card.urlLabel} ↗
        </a>
      </div>
      <div className="ty-font-note">오픈소스. 임베드·재배포 자유.</div>
    </article>
  );
}

// §8.3 한·영 혼용 규칙 카드 — 4가지 룰. ✓/✗ 1쌍씩.
// 상황별 시각 차이를 보이기 위해 inline 스타일로 폰트 변경.
function MixingRule({ rule }) {
  return (
    <article className="ty-mix-rule">
      <div className="ty-mix-num">{rule.id}</div>
      <h3 className="ty-mix-title">{rule.title}</h3>
      <p className="ty-mix-desc">{rule.desc}</p>
      <div className="ty-mix-pair">
        <div className="ty-mix-row ty-mix-ok">
          <span className="ty-mix-mark" aria-label="권장">✓</span>
          <MixSample variant="ok" rule={rule} />
        </div>
        <div className="ty-mix-row ty-mix-no">
          <span className="ty-mix-mark" aria-label="권장하지 않음">✗</span>
          <MixSample variant="no" rule={rule} />
        </div>
      </div>
    </article>
  );
}

// 한·영 혼용 샘플 렌더. variant ok/no에 따라 폰트 매핑이 달라짐.
function MixSample({ variant, rule }) {
  // Rule 1·2: 라틴 부분이 ok면 Montserrat, no면 Pretendard로 들어감
  if (rule.id === 1) {
    const latin = variant === 'ok' ? 'ty-mix-latin-good' : 'ty-mix-latin-bad';
    return <span><span>{rule.ok.ko} </span><span className={latin}>March 18–21, 2027</span></span>;
  }
  if (rule.id === 2) {
    const latin = variant === 'ok' ? 'ty-mix-latin-good' : 'ty-mix-latin-bad';
    return (
      <span>
        <span className={latin}>AI</span>
        <span> 기반 진단 / </span>
        <span className={latin}>KIMES</span>
        <span> 사무국</span>
      </span>
    );
  }
  // Rule 3: 같은 줄 굵기 통일
  if (rule.id === 3) {
    if (variant === 'ok') {
      return <span className="ty-mix-row3-good"><span>참가 기업</span><span>  EXHIBITORS</span></span>;
    }
    return <span className="ty-mix-row3-bad"><span className="r3-ko">참가 기업</span><span className="r3-en">  EXHIBITORS</span></span>;
  }
  // Rule 4: 좌측 정렬 + word-break
  if (rule.id === 4) {
    const cls = variant === 'ok' ? 'ty-mix-row4-good' : 'ty-mix-row4-bad';
    return <p className={cls}>한국 의료기기 산업의 모든 것을 한자리에서 확인하세요.</p>;
  }
  return null;
}

// §8.5 갤러리 카드 — 라벨 없이 시각 샘플 + 사용 상황 한 줄.
// 디자이너 언어 회피 (§22.11). 카드는 시각 우선, 사용 상황은 캡션으로.
function GalleryCard({ item }) {
  if (item.composite === 'data') {
    return (
      <article className="ty-gallery-card">
        <div className="ty-gallery-sample">
          <span className="ty-data-num">1,400+</span>
          <span className="ty-data-label">KIMES 2027 exhibitors</span>
        </div>
        <div className="ty-gallery-cap">적합: {item.situation}</div>
      </article>
    );
  }
  return (
    <article className="ty-gallery-card">
      <div className="ty-gallery-sample" style={item.style}>{item.text}</div>
      <div className="ty-gallery-cap">
        적합: {item.situation}
        {item.note && <span className="ty-gallery-note"> ({item.note})</span>}
      </div>
    </article>
  );
}

window.TypographyPage = TypographyPage;

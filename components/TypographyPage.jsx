// §8 — /typography. 참가업체가 KIMES를 자기 자료에 표기할 때의 가이드.
// 두 에셋(워드마크 vs 텍스트 표기) → 사용 서체 → 권장 사양 → 표기 사례
// → 가드레일 → cross-link.
//
// 명세 §8.1~§8.6 평면 구조. 모든 텍스트 사례는 진짜 CSS 렌더 (이미지·SVG
// 워드마크 X) — 사용자가 검사 도구로 폰트 사양 그대로 확인 가능.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;

// §8.2 사용 서체 카드 데이터. 굵기는 800·700 권장이 위로 오도록 내림차순.
// recommended 플래그가 true인 굵기는 카드 안 시각 강조 + 카드 위 권장 사유.
const FONT_CARDS = [
  {
    id: 'montserrat',
    name: 'Montserrat',
    role: '영문',
    sample: 'Aa Bb 123',
    fontFamily: '"Montserrat", sans-serif',
    weights: [
      { num: 800, label: 'ExtraBold', recommended: true },
      { num: 700, label: 'Bold',      recommended: true },
      { num: 600, label: 'SemiBold' },
      { num: 400, label: 'Regular' },
      { num: 300, label: 'Light' },
      { num: 100, label: 'Thin' },
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
      { num: 800, label: 'ExtraBold', recommended: true },
      { num: 700, label: 'Bold',      recommended: true },
      { num: 600, label: 'SemiBold' },
      { num: 400, label: 'Regular' },
      { num: 300, label: 'Light' },
      { num: 100, label: 'Thin' },
    ],
    license: 'SIL Open Font License 1.1',
    url: 'https://github.com/orioncactus/pretendard/releases/latest',
    urlLabel: 'GitHub',
    previewText: 'KIMES 2027 참가',
  },
];

// §8.4 표기 사례 갤러리 6개. 라벨 없이 시각 + 사용 상황 한 줄. 데스크톱
// 3+3, 태블릿 2+2+2, 모바일 1열로 균형 — 마지막 외로운 카드 X.
//
// 시각 결 중복 회피: 굵은 임팩트(이전 #5 56px 케이스)는 #1 권장 기본
// 사례와 시각 차별화 약해 제거. 6개로 압축해 페이지 무게 가벼움.
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
    situation: '작은 메타·이메일 시그니처',
  },
  {
    id: 5,
    text: 'KIMES 2027',
    style: { fontFamily: '"Montserrat", sans-serif', fontWeight: 800, fontSize: 36, color: '#0E7C66', letterSpacing: '-0.01em' },
    situation: '회사 브랜드 컬러로 KIMES 표기',
    note: '예시 컬러는 가상 회사 컬러',
  },
  {
    id: 6,
    composite: 'data',
    situation: '"1,400+ KIMES 2027" 같은 수치 강조',
  },
];

function TypographyPage() {
  const { year } = window.KIMES_EVENT;

  return (
    <PageShell
      eyebrow="04"
      title="Typography"
      subtitle="타이포그래피"
      lede="KIMES를 자기 자료에 표기하는 두 가지 방법 — 공식 워드마크와 텍스트 표기입니다. 각각 어떤 자리에서 어떻게 쓰는지 안내합니다. 페이지 안 모든 사례는 진짜 CSS 렌더이므로 검사 도구로 폰트 사양을 그대로 확인하실 수 있습니다."
    >
      {/* §8.1 두 에셋 ----------------------------------------------------- */}
      <SectionHeading id="purpose" title="Two Asset Models" subtitle="두 에셋" />
      <p>
        KIMES 표기에는 두 가지 에셋이 있고, 각각 자유의 폭이 다릅니다. 보증
        ·증명이 필요한 자리에는 워드마크 SVG, 그 외 마케팅·콘텐츠는 텍스트
        표기입니다.
      </p>
      <div className="ty-models">
        <article className="ty-model">
          <div className="ty-model-head">
            <span className="ty-model-tag">에셋 1</span>
            <h3 className="ty-model-name">KIMES 워드마크</h3>
          </div>
          <p className="ty-model-def">공식 KIMES SVG 에셋. 변형 없이 그대로 사용.</p>
          <ul className="ty-model-uses">
            <li>보도자료 헤더 락업</li>
            <li>부스 인증 마크 (KIMES 사무국 발급 자리)</li>
            <li>공문·계약서 헤더</li>
          </ul>
          <Link to="/logo" className="ty-model-cta">에셋 다운로드 → /logo</Link>
        </article>
        <article className="ty-model">
          <div className="ty-model-head">
            <span className="ty-model-tag">에셋 2</span>
            <h3 className="ty-model-name">KIMES 텍스트 표기</h3>
          </div>
          <p className="ty-model-def">"KIMES" 4글자 텍스트. 회사 디자인 시스템에 맞춰 자유롭게 사용.</p>
          <ul className="ty-model-uses">
            <li>부스 그래픽</li>
            <li>광고 카피</li>
            <li>SNS 콘텐츠</li>
            <li>사내 발표 자료·영상 자막</li>
          </ul>
          <a href="#gallery" className="ty-model-cta">표기 사례 ↓</a>
        </article>
      </div>
      <p className="ty-models-foot">
        글로벌 B2B 전시·기업 트렌드(KT, CES, MWC, IFA, SXSW)에서는 고정 워드
        마크는 공식·증명 자리에만 쓰고, 마케팅·콘텐츠에서는 브랜드 이름을
        텍스트로 자유롭게 사용합니다. KIMES도 이 방향을 따릅니다.
      </p>

      {/* §8.2 사용 서체 -------------------------------------------------- */}
      <SectionHeading id="fonts" title="Fonts" subtitle="사용 서체" />
      <p>
        KIMES는 <strong>Montserrat</strong>(영문) + <strong>Pretendard</strong>
        (한글) 페어를 권장합니다. 두 서체 모두 무료·오픈소스로 회사·기관에서
        자유롭게 받아 쓸 수 있습니다.
      </p>
      <p className="ty-font-cta">
        <span className="ty-font-cta-mark">★</span> KIMES 표기에는{' '}
        <strong>800 ExtraBold</strong> 또는 <strong>700 Bold</strong>를 권장
        합니다. 부스·인쇄물에서 멀리서도 또렷하게 보입니다.
      </p>
      <div className="ty-font-grid">
        {FONT_CARDS.map(card => <FontCard key={card.id} card={card} />)}
      </div>

      {/* §8.3 권장 사양 -------------------------------------------------- */}
      <SectionHeading id="recommended" title="Recommended Notation" subtitle="권장 사양" />
      <p>
        권장 사항입니다. 회사 디자인 시스템에 맞춰 자유 조정 가능합니다.
        "KIMES {year} 참가" 같은 텍스트 표기를 자료에 넣을 때 이 사양을
        기준으로 시작하시면 결이 자연스럽습니다.
      </p>
      <div className="ty-rec">
        <div className="ty-rec-sample" aria-label="권장 사양 텍스트 샘플 (SVG 아닌 진짜 텍스트)">
          <span className="ty-rec-main">KIMES {year}</span>
          <span className="ty-rec-sub">참가 · EXHIBITOR</span>
        </div>
        <table className="ty-rec-spec">
          <tbody>
            <tr><th>메인 라인</th><td>Montserrat 800 ExtraBold · 18pt 환산</td></tr>
            <tr><th>보조 라인</th><td>Pretendard 700 Bold · 11pt 환산</td></tr>
            <tr><th>줄 간격</th><td>메인 글자 높이의 0.4배</td></tr>
            <tr><th>색</th><td>KIMES Red 또는 KIMES Black</td></tr>
            <tr><th>한·영 혼용</th><td>숫자·영문 약어·브랜드명은 Montserrat</td></tr>
            <tr><th>연도</th><td><code>KIMES_EVENT.year</code> 동적 — 회차 갱신 시 자동</td></tr>
          </tbody>
        </table>
      </div>
      <p className="ty-rec-note">
        위 샘플은 SVG 워드마크가 아닌 진짜 텍스트입니다. 검사 도구를 열면
        <code> font-family: Montserrat / font-weight: 800</code> 등 폰트 사양이
        그대로 적용된 것을 확인하실 수 있습니다.
      </p>

      {/* §8.4 표기 사례 6개 --------------------------------------------- */}
      <SectionHeading id="gallery" title="Free Composition Gallery" subtitle="표기 사례" />
      <p>
        의료기기·병원설비 산업 전시에 어울리는 6가지 사례입니다. ✗ 사례는
        없습니다. 각 카드는 진짜 CSS 렌더이므로 검사 도구로 폰트·굵기·크기·
        색을 확인하실 수 있습니다.
      </p>
      <div className="ty-gallery">
        {GALLERY.map(g => <GalleryCard key={g.id} item={g} />)}
      </div>

      {/* §8.5 워드마크 자리에는 SVG 사용 (가드레일) ---------------------- */}
      <SectionHeading id="guardrail" title="Wordmark Use" subtitle="워드마크 자리에는 SVG" />
      <section className="ty-guard">
        <p>
          공식 보증·증명이 필요한 자리(보도자료 헤더 마크, 부스 인증 마크,
          공문 헤더 등)에는 KIMES 워드마크 SVG를 사용해주세요. 다른 폰트로
          "KIMES"를 타이핑해서 워드마크 자리에 박는 것은 피해주세요. 그
          외 마케팅·콘텐츠 텍스트 표기는 자유롭게 사용하셔도 됩니다.
        </p>
        <Link to="/logo#versions" className="btn btn-primary btn-md">
          KIMES 워드마크 다운로드 →
        </Link>
      </section>

      {/* §8.6 cross-link ------------------------------------------------- */}
      <p className="ty-cross">
        로고 에셋은 → <Link to="/logo">/logo</Link>{' · '}
        우리 회사 로고와 함께 사용은 → <Link to="/co-branding">/co-branding</Link>
      </p>
    </PageShell>
  );
}

// §8.2 서체 카드 — 큰 샘플 + 6 굵기(내림차순) + 외부 링크. 권장 굵기
// (800/700)는 우측 ★ 라벨 + 옅은 강조 배경으로 시각 구분. 외부 링크는
// 폰트 배포처 직접 연결이라 assets.status 와 무관하게 항상 작동.
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
          <div key={w.num} className={`ty-font-weight ${w.recommended ? 'is-recommended' : ''}`}>
            <div
              className="ty-font-weight-preview"
              style={{ fontFamily: card.fontFamily, fontWeight: w.num }}
            >
              {card.previewText}
            </div>
            <div className="ty-font-weight-meta">
              <span className="ty-font-weight-num">{w.num}</span>
              <span className="ty-font-weight-label">{w.label}</span>
              {w.recommended && <span className="ty-font-weight-star" aria-label="권장">★</span>}
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

// §8.4 갤러리 카드 — 라벨 없이 시각 샘플 + 사용 상황 한 줄.
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

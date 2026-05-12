// §2 — /overview (v2027.1). KIMES 한눈에 보기 + 표기·서체 규칙 통합.
// 행사 메타데이터는 components/config.js의 KIMES_EVENT에서 읽음.
//
// 11개 섹션:
//   §2.1 공식 명칭 (Official Names)
//   §2.2 일정·장소 (Date & Venue)
//   §2.3 보일러플레이트 4벌 한·영 (Boilerplate)
//   §2.4 핵심 숫자 (Key Numbers — 참가업체·참가국·관람객)
//   §2.5 14개 전시 카테고리 (Categories)
//   §2.6 명칭 표기 규칙 (Name Notation) ← 이전 /notation
//   §2.7 권장 서체 (Fonts) ← 이전 /notation
//   §2.8 권장 사양 (Recommended Notation) ← 이전 /notation
//   §2.9 로고 자리에는 SVG (Wordmark Use) ← 이전 /notation
//   §2.10 SNS 태그 (SNS Tag) ← 이전 /notation
//   §2.11 별도 계약 필요 표현 (Restricted Expressions) ← 이전 /notation
//
// /notation의 Edition·Place & Booth 섹션은 §2.1·§2.2와 중복이라 제거.
// 공식 채널은 푸터로 이동.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const CopyButton = window.CopyButton;
const Link = window.Link;

// §2.6 명칭 표기 규칙
const NAME_RULES = [
  { case: '처음 언급', ok: 'KIMES 2027 (The 42nd Korea International Medical & Hospital Equipment Show)', bad: 'KIMES (풀네임 생략)' },
  { case: '두 번째부터', ok: 'KIMES', bad: '"킴스", "kimes" 소문자' },
  { case: '따옴표', ok: '사용하지 않음', bad: '"KIMES"' },
  { case: '이탤릭', ok: '사용하지 않음', bad: '*KIMES*' },
  { case: '한글 표기', ok: 'KIMES (영문 그대로)', bad: '킴스 / 킴즈 / 케이아이엠이에스' },
];

// §2.10 SNS 태그
const SNS_RULES = [
  { item: '공식 태그',     value: '@kimes_official',                       hint: 'SNS 게시물 캡션에 멘션' },
  { item: '해시태그',      value: '#KIMES2027 · #KIMES · #의료기기전시회 · #COEX', hint: '게시물 본문 또는 캡션 끝' },
  { item: '라이브 스트리밍', value: 'KIMES 로고 노출 시 사전 통보 권장',     hint: '의무 아님 — 사무국 노출 추적용' },
];

// §2.11 별도 계약·승인 필요 표현
const RESTRICTED = [
  'KIMES 공식 파트너 / Official Partner of KIMES',
  'KIMES 추천 / KIMES Recommended',
  'KIMES 인증 / KIMES Certified',
  'KIMES 후원 / Sponsored by KIMES',
  'KIMES 주최 / Organized by KIMES',
  'KIMES 로고를 회사 로고와 합친 새 로고',
  '"KIMES 2027 official ___" 형태의 모든 표현',
];

function OverviewPage() {
  const { event } = window.KIMES_EVENT;
  const { year } = window.KIMES_EVENT;

  const NAME_ROWS = [
    { label: '정식', ko: event.fullNameKo, en: event.fullNameEn },
    { label: '줄임', ko: event.nameKo,     en: event.nameEn },
    { label: '약칭', ko: 'KIMES',          en: 'KIMES' },
  ];

  const FACT_ROWS = [
    { label: '기간', ko: event.dateRangeKo,      en: event.dateRangeEn },
    { label: '장소', ko: event.venueKo,          en: event.venueEn },
    { label: '홀',   ko: event.halls,             en: 'Hall A, B, C, D, E' },
    { label: '주최', ko: event.organizationKo,   en: event.organizationEn },
    { label: '주관', ko: 'KIMES 사무국',          en: 'KIMES Secretariat' },
  ];

  const BOILERPLATES_KO = {
    40:  { use: 'SNS·이메일 제목',           text: '한국 최대 의료기기 전시회 KIMES 2027, 3월 18~21일 코엑스' },
    100: { use: '보도자료 리드',             text: 'KIMES 2027은 1,400여 개 기업과 8만여 명이 참여하는 한국 최대 의료기기 전시회로, 3월 18~21일 코엑스에서 열립니다.' },
    200: { use: '회사 소개·블로그',          text: 'KIMES는 한국이앤엑스가 KMDA·KMDIA와 함께 1980년부터 매년 개최해 온 대한민국 대표 의료기기·병원설비 전시회입니다. 2027년에는 제42회를 맞아 3월 18~21일 코엑스에서 열리며, 60여 개국 1,400여 개 기업이 참가해 영상진단·수술·치료·재활·뷰티·디지털 헬스 등 14개 카테고리를 아우릅니다.' },
    400: { use: '보도자료 회사 소개',        text: 'KIMES는 한국이앤엑스가 KMDA·KMDIA와 함께 1980년부터 매년 개최해 온 대한민국 대표 의료기기·병원설비 전시회입니다. 2027년에는 제42회를 맞아 3월 18일부터 21일까지 코엑스에서 열리며, 60여 개국 1,400여 개 기업이 참가해 영상진단·수술·치료·재활·뷰티·디지털 헬스 등 14개 카테고리의 최신 의료기기와 병원설비를 선보입니다. 의료진·연구자·구매 담당자 등 8만여 명이 직접 참관합니다. KIMES 2027에는 MedicomteK, BEAUTY&DERMA SEOUL, INSPIRE Digital Health 세 개 특별관이 함께 열려 분야별 전문 전시를 운영합니다.' },
  };
  const BOILERPLATES_EN = {
    40:  { use: 'Email subject / SNS',       text: 'KIMES 2027 · Mar 18–21 · COEX, Seoul' },
    100: { use: 'Press release lede',        text: "KIMES 2027 — Korea's largest medical equipment show. 1,400+ exhibitors, 80,000+ trade visitors." },
    200: { use: 'About page · blog',         text: "KIMES 2027, The 42nd Korea International Medical & Hospital Equipment Show, runs March 18–21 at COEX. Hosted by KOREA E&EX INC. with KMDA and KMDIA, it draws 1,400+ exhibitors from 60+ countries." },
    400: { use: 'Press release boilerplate', text: "KIMES 2027, The 42nd Korea International Medical & Hospital Equipment Show, runs March 18–21 at COEX, Seoul. Hosted by KOREA E&EX INC. with KMDA and KMDIA since 1980, it is Korea's largest medical equipment show, featuring 1,400+ exhibitors from 60+ countries across 14 categories. Special zones include MedicomteK, BEAUTY&DERMA SEOUL, and INSPIRE Digital Health, drawing 80,000+ trade visitors." },
  };
  const LENGTHS = [40, 100, 200, 400];

  const numbers = window.KIMES_EVENT.numbers;
  const NUM_CARDS = [
    { value: numbers.exhibitors.value, label: '참가업체' },
    { value: numbers.countries.value,  label: '참가국' },
    { value: numbers.visitors.value,   label: '관람객' },
  ];

  const CATEGORIES = [
    { n: '01', ko: '영상진단기기 및 용품',  en: 'Imaging diagnostics' },
    { n: '02', ko: '진찰 및 진단 관련기기', en: 'Examination & diagnosis' },
    { n: '03', ko: '수술 관련 기기',        en: 'Surgical instruments' },
    { n: '04', ko: '병원설비 및 응급장비',  en: 'Hospital & emergency' },
    { n: '05', ko: '피부미용 / 뷰티케어',    en: 'Beauty & skincare' },
    { n: '06', ko: '치료 관련 기기',         en: 'Therapeutic devices' },
    { n: '07', ko: '물리치료 / 재활 / 예방', en: 'Rehabilitation' },
    { n: '08', ko: '한의학 관련',           en: 'Oriental medicine' },
    { n: '09', ko: '의료 IT 시스템',        en: 'Medical IT systems' },
    { n: '10', ko: '부품 / 소재',           en: 'Parts & materials' },
    { n: '11', ko: '일회용 의료용품',        en: 'Disposable supplies' },
    { n: '12', ko: '서비스 및 비즈니스',     en: 'Services & business' },
    { n: '13', ko: '임상 및 검사',          en: 'Clinical & testing' },
    { n: '14', ko: '바이오 / 제약',         en: 'Bio & pharmaceuticals' },
  ];

  return (
    <PageShell
      eyebrow="01"
      title="Overview"
      subtitle="한눈에 보기"
      lede="공식 명칭·일정·보일러플레이트·표기 규칙·서체."
    >
      {/* §2.1 공식 명칭 ----------------------------------------- */}
      <SectionHeading id="official-names" title="Official Names" subtitle="공식 명칭" />
      <p>KIMES 표기에 사용하는 공식 명칭. 행별 [Copy] 버튼으로 복사.</p>
      <FactTable rows={NAME_ROWS} caption="공식 명칭 한·영 표기" />

      {/* §2.2 일정·장소 ----------------------------------------- */}
      <SectionHeading id="schedule" title="Date & Venue" subtitle="일정·장소" />
      <p>공식 일정 및 장소. 영문은 해외 채널용.</p>
      <FactTable rows={FACT_ROWS} caption="일정 및 장소 한·영 표기" />

      {/* §2.3 보일러플레이트 ---------------------------- */}
      <SectionHeading id="boilerplates" title="Boilerplate" subtitle="한 줄 소개" />
      <p>표준 회사 소개문 4벌. [Copy] 버튼으로 복사해 사용.</p>
      {LENGTHS.map(len => (
        <BoilerplateSection
          key={len}
          limit={len}
          ko={BOILERPLATES_KO[len]}
          en={BOILERPLATES_EN[len]}
        />
      ))}

      {/* §2.4 핵심 숫자 ----------------------------------------- */}
      <SectionHeading id="numbers" title="Key Numbers" subtitle="핵심 숫자" />
      <p>
        KIMES 규모 표기용 공식 수치. 참가업체·참가국은 2027 기준, 관람객은
        2026 실적.
      </p>
      <div className="ov-num-grid" role="list">
        {NUM_CARDS.map(card => (
          <div key={card.label} className="ov-num" role="listitem">
            <div className="ov-num-value">{card.value}</div>
            <div className="ov-num-label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* §2.5 14개 전시 카테고리 ----------------------------------- */}
      <SectionHeading id="categories" title="Categories" subtitle="14개 전시 카테고리" />
      <p>
        영상진단부터 바이오·제약까지 14개 카테고리. 부스 위치 및 참가업체
        명단은 행사 직전 공식 사이트 공개.
      </p>
      <ol className="ov-cat-list">
        {CATEGORIES.map(c => (
          <li key={c.n} className="ov-cat">
            <span className="ov-cat-num">{c.n}</span>
            <span className="ov-cat-ko">{c.ko}</span>
            <span className="ov-cat-en">{c.en}</span>
          </li>
        ))}
      </ol>

      {/* §2.6 명칭 표기 규칙 (← 이전 /notation §6.1) ------------------ */}
      <SectionHeading id="name-rules" title="Name Notation" subtitle="명칭 표기 규칙" />
      <table className="ws-table">
        <thead>
          <tr><th>상황</th><th className="ws-col-ok">✓ OK</th><th className="ws-col-bad">✗ 미권장</th></tr>
        </thead>
        <tbody>
          {NAME_RULES.map((r, i) => (
            <tr key={i}>
              <td>{r.case}</td>
              <td className="ws-cell-ok">{r.ok}</td>
              <td className="ws-cell-bad">{r.bad}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* §2.7 권장 서체 (← 이전 /notation §6.4) ----------------------- */}
      <SectionHeading id="fonts" title="Fonts" subtitle="권장 서체" />
      <p>
        권장 서체: <strong>Montserrat</strong>(영문) + <strong>Pretendard</strong>
        (한글). 굵기 <strong>800 ExtraBold</strong> 또는{' '}
        <strong>700 Bold</strong>. 둘 다 무료·오픈소스.
      </p>
      <div className="ty-font-links">
        <a href="https://fonts.google.com/specimen/Montserrat" target="_blank" rel="noopener noreferrer" className="ty-font-link">
          <span className="ty-font-link-name">Montserrat</span>
          <span className="ty-font-link-source">Google Fonts ↗</span>
        </a>
        <a href="https://github.com/orioncactus/pretendard/releases/latest" target="_blank" rel="noopener noreferrer" className="ty-font-link">
          <span className="ty-font-link-name">Pretendard</span>
          <span className="ty-font-link-source">GitHub ↗</span>
        </a>
      </div>

      {/* §2.8 권장 사양 (← 이전 /notation §6.5) ----------------------- */}
      <SectionHeading id="recommended" title="Recommended Notation" subtitle="권장 사양" />
      <p>회사 폰트가 있으면 우선 사용. 없을 경우 아래 사양 참고.</p>
      <div className="ty-rec">
        <div className="ty-rec-sample" aria-label="권장 사양 텍스트 샘플">
          <span className="ty-rec-main">KIMES {year}</span>
          <span className="ty-rec-sub">참가 · EXHIBITOR</span>
        </div>
        <table className="ty-rec-spec">
          <tbody>
            <tr><th>메인 라인</th><td>Montserrat 800 ExtraBold · 18pt 환산</td></tr>
            <tr><th>보조 라인</th><td>Pretendard 700 Bold · 11pt 환산</td></tr>
            <tr><th>색</th><td>KIMES Red 또는 KIMES Black</td></tr>
            <tr><th>한·영 혼용</th><td>숫자·영문 약어·브랜드명은 Montserrat</td></tr>
          </tbody>
        </table>
      </div>

      {/* §2.9 로고 자리에는 SVG (← 이전 /notation §6.6) --------------- */}
      <SectionHeading id="guardrail" title="Wordmark Use" subtitle="로고 자리에는 SVG" />
      <section className="ty-guard">
        <p>
          공식 보증·증명 자리(보도자료 헤더, 부스 인증, 공문 헤더 등)는
          로고 SVG 사용. 다른 폰트로 "KIMES" 타이핑해 로고 자리에 사용 금지. {/* allow-tone */}
          일반 텍스트 표기는 자유.
        </p>
        <Link to="/logo#versions" className="btn btn-primary btn-md">
          KIMES 로고 다운로드 →
        </Link>
      </section>

      {/* §2.10 SNS 태그 (← 이전 /notation §6.7) ----------------------- */}
      <SectionHeading id="sns" title="SNS Tag" subtitle="SNS 태그·해시태그" />
      <p>SNS 콘텐츠에 KIMES 로고 사용 시 캡션 공식 태그 권장(의무 아님).</p>
      <table className="ws-table">
        <thead>
          <tr><th>항목</th><th>권장</th><th>비고</th></tr>
        </thead>
        <tbody>
          {SNS_RULES.map((r, i) => (
            <tr key={i}>
              <td>{r.item}</td>
              <td><code>{r.value}</code></td>
              <td className="ws-sns-hint">{r.hint}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* §2.11 별도 계약 필요 표현 (← 이전 /notation §6.8) ------------ */}
      <SectionHeading id="restricted" title="Restricted Expressions" subtitle="별도 계약·승인이 필요한 표현" />
      <section className="ws-restricted">
        <p>
          다음 표현은 별도 계약이 필요합니다. 사용 전 사무국과 협의해주세요.
        </p>
        <ul className="ws-restricted-list">
          {RESTRICTED.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <div className="ws-restricted-actions">
          <a href="#/contact?type=license" className="btn btn-primary btn-md">
            라이선스 문의 →
          </a>
          <span className="ws-restricted-channel">
            {window.KIMES_EVENT.contact.email} · {window.KIMES_EVENT.contact.tel}
          </span>
        </div>
      </section>
    </PageShell>
  );
}

// 공식 명칭·일정 — 4컬럼 표 (구분 / 한국어 / 영문 / 복사).
function FactTable({ rows, caption }) {
  return (
    <div className="ov-table-wrap">
      <table className="ov-table" role="table">
        {caption && <caption className="ov-table-caption">{caption}</caption>}
        <thead>
          <tr>
            <th scope="col" className="ov-th-label">구분</th>
            <th scope="col" className="ov-th-ko">한국어</th>
            <th scope="col" className="ov-th-en">영문</th>
            <th scope="col" className="ov-th-copy"><span className="visually-hidden">복사</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.label}>
              <th scope="row" className="ov-td-label">{r.label}</th>
              <td className="ov-td-ko">{r.ko}</td>
              <td className="ov-td-en">{r.en}</td>
              <td className="ov-td-copy">
                <div className="ov-copy-row">
                  <CopyButton
                    value={r.ko}
                    label="한국어"
                    ariaLabel={`${r.label} 한국어 표기 복사`}
                  />
                  <CopyButton
                    value={r.en}
                    label="영문"
                    ariaLabel={`${r.label} 영문 표기 복사`}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BoilerplateSection({ limit, ko, en }) {
  return (
    <section className="bp-section" aria-labelledby={`bp-${limit}`}>
      <div className="bp-section-head">
        <h3 id={`bp-${limit}`} className="bp-section-title">{limit}자 — {ko.use}</h3>
      </div>
      <div className="bp-grid">
        <BoilerplateBox
          text={ko.text}
          limit={limit}
          lang="한국어"
          ariaSuffix={`${limit}자 한국어 보일러플레이트`}
        />
        <BoilerplateBox
          text={en.text}
          limit={limit}
          lang="English"
          ariaSuffix={`${limit}-character English boilerplate`}
        />
      </div>
    </section>
  );
}

function BoilerplateBox({ text, limit, lang, ariaSuffix }) {
  const length = text.length;
  const over = length > limit;
  return (
    <div className={`bp-box ${over ? 'is-over' : ''}`}>
      <div className="bp-head">
        <span className="bp-tag">{lang}</span>
        <CopyButton
          value={text}
          label="복사"
          ariaLabel={`${ariaSuffix} 복사`}
        />
      </div>
      <p className="bp-text">{text}</p>
      <div className="bp-foot">
        <span className="bp-count" aria-label={`글자 수 ${length} / ${limit}`}>
          {length} / {limit}
        </span>
      </div>
    </div>
  );
}

window.OverviewPage = OverviewPage;

// §2 — /overview (v2027.1). KIMES 한눈에 보기.
// 행사 메타데이터는 components/config.js의 KIMES_EVENT에서 읽음.
//
// 6개 섹션:
//   §2.1 공식 명칭 (Official Names)
//   §2.2 일정·장소 (Date & Venue)
//   §2.3 보일러플레이트 4벌 한·영 (Boilerplate)
//   §2.4 핵심 숫자 (Key Numbers)
//   §2.5 14개 전시 카테고리 (Categories)
//   §2.6 별도 계약 필요 표현 (Restricted Expressions) — BI 보호 핵심

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const CopyButton = window.CopyButton;

// §2.6 별도 계약·승인 필요 표현
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
      lede="공식 명칭·일정·보일러플레이트·핵심 숫자·카테고리."
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

      {/* §2.6 별도 계약 필요 표현 (BI 보호 핵심) ----------------------- */}
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

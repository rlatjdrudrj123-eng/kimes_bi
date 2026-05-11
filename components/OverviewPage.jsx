// §2 — 한눈에 보기 (/overview) — v2027.1
//
// 공식 명칭·일정·보일러플레이트·핵심 숫자·14 카테고리·공식 채널.
// 행사 메타데이터는 components/config.js의 KIMES_EVENT에서 읽음.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const CopyButton = window.CopyButton;

function OverviewPage() {
  const { event } = window.KIMES_EVENT;

  // §2.1 공식 명칭
  const NAME_ROWS = [
    { label: '정식', ko: event.fullNameKo, en: event.fullNameEn },
    { label: '약식', ko: event.nameKo,     en: event.nameEn },
    { label: '약칭', ko: 'KIMES',          en: 'KIMES' },
  ];

  // §2.2 일정 · 장소
  const FACT_ROWS = [
    { label: '기간', ko: event.dateRangeKo,      en: event.dateRangeEn },
    { label: '장소', ko: event.venueKo,          en: event.venueEn },
    { label: '홀',   ko: 'Hall A (1층) · Hall B–E (3층)', en: 'Hall A, B, C, D, E' },
    { label: '주최', ko: event.organizationKo,   en: event.organizationEn },
    { label: '주관', ko: 'KIMES 사무국',          en: 'KIMES Secretariat' },
  ];

  // §2.3 보일러플레이트 4벌 한·영
  const BOILERPLATES_KO = {
    40:  { use: 'SNS · 메일 제목',      text: '한국 최대 의료기기 전시회 KIMES 2027, 3월 18~21일 코엑스' },
    100: { use: '보도자료 리드',        text: 'KIMES 2027은 1,400여 개 기업과 8만여 명이 참여하는 한국 최대 의료기기 전시회. 3월 18~21일 코엑스 개최.' },
    200: { use: '회사 소개 · 블로그',    text: 'KIMES는 한국이앤엑스가 KMDA·KMDIA와 1980년부터 매년 개최한 대한민국 대표 의료기기·병원설비 전시회. 2027년 제42회를 맞아 3월 18~21일 코엑스에서 개최. 60여 개국 1,400여 개 기업이 참가하여 영상진단·수술·치료·재활·뷰티·디지털 헬스 등 14개 카테고리 전시.' },
    400: { use: '보도자료 회사 소개',    text: 'KIMES는 한국이앤엑스가 KMDA·KMDIA와 1980년부터 매년 개최한 대한민국 대표 의료기기·병원설비 전시회. 2027년 제42회를 맞아 3월 18일부터 21일까지 코엑스에서 개최. 60여 개국 1,400여 개 기업이 영상진단·수술·치료·재활·뷰티·디지털 헬스 등 14개 카테고리의 최신 의료기기와 병원설비 전시. 의료진·연구자·구매 담당자 등 8만여 명 참관. KIMES 2027은 MedicomteK, BEAUTY&DERMA SEOUL, INSPIRE Digital Health 세 개 특별관 운영.' },
  };
  const BOILERPLATES_EN = {
    40:  { use: 'Email subject / SNS',       text: 'KIMES 2027 · Mar 18–21 · COEX, Seoul' },
    100: { use: 'Press release lede',        text: "KIMES 2027 — Korea's largest medical equipment show. 1,400+ exhibitors, 80,000+ trade visitors." },
    200: { use: 'About page · blog',         text: "Hosted by KOREA E&EX INC. with KMDA and KMDIA since 1980, KIMES is Korea's largest medical equipment show. KIMES 2027 (42nd edition) runs March 18–21 at COEX with 1,400+ exhibitors from 60+ countries." },
    400: { use: 'Press release boilerplate', text: "Hosted by KOREA E&EX INC. with KMDA and KMDIA since 1980, KIMES is Korea's largest medical equipment show. The 42nd edition (KIMES 2027) runs March 18–21 at COEX, Seoul, with 1,400+ exhibitors from 60+ countries in 14 categories. KIMES 2027 hosts MedicomteK, BEAUTY&DERMA SEOUL, and INSPIRE Digital Health as special zones, with 80,000+ trade visitors — clinicians, researchers, hospital purchasers." },
  };
  const LENGTHS = [40, 100, 200, 400];

  // §2.4 핵심 숫자
  const numbers = window.KIMES_EVENT.numbers;
  const NUM_CARDS = [
    { value: numbers.exhibitors.value, label: '참가업체' },
    { value: numbers.countries.value,  label: '참가국' },
    { value: numbers.visitors.value,   label: '관람객' },
    { value: numbers.categories.value, label: '전시 카테고리' },
  ];

  // §2.5 14 카테고리
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

  // §2.6 공식 채널
  const contact = window.KIMES_EVENT.contact;
  const CHANNELS = [
    { label: '공식 사이트', display: 'kimes.kr',          url: 'https://kimes.kr',                       action: 'open' },
    { label: '문의',        display: contact.email,        value: contact.email,                          action: 'copy' },
    { label: '전화',        display: contact.tel,          value: contact.tel,                            action: 'copy' },
    { label: '인스타그램',  display: '@kimes_official',    url: 'https://instagram.com/kimes_official',   action: 'open' },
    { label: '링크드인',    display: '/company/kimes',     url: 'https://linkedin.com/company/kimes',     action: 'open' },
    { label: '유튜브',      display: '/@kimes',            url: 'https://youtube.com/@kimes',             action: 'open' },
  ];

  return (
    <PageShell
      title="한눈에 보기"
      lede="공식 명칭·일정·보일러플레이트·핵심 숫자. 보도자료·홈페이지·SNS·이메일에 그대로 복사."
    >
      {/* §2.1 공식 명칭 ----------------------------------------- */}
      <SectionHeading id="official-names" title="공식 명칭" />
      <p>보도자료 첫 등장 시 정식 명칭, 이후 약칭. 따옴표·이탤릭 사용 불가.</p>
      <FactTable rows={NAME_ROWS} caption="공식 명칭 한·영 표기" />

      {/* §2.2 일정·장소 ----------------------------------------- */}
      <SectionHeading id="schedule" title="일정 · 장소" />
      <FactTable rows={FACT_ROWS} caption="일정 및 장소 한·영 표기" />

      {/* §2.3 보일러플레이트 ---------------------------- */}
      <SectionHeading id="boilerplates" title="보일러플레이트 (한·영 × 4벌)" />
      {LENGTHS.map(len => (
        <BoilerplateSection
          key={len}
          limit={len}
          ko={BOILERPLATES_KO[len]}
          en={BOILERPLATES_EN[len]}
        />
      ))}

      {/* §2.4 핵심 숫자 ----------------------------------------- */}
      <SectionHeading id="numbers" title="핵심 숫자" />
      <p>참가업체·참가국 — KIMES 2027 잠정. 관람객 — 2026 실적.</p>
      <div className="ov-num-grid" role="list">
        {NUM_CARDS.map(card => (
          <div key={card.label} className="ov-num" role="listitem">
            <div className="ov-num-value">{card.value}</div>
            <div className="ov-num-label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* §2.5 14 카테고리 ----------------------------------------- */}
      <SectionHeading id="categories" title="전시 카테고리 (14)" />
      <ol className="ov-cat-list">
        {CATEGORIES.map(c => (
          <li key={c.n} className="ov-cat">
            <span className="ov-cat-num">{c.n}</span>
            <span className="ov-cat-ko">{c.ko}</span>
            <span className="ov-cat-en">{c.en}</span>
          </li>
        ))}
      </ol>
      <p>카테고리별 부스 위치·참가업체 명단 — 행사 직전 kimes.kr 공개.</p>

      {/* §2.6 공식 채널 -------------------------------------------- */}
      <SectionHeading id="channels" title="공식 채널" />
      <ul className="ov-channels">
        {CHANNELS.map(ch => (
          <li key={ch.label} className="ov-ch">
            <span className="ov-ch-label">{ch.label}</span>
            <span className="ov-ch-value">{ch.display}</span>
            <span className="ov-ch-action">
              {ch.action === 'open' ? (
                <a
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  열기 ↗
                </a>
              ) : (
                <CopyButton
                  value={ch.value}
                  label="복사"
                  ariaLabel={`${ch.label} ${ch.value} 복사`}
                />
              )}
            </span>
          </li>
        ))}
      </ul>
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

// 보일러플레이트 길이 단위(40·100·200·400자) 그룹.
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

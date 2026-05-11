// §5 — KIMES 한눈에 보기 (/overview).
//
// 보도자료·홈페이지·SNS·이메일에 그대로 복사해 쓸 수 있는 공식 문구를
// 한 페이지에 모은 것. 행사 메타데이터는 components/config.js의
// KIMES_EVENT에서 읽음 — 매년 회차 갱신 시 단일 출처에서 전파.
//
// 페이지 구성:
//   §5.3.1 공식 명칭 (정식·줄임·약칭)        ← 이 커밋
//   §5.3.2 일정·장소                         ← 이 커밋
//   §5.3.3 보일러플레이트 4벌 한·영          ← 다음 커밋
//   §5.3.4 핵심 숫자 4개 카드                ← 그 다음 커밋
//   §5.3.5 14개 전시 카테고리
//   §5.3.6 공식 채널

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const CopyButton = window.CopyButton;

function OverviewPage() {
  const { event } = window.KIMES_EVENT;

  // §5.3.1 — 공식 명칭. 회차/연도가 들어간 정식·줄임은 config에서.
  const NAME_ROWS = [
    { label: '정식', ko: event.fullNameKo, en: event.fullNameEn },
    { label: '줄임', ko: event.nameKo,     en: event.nameEn },
    { label: '약칭', ko: 'KIMES',          en: 'KIMES' },
  ];

  // §5.3.2 — 일정·장소.
  const FACT_ROWS = [
    { label: '기간', ko: event.dateRangeKo,      en: event.dateRangeEn },
    { label: '장소', ko: event.venueKo,          en: event.venueEn },
    { label: '홀',   ko: event.halls,             en: 'Hall A, B, C, D, E' },
    { label: '주최', ko: event.organizationKo,   en: event.organizationEn },
    { label: '주관', ko: 'KIMES 사무국',          en: 'KIMES Secretariat' },
  ];

  // §5.3.3 — 보일러플레이트 4벌 × 한·영. 한국어 40·100·200자는 명세 §5.3.3
  // 그대로, 한국어 400자와 영문 4벌은 명세 톤(차분·단정)에 맞게 작성.
  // 회차·연도·주최·공동주최·숫자 표기는 모두 §10.2.5 / §10.2.6 규칙 준수.
  // Phase 4 /downloads 작업 시 content/overview.json으로 분리 예정.
  const BOILERPLATES_KO = {
    40:  { use: 'SNS·이메일 제목용',         text: '한국 최대 의료기기 전시회 KIMES 2027, 3월 18~21일 코엑스' },
    100: { use: '보도자료 리드문용',         text: 'KIMES 2027은 1,400여 개 기업과 8만여 명이 참여하는 한국 최대 의료기기 전시회로, 3월 18~21일 코엑스에서 열립니다.' },
    200: { use: '회사 소개 페이지·블로그용',  text: 'KIMES는 한국이앤엑스가 KMDA·KMDIA와 함께 1980년부터 매년 개최해 온 대한민국 대표 의료기기·병원설비 전시회입니다. 2027년에는 제42회를 맞아 3월 18~21일 코엑스에서 열리며, 60여 개국 1,400여 개 기업이 참가해 영상진단·수술·치료·재활·뷰티·디지털 헬스 등 14개 카테고리를 아우릅니다.' },
    400: { use: '보도자료 회사 소개 칸용',    text: 'KIMES는 한국이앤엑스가 KMDA·KMDIA와 함께 1980년부터 매년 개최해 온 대한민국 대표 의료기기·병원설비 전시회입니다. 2027년에는 제42회를 맞아 3월 18일부터 21일까지 코엑스에서 열리며, 60여 개국 1,400여 개 기업이 참가해 영상진단·수술·치료·재활·뷰티·디지털 헬스 등 14개 카테고리의 최신 의료기기와 병원설비를 선보입니다. 의료진·연구자·구매 담당자 등 8만여 명이 직접 참관합니다. KIMES 2027에는 MedicomteK, BEAUTY&DERMA SEOUL, INSPIRE Digital Health 세 개 특별관이 함께 열려 분야별 전문 전시를 운영합니다.' },
  };
  const BOILERPLATES_EN = {
    40:  { use: 'Email subject / SNS',       text: 'KIMES 2027 · Mar 18–21 · COEX, Seoul' },
    100: { use: 'Press release lede',        text: "KIMES 2027 — Korea's largest medical equipment show. 1,400+ exhibitors, 80,000+ trade visitors." },
    200: { use: 'About page · blog',         text: "Hosted by KOREA E&EX INC. with KMDA and KMDIA since 1980, KIMES is Korea's largest medical equipment show. KIMES 2027 (42nd edition) runs March 18–21 at COEX with 1,400+ exhibitors from 60+ countries." },
    400: { use: 'Press release boilerplate', text: "Hosted by KOREA E&EX INC. with KMDA and KMDIA since 1980, KIMES is Korea's largest medical equipment show. The 42nd edition (KIMES 2027) runs March 18–21 at COEX, Seoul, with 1,400+ exhibitors from 60+ countries in 14 categories. KIMES 2027 hosts MedicomteK, BEAUTY&DERMA SEOUL, and INSPIRE Digital Health as special zones, with 80,000+ trade visitors — clinicians, researchers, hospital purchasers." },
  };
  const LENGTHS = [40, 100, 200, 400];

  // §5.3.4 — 핵심 숫자 4장. §22.5 통계 카드 패턴: 카드는 숫자·라벨만,
  // 출처(잠정·실적 시점)는 섹션 lede에 한 줄로 명시 — 카드 시각 임팩트
  // 유지. 출처 정보는 config.numbers.*.source에 기록되어 있지만 카드에
  // 렌더링하지 않음.
  const numbers = window.KIMES_EVENT.numbers;
  const NUM_CARDS = [
    { value: numbers.exhibitors.value, label: '참가업체' },
    { value: numbers.countries.value,  label: '참가국' },
    { value: numbers.visitors.value,   label: '관람객' },
    { value: numbers.categories.value, label: '전시 카테고리' },
  ];

  // §5.3.5 — 14개 전시 카테고리. 명세 §5.3.5의 한·영 병기 그대로.
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
      lede="보도자료·홈페이지·SNS·이메일에 그대로 복사해 쓸 수 있는 공식 문구를 한 페이지에 모았습니다."
    >
      {/* §5.3.1 공식 명칭 ----------------------------------------- */}
      <SectionHeading id="official-names" title="Official Names" subtitle="공식 명칭" />
      <p>
        회사 자료에 KIMES를 표기할 때 다음 명칭을 그대로 사용합니다. 각 행
        우측의 [Copy] 버튼으로 한국어·영문 어느 쪽이든 클립보드에 바로
        담을 수 있습니다.
      </p>
      <FactTable rows={NAME_ROWS} caption="공식 명칭 한·영 표기" />

      {/* §5.3.2 일정·장소 ----------------------------------------- */}
      <SectionHeading id="schedule" title="Date & Venue" subtitle="일정·장소" />
      <p>
        보도자료·초청장·홈페이지에 사용할 정확한 일정과 장소입니다. 영문은
        보도자료·해외 채널용으로 그대로 복사해서 사용합니다.
      </p>
      <FactTable rows={FACT_ROWS} caption="일정 및 장소 한·영 표기" />

      {/* §5.3.3 보일러플레이트 4벌 ---------------------------- */}
      <SectionHeading id="boilerplates" title="Boilerplate" subtitle="한 줄 소개" />
      <p>
        보도자료 끝의 표준 회사 소개문처럼 길이별로 4벌을 준비했습니다.
        각 박스의 [Copy] 버튼으로 클립보드에 담은 뒤 원하는 자료에
        그대로 붙여 넣으면 됩니다. 좌측 하단에 실제 글자 수와 한도가
        표시되며, 한도를 넘으면 빨갛게 강조됩니다.
      </p>
      {LENGTHS.map(len => (
        <BoilerplateSection
          key={len}
          limit={len}
          ko={BOILERPLATES_KO[len]}
          en={BOILERPLATES_EN[len]}
        />
      ))}

      {/* §5.3.4 핵심 숫자 ----------------------------------------- */}
      <SectionHeading id="numbers" title="Key Numbers" subtitle="핵심 숫자" />
      <p>
        보도자료·홈페이지에 KIMES 규모를 표기할 때 다음 숫자를 사용합니다.
        참가업체·참가국 수는 KIMES 2027 기준이며, 관람객 수는 직전 회차
        (2026) 실적입니다.
      </p>
      <div className="ov-num-grid" role="list">
        {NUM_CARDS.map(card => (
          <div key={card.label} className="ov-num" role="listitem">
            <div className="ov-num-value">{card.value}</div>
            <div className="ov-num-label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* §5.3.5 14개 전시 카테고리 ----------------------------------- */}
      <SectionHeading id="categories" title="Categories" subtitle="14개 전시 카테고리" />
      <p>
        KIMES는 영상진단부터 바이오·제약까지 14개 전시 카테고리로 구성됩니다.
        각 카테고리별 부스 위치와 참가업체 명단은 행사 직전 공식 사이트에
        공개됩니다.
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

      {/* §5.3.6 공식 채널 — 푸터로 이동 (모든 페이지 공통 노출). */}
    </PageShell>
  );
}

// 공식 명칭·일정 같은 [구분 / 한국어 / 영문 / 복사] 4컬럼 표.
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

// 보일러플레이트 길이 단위(40·100·200·400자) 그룹. 각 그룹 안에서
// 한·영 박스를 좌·우(데스크탑) 또는 위·아래(모바일)로 배치.
function BoilerplateSection({ limit, ko, en }) {
  return (
    <section className="bp-section" aria-labelledby={`bp-${limit}`}>
      <div className="bp-section-head">
        <h3 id={`bp-${limit}`} className="bp-section-title">{limit}자 이내</h3>
        <span className="bp-section-use">{ko.use}</span>
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

// §10 — /notation. 보도자료·웹사이트·인쇄물·SNS 어디든 KIMES를 언급할 때
// 따라야 할 표기 규칙. 사소해 보이지만 통일성이 브랜드 신뢰도를 만듭니다.
//
// 명세 §10.2.1~§10.2.7 평면 구조. 모든 표는 ✓ OK / ✗ 미권장 패턴.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const CopyButton = window.CopyButton;

// 10.2.1 명칭 표기
const NAME_RULES = [
  { case: '처음 언급', ok: 'KIMES 2027 (Korea International Medical & Hospital Equipment Show)', bad: 'KIMES (풀네임 생략)' },
  { case: '두 번째부터', ok: 'KIMES', bad: '"킴스", "kimes" 소문자' },
  { case: '따옴표', ok: '사용하지 않음', bad: '"KIMES"' },
  { case: '이탤릭', ok: '사용하지 않음', bad: '*KIMES*' },
  { case: '한글 표기', ok: 'KIMES (영문 그대로)', bad: '킴스 / 킴즈 / 케이아이엠이에스' },
];

// 10.2.3 날짜·시간
const DATE_RULES = [
  { case: '단일 날짜',  ko: '2027년 3월 18일',          en: 'March 18, 2027' },
  { case: '요일 포함',  ko: '2027년 3월 18일(목)',      en: 'Thursday, March 18, 2027' },
  { case: '날짜 범위',  ko: '2027년 3월 18일~21일',     en: 'March 18–21, 2027' },
  { case: '월 범위',    ko: '2027년 3월',               en: 'March 2027' },
  { case: '시간',       ko: '오전 10시 ~ 오후 5시',     en: '10:00–17:00 KST' },
  { case: '구분기호',   ko: '물결(~) 또는 en-dash(–)',  en: 'en-dash (–) only' },
  { case: '✗ 피해주세요', ko: 'hyphen(-)으로 범위', en: 'hyphen for ranges', bad: true },
];

// 10.2.4 장소·부스
const PLACE_RULES = [
  { case: '장소',       ok: '코엑스 / COEX',                       bad: '코엑스 컨벤션센터' },
  { case: '홀',         ok: 'Hall A · Hall B–E',                    bad: 'A홀, B-E홀' },
  { case: '부스',       ok: 'Booth A-101 (영문 ALL CAPS, 하이픈)',   bad: 'booth a101 / A101' },
  { case: '한글 표기',  ok: '부스 A-101',                            bad: 'A-101부스' },
];

// 10.2.5 숫자 — 4 룰
const NUMBER_RULES = [
  { rule: '천 단위 콤마', desc: '1,000 이상 콤마 사용', sample: '1,490 / 80,000' },
  { rule: '퍼센트',       desc: '공백 없음',           sample: '25%' },
  { rule: '가격',         desc: '₩ 또는 KRW 표기',     sample: '₩50,000 / KRW 50,000' },
  { rule: '약식 큰 수',   desc: '+ 또는 "여" 사용',    sample: '1,400+ (1,400여 개)' },
];

// 10.2.6 구분 기호 — 5 종
const SEP_RULES = [
  { mark: '—',  name: 'em-dash',     usage: '강조 구분·부제목',     example: 'KIMES 2027 — 등록 시작' },
  { mark: '–',  name: 'en-dash',     usage: '숫자·날짜 범위',       example: 'March 18–21' },
  { mark: '·',  name: 'middle dot',   usage: '메타정보 구분',         example: '보도자료 · PRESS' },
  { mark: '/',  name: 'slash',        usage: '한·영 병기',            example: '참가 / EXHIBITOR' },
  { mark: ':',  name: 'colon',        usage: '라벨–값 쌍',            example: '일정: 3월 18일' },
];

function NotationPage() {
  const { contact, year } = window.KIMES_EVENT;

  const boilerplateKo = `[KIMES ${year} 소개]
KIMES는 한국이앤엑스가 KMDA·KMDIA와 함께 1980년부터 매년 개최해 온 대한민국 대표 의료기기·병원설비 전시회입니다. ${year}년에는 제42회를 맞아 3월 18~21일 코엑스에서 열리며, 60여 개국 1,400여 개 기업이 참가해 영상진단·수술·치료·재활·뷰티·디지털 헬스 등 14개 카테고리를 아우릅니다.
공식 사이트: kimes.kr · 문의: ${contact.email} · ${contact.tel}`;

  const boilerplateEn = `[About KIMES ${year}]
KIMES is Korea's leading medical equipment and hospital supplies exhibition, hosted annually since 1980 by KOREA E&EX INC. with KMDA and KMDIA. The 42nd edition runs March 18–21, ${year} at COEX, Seoul, with 1,400+ exhibitors from 60+ countries across 14 categories — imaging, surgery, treatment, rehabilitation, beauty, and digital health.
Official site: kimes.kr · Contact: ${contact.email} · ${contact.tel}`;

  return (
    <PageShell
      eyebrow="06"
      title="Writing Style"
      subtitle="공식 표기 규칙"
      lede="보도자료·웹사이트·인쇄물·SNS 어디든 한 줄 안에 KIMES를 언급할 때 따라야 할 표기 규칙입니다. 사소해 보이지만 통일성이 브랜드 신뢰도를 만듭니다."
    >
      {/* §10.2.1 명칭 표기 ----------------------------------------------- */}
      <SectionHeading id="name" title="Name Notation" subtitle="KIMES 명칭 표기" />
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

      {/* §10.2.2 회차 표기 ---------------------------------------------- */}
      <SectionHeading id="edition" title="Edition" subtitle="회차 표기" />
      <ul className="ws-bullets">
        <li><strong>한국어</strong>: 제42회 KIMES {year}</li>
        <li><strong>영문</strong>: KIMES {year} — 42nd edition</li>
        <li>회차 숫자는 항상 아라비아 숫자 (한자·한글 사용하지 않음)</li>
      </ul>

      {/* §10.2.3 날짜·시간 ---------------------------------------------- */}
      <SectionHeading id="date" title="Date & Time" subtitle="날짜·시간" />
      <table className="ws-table">
        <thead>
          <tr><th>항목</th><th>한국어</th><th>영문</th></tr>
        </thead>
        <tbody>
          {DATE_RULES.map((r, i) => (
            <tr key={i} className={r.bad ? 'ws-row-bad' : ''}>
              <td>{r.case}</td>
              <td>{r.ko}</td>
              <td>{r.en}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* §10.2.4 장소·부스 ---------------------------------------------- */}
      <SectionHeading id="place" title="Place & Booth" subtitle="장소·부스" />
      <table className="ws-table">
        <thead>
          <tr><th>항목</th><th className="ws-col-ok">✓ OK</th><th className="ws-col-bad">✗ 미권장</th></tr>
        </thead>
        <tbody>
          {PLACE_RULES.map((r, i) => (
            <tr key={i}>
              <td>{r.case}</td>
              <td className="ws-cell-ok">{r.ok}</td>
              <td className="ws-cell-bad">{r.bad}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* §10.2.5 숫자 --------------------------------------------------- */}
      <SectionHeading id="number" title="Numbers" subtitle="숫자" />
      <div className="ws-numbers">
        {NUMBER_RULES.map((r, i) => (
          <div key={i} className="ws-number-card">
            <div className="ws-number-rule">{r.rule}</div>
            <div className="ws-number-desc">{r.desc}</div>
            <div className="ws-number-sample">{r.sample}</div>
          </div>
        ))}
      </div>

      {/* §10.2.6 구분 기호 ---------------------------------------------- */}
      <SectionHeading id="separator" title="Separators" subtitle="구분 기호" />
      <table className="ws-table">
        <thead>
          <tr><th>기호</th><th>이름</th><th>용도</th><th>예시</th></tr>
        </thead>
        <tbody>
          {SEP_RULES.map((r, i) => (
            <tr key={i}>
              <td className="ws-sep-mark">{r.mark}</td>
              <td className="ws-sep-name">{r.name}</td>
              <td>{r.usage}</td>
              <td className="ws-sep-example">{r.example}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* §10.2.7 보일러플레이트 ----------------------------------------- */}
      <SectionHeading id="boilerplate" title="Press Boilerplate" subtitle="보도자료 표준 보일러플레이트" />
      <p>
        보도자료 끝에 그대로 붙일 수 있는 한·영 두 가지 표준 보일러플레이트
        입니다. <code>KIMES_EVENT.year</code> 기반 동적이라 회차 갱신 시 자동
        반영됩니다. 두 박스의 [Copy] 버튼으로 클립보드에 바로 담을 수
        있습니다.
      </p>
      <div className="ws-boilerplate-grid">
        <article className="ws-boilerplate">
          <header className="ws-boilerplate-head">
            <span className="ws-boilerplate-lang">한국어</span>
            <CopyButton text={boilerplateKo} label="복사" />
          </header>
          <pre className="ws-boilerplate-body">{boilerplateKo}</pre>
        </article>
        <article className="ws-boilerplate">
          <header className="ws-boilerplate-head">
            <span className="ws-boilerplate-lang">English</span>
            <CopyButton text={boilerplateEn} label="Copy" />
          </header>
          <pre className="ws-boilerplate-body">{boilerplateEn}</pre>
        </article>
      </div>
    </PageShell>
  );
}

window.NotationPage = NotationPage;

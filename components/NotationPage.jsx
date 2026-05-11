// §9 — /notation Writing Style. 보도자료·웹사이트·인쇄물·SNS 어디든
// KIMES를 언급할 때 따라야 할 표기 규칙. 통일성이 브랜드 신뢰도를 만듭니다.
//
// 명세 §9.2.1~§9.2.8 평면 구조 — 8개 섹션:
//   §9.2.1 Name Notation         — KIMES 명칭 표기
//   §9.2.2 Edition               — 회차
//   §9.2.3 Date & Time           — 날짜·시간
//   §9.2.4 Place & Booth         — 장소·부스
//   §9.2.5 Numbers               — 숫자
//   §9.2.6 Separators            — 구분 기호
//   §9.2.7 SNS Tag               — SNS 태그·해시태그 (이전 §12 /digital 흡수)
//   §9.2.8 Restricted Expressions — 별도 계약·승인 필요 표현 (이전 §9 /co-branding 흡수)
//
// /co-branding 페이지(이전 §9)는 70% 디자이너 영역이라 통째로 제거. /digital
// 페이지(이전 §12)는 §6.2.3 / §6.2.5와 정보 중복으로 통째로 제거. 두 페이지
// 의 핵심 정보(Restricted Expressions / SNS Tag)만 본 페이지로 흡수.
// 보도자료 보일러플레이트는 §5 /overview의 §5.3.3 4벌과 정보 중복으로 제거.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;

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

// 9.2.4 장소·부스
const PLACE_RULES = [
  { case: '장소',       ok: '코엑스 / COEX',                       bad: '코엑스 컨벤션센터' },
  { case: '홀',         ok: 'Hall A · Hall B–E',                    bad: 'A홀, B-E홀' },
  { case: '부스',       ok: 'Booth A-101 (영문 ALL CAPS, 하이픈)',   bad: 'booth a101 / A101' },
  { case: '한글 표기',  ok: '부스 A-101',                            bad: 'A-101부스' },
];

// 9.2.7 SNS 태그·해시태그 — 이전 §12 /digital의 SNS Channels에서 흡수
const SNS_RULES = [
  { item: '공식 태그',     value: '@kimes_official',                       hint: 'SNS 게시물 캡션에 멘션' },
  { item: '해시태그',      value: '#KIMES2027 · #KIMES · #의료기기전시회 · #COEX', hint: '게시물 본문 또는 캡션 끝' },
  { item: '라이브 스트리밍', value: 'KIMES 로고 노출 시 사전 통보 권장',     hint: '의무 아님 — 사무국 노출 추적용' },
];

// 9.2.8 별도 계약·승인 필요 표현 — 이전 §9 /co-branding의 Restricted에서 흡수
const RESTRICTED = [
  'KIMES 공식 파트너 / Official Partner of KIMES',
  'KIMES 추천 / KIMES Recommended',
  'KIMES 인증 / KIMES Certified',
  'KIMES 후원 / Sponsored by KIMES',
  'KIMES 주최 / Organized by KIMES',
  'KIMES 로고를 회사 로고와 합친 새 로고',
  '"KIMES 2027 official ___" 형태의 모든 표현',
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
  const { year } = window.KIMES_EVENT;

  return (
    <PageShell
      eyebrow="05"
      title="Writing Style"
      subtitle="공식 표기 규칙"
      lede="보도자료·웹사이트·인쇄물·SNS 어디든 KIMES를 언급할 때 따라야 할 표기 규칙입니다. 명칭·날짜·숫자·구분 기호부터 SNS 태그·별도 계약 필요 표현까지 한 페이지에서 확인하실 수 있습니다. 보도자료 보일러플레이트는 → /overview의 4벌(40·100·200·400자)을 그대로 사용하세요."
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
      <p>
        날짜 범위는 en-dash(–) 또는 물결(~)을 사용해주세요. 디자인 작업 시
        상세 구분은 아래 표를 참고하세요.
      </p>
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

      {/* §9.2.7 SNS 태그·해시태그 (이전 §12 /digital 흡수) ------------- */}
      <SectionHeading id="sns" title="SNS Tag" subtitle="SNS 태그·해시태그" />
      <p>
        SNS 콘텐츠에 KIMES 로고가 등장할 때 캡션에 공식 태그를 권장합니다.
        의무는 아니나 사무국 노출 추적·답례 인사 자료로 활용됩니다.
      </p>
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

      {/* §9.2.8 별도 계약·승인 필요 표현 (이전 §9 /co-branding 흡수) --- */}
      <SectionHeading id="restricted" title="Restricted Expressions" subtitle="별도 계약·승인이 필요한 표현" />
      <section className="ws-restricted">
        <p>
          다음 표현은 별도 계약·승인이 필요합니다. 사용 전 사무국과 협의해
          주세요.
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

window.NotationPage = NotationPage;

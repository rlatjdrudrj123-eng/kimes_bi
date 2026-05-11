// §6 — /notation (v2027.1). 명칭·날짜·숫자·구분 기호·SNS 태그·별도 계약
// 필요 표현. 보도자료 보일러플레이트는 → /overview의 4벌 사용.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;

// §6.1 명칭 표기
const NAME_RULES = [
  { case: '첫 등장',     ok: 'KIMES 2027 (Korea International Medical & Hospital Equipment Show)', bad: '풀네임 생략' },
  { case: '두 번째부터', ok: 'KIMES',                                                                bad: '"킴스" · 소문자 "kimes"' },
  { case: '따옴표',      ok: '사용 불가',                                                            bad: '"KIMES"' },
  { case: '이탤릭',      ok: '사용 불가',                                                            bad: '*KIMES*' },
  { case: '한글 음차',   ok: '사용 불가',                                                            bad: '킴스 · 킴즈 · 케이아이엠이에스' },
];

// §6.3 날짜·시간
const DATE_RULES = [
  { case: '단일',  ko: '2027년 3월 18일',          en: 'March 18, 2027' },
  { case: '요일',  ko: '2027년 3월 18일(목)',      en: 'Thursday, March 18, 2027' },
  { case: '범위',  ko: '2027년 3월 18일~21일',     en: 'March 18–21, 2027' },
  { case: '월',    ko: '2027년 3월',               en: 'March 2027' },
  { case: '시간',  ko: '오전 10시 ~ 오후 5시',     en: '10:00–17:00 KST' },
];

// §6.4 장소·부스
const PLACE_RULES = [
  { case: '장소',     ok: '코엑스 / COEX',     bad: '코엑스 컨벤션센터' },
  { case: '홀',       ok: 'Hall A · Hall B–E', bad: 'A홀 · B-E홀' },
  { case: '부스 (EN)', ok: 'Booth A-101',       bad: 'booth a101 · A101' },
  { case: '부스 (KR)', ok: '부스 A-101',        bad: 'A-101부스' },
];

// §6.7 SNS 태그
const SNS_RULES = [
  { item: '공식 태그', value: '@kimes_official' },
  { item: '해시태그',  value: '#KIMES2027 #KIMES #COEX #의료기기전시회' },
];

// §6.8 별도 계약 필요 표현 (Tier 1)
const RESTRICTED = [
  'KIMES 공식 파트너 / Official Partner of KIMES',
  'KIMES 추천 / KIMES Recommended',
  'KIMES 인증 / KIMES Certified',
  'KIMES 후원 / Sponsored by KIMES',
  'KIMES 주최 / Organized by KIMES',
  'KIMES 로고와 회사 로고의 합성 신규 로고',
  '"KIMES 2027 official ___" 형태 전반',
];

// §6.5 숫자
const NUMBER_RULES = [
  { rule: '천 단위 콤마', sample: '1,400 / 80,000' },
  { rule: '약식 큰 수',   sample: '1,400+ 또는 1,400여' },
  { rule: '가격',         sample: '₩50,000 / KRW 50,000' },
];

// §6.6 구분 기호
const SEP_RULES = [
  { mark: '—',  name: 'em-dash',     usage: '강조 · 부제',    example: 'KIMES 2027 — 등록 시작' },
  { mark: '–',  name: 'en-dash',     usage: '범위',            example: 'March 18–21' },
  { mark: '·',  name: 'middle dot',  usage: '메타 구분',       example: '보도자료 · PRESS' },
  { mark: '/',  name: 'slash',       usage: '한·영 병기',      example: '참가 / EXHIBITOR' },
];

function NotationPage() {
  const { year } = window.KIMES_EVENT;

  return (
    <PageShell
      title="표기 규칙"
      lede="명칭·날짜·숫자·구분 기호·SNS 태그·별도 계약 필요 표현. 보도자료 보일러플레이트는 → /overview의 4벌 사용."
    >
      {/* §6.1 명칭 표기 ----------------------------------------------- */}
      <SectionHeading id="name" title="명칭 표기" />
      <table className="ws-table">
        <thead>
          <tr><th>상황</th><th className="ws-col-ok">OK</th><th className="ws-col-bad">사용 불가</th></tr>
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

      {/* §6.2 회차 ---------------------------------------------- */}
      <SectionHeading id="edition" title="회차" />
      <ul className="ws-bullets">
        <li>한국어 — 제42회 KIMES {year}</li>
        <li>영문 — KIMES {year} — 42nd edition</li>
        <li>회차 숫자 — 아라비아 숫자 (한자·한글 사용 불가)</li>
      </ul>

      {/* §6.3 날짜·시간 ---------------------------------------------- */}
      <SectionHeading id="date" title="날짜 · 시간" />
      <table className="ws-table">
        <thead>
          <tr><th>항목</th><th>한국어</th><th>영문</th></tr>
        </thead>
        <tbody>
          {DATE_RULES.map((r, i) => (
            <tr key={i}>
              <td>{r.case}</td>
              <td>{r.ko}</td>
              <td>{r.en}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>범위 구분 — 한글 <code>~</code> 또는 en-dash <code>–</code>. hyphen <code>-</code> 사용 불가.</p>

      {/* §6.4 장소·부스 ---------------------------------------------- */}
      <SectionHeading id="place" title="장소 · 부스" />
      <table className="ws-table">
        <thead>
          <tr><th>항목</th><th className="ws-col-ok">OK</th><th className="ws-col-bad">사용 불가</th></tr>
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

      {/* §6.5 숫자 --------------------------------------------------- */}
      <SectionHeading id="number" title="숫자" />
      <div className="ws-numbers">
        {NUMBER_RULES.map((r, i) => (
          <div key={i} className="ws-number-card">
            <div className="ws-number-rule">{r.rule}</div>
            <div className="ws-number-sample">{r.sample}</div>
          </div>
        ))}
      </div>

      {/* §6.6 구분 기호 ---------------------------------------------- */}
      <SectionHeading id="separator" title="구분 기호" />
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

      {/* §6.7 SNS 태그 -------------------------- */}
      <SectionHeading id="sns" title="SNS 태그" />
      <table className="ws-table">
        <thead>
          <tr><th>항목</th><th>권장</th></tr>
        </thead>
        <tbody>
          {SNS_RULES.map((r, i) => (
            <tr key={i}>
              <td>{r.item}</td>
              <td><code>{r.value}</code></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* §6.8 별도 계약 필요 표현 (Tier 1) --- */}
      <SectionHeading id="restricted" title="별도 계약 필요 표현 (Tier 1)" />
      <section className="ws-restricted">
        <p>
          다음 표현은 별도 라이선스 계약 필수. 무단 사용 금지.
        </p>
        <ul className="ws-restricted-list">
          {RESTRICTED.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <div className="ws-restricted-actions">
          <a href={`mailto:${window.KIMES_EVENT.contact.email}?subject=${encodeURIComponent('[라이선스 문의] ')}`} className="btn btn-primary btn-md">
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

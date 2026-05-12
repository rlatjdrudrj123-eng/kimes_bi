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
  { case: '처음 언급', ok: 'KIMES 2027 (The 42nd Korea International Medical & Hospital Equipment Show)', bad: 'KIMES (풀네임 생략)' },
  { case: '두 번째부터', ok: 'KIMES', bad: '"킴스", "kimes" 소문자' },
  { case: '따옴표', ok: '사용하지 않음', bad: '"KIMES"' },
  { case: '이탤릭', ok: '사용하지 않음', bad: '*KIMES*' },
  { case: '한글 표기', ok: 'KIMES (영문 그대로)', bad: '킴스 / 킴즈 / 케이아이엠이에스' },
];

// 9.2.4 장소·부스
const PLACE_RULES = [
  { case: '장소', ok: '코엑스 / COEX',     bad: '씨오이엑스 / Coex / coex' },
  { case: '홀',   ok: 'Hall A · Hall B–E', bad: 'A Hall / 에이홀' },
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

function NotationPage() {
  const { year } = window.KIMES_EVENT;

  return (
    <PageShell
      eyebrow="05"
      title="Writing Style"
      subtitle="공식 표기 규칙"
      lede="KIMES 언급 시 표기 규칙. 명칭·SNS 태그·승인 필요 표현 등. 보일러플레이트는 → /overview 참고."
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
      <p className="ws-footnote">
        날짜·시간 표기는 → <a href="#/overview">/overview</a>의 Date &amp; Venue 사용.
      </p>

      {/* §6.3 회차 — 표 형식 */}
      <SectionHeading id="edition" title="Edition" subtitle="회차 표기" />
      <table className="ws-table">
        <thead>
          <tr><th>항목</th><th>표기</th></tr>
        </thead>
        <tbody>
          <tr><td>권장</td><td>KIMES {year} / KIMES</td></tr>
          <tr><td>국문 정식</td><td>제42회 국제의료기기·병원설비전시회</td></tr>
          <tr><td>영문 정식</td><td>The 42nd Korea International Medical &amp; Hospital Equipment Show</td></tr>
        </tbody>
      </table>

      {/* §6.4 Date & Time 섹션 — 통째 삭제 (→ /overview의 Date & Venue 참고) */}

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

      {/* §6.6 Numbers · §6.7 Separators 섹션 통째 삭제 (디자이너 디테일은 별도 가이드 영역) */}

      {/* §6.8 SNS Tag ------------- */}
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

      {/* §9.2.8 별도 계약·승인 필요 표현 (이전 §9 /co-branding 흡수) --- */}
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

window.NotationPage = NotationPage;

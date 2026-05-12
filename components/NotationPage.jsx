// §5 — /notation 표기·서체 — v2027.1. KIMES 텍스트·서체 규칙.
// (이전 /typography 페이지 흡수)
//
// 8개 섹션:
//   §5.1 Name Notation           — 명칭 표기
//   §5.2 Edition                 — 회차 (표 형식)
//   §5.3 Place & Booth           — 장소·부스 (2행)
//   §5.4 Fonts                   — 권장 서체 (Montserrat + Pretendard)
//   §5.5 Recommended Notation    — 권장 사양 (텍스트 표기 사양)
//   §5.6 Wordmark Use            — 로고 자리에는 SVG (가드레일)
//   §5.7 SNS Tag                 — SNS 태그
//   §5.8 Restricted Expressions  — 별도 계약 필요 표현

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;

// 5.1 명칭 표기
const NAME_RULES = [
  { case: '처음 언급', ok: 'KIMES 2027 (The 42nd Korea International Medical & Hospital Equipment Show)', bad: 'KIMES (풀네임 생략)' },
  { case: '두 번째부터', ok: 'KIMES', bad: '"킴스", "kimes" 소문자' },
  { case: '따옴표', ok: '사용하지 않음', bad: '"KIMES"' },
  { case: '이탤릭', ok: '사용하지 않음', bad: '*KIMES*' },
  { case: '한글 표기', ok: 'KIMES (영문 그대로)', bad: '킴스 / 킴즈 / 케이아이엠이에스' },
];

// 5.3 장소·부스
const PLACE_RULES = [
  { case: '장소', ok: '코엑스 / COEX',     bad: '씨오이엑스 / Coex / coex' },
  { case: '홀',   ok: 'Hall A · Hall B–E', bad: 'A Hall / 에이홀' },
];

// 5.7 SNS 태그
const SNS_RULES = [
  { item: '공식 태그',     value: '@kimes_official',                       hint: 'SNS 게시물 캡션에 멘션' },
  { item: '해시태그',      value: '#KIMES2027 · #KIMES · #의료기기전시회 · #COEX', hint: '게시물 본문 또는 캡션 끝' },
  { item: '라이브 스트리밍', value: 'KIMES 로고 노출 시 사전 통보 권장',     hint: '의무 아님 — 사무국 노출 추적용' },
];

// 5.8 별도 계약·승인 필요 표현
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
      title="Writing & Typography"
      subtitle="표기·서체"
      lede="KIMES 표기 규칙과 권장 서체. 명칭·회차·장소·서체·권장 사양·SNS 태그·승인 필요 표현. 보일러플레이트는 → /overview 참고."
    >
      {/* §5.1 명칭 표기 ----------------------------------------------- */}
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

      {/* §5.2 회차 — 표 형식 */}
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

      {/* §5.3 장소·부스 ---------------------------------------------- */}
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

      {/* §5.4 권장 서체 (← 이전 /typography §5.1) ------------------- */}
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

      {/* §5.5 권장 사양 (← 이전 /typography §5.2) ------------------- */}
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

      {/* §5.6 로고 자리에는 SVG (← 이전 /typography §5.3) ----------- */}
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

      {/* §5.7 SNS Tag ------------- */}
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

      {/* §5.8 별도 계약·승인 필요 표현 --- */}
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

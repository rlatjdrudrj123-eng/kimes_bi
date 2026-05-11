// §5 — /typography (v2027.1). 자산 2종 (워드마크 SVG · 텍스트 표기) ·
// 권장 서체 · 권장 사양 · 자산 선택 기준.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;

function TypographyPage() {
  const { year } = window.KIMES_EVENT;

  return (
    <PageShell
      title="타이포그래피"
      lede="자산 2종 (워드마크 SVG · 텍스트 표기) · 권장 서체 · 권장 사양."
    >
      {/* §5.1 자산 2종 ----------------------------------------------------- */}
      <SectionHeading id="purpose" title="자산 2종" />
      <div className="ty-models">
        <article className="ty-model">
          <div className="ty-model-head">
            <span className="ty-model-tag">자산 1</span>
            <h3 className="ty-model-name">KIMES 워드마크 (SVG)</h3>
          </div>
          <p className="ty-model-def">공식 자산. 변형 불가 (Tier 1).</p>
          <ul className="ty-model-uses">
            <li>보도자료 헤더</li>
            <li>부스 인증 마크</li>
            <li>공문 · 계약서 헤더</li>
          </ul>
          <Link to="/logo" className="ty-model-cta">자산 다운로드 → /logo</Link>
        </article>
        <article className="ty-model">
          <div className="ty-model-head">
            <span className="ty-model-tag">자산 2</span>
            <h3 className="ty-model-name">KIMES 텍스트 표기</h3>
          </div>
          <p className="ty-model-def">"KIMES" 4글자 텍스트. 회사 디자인 시스템 내 자유 사용 (Tier 2).</p>
          <ul className="ty-model-uses">
            <li>부스 그래픽 · 광고 카피</li>
            <li>SNS 콘텐츠</li>
            <li>사내 발표 자료 · 영상 자막</li>
          </ul>
        </article>
      </div>

      {/* §5.2 권장 서체 ---------------------- */}
      <SectionHeading id="fonts" title="권장 서체" />
      <p>
        <strong>Montserrat</strong> (영문) + <strong>Pretendard</strong>
        (한글) — 둘 다 무료 · 오픈소스. 굵기 800 ExtraBold 또는 700 Bold
        권장 (부스 · 인쇄물 가독성).
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

      {/* §5.3 권장 사양 ------------------------------------------------- */}
      <SectionHeading id="recommended" title="권장 사양 (텍스트 표기)" />
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
      <p>회사 디자인 시스템에 맞춰 자유 조정 가능 (Tier 2).</p>

      {/* §5.4 자산 선택 기준 --------------------- */}
      <SectionHeading id="guardrail" title="자산 선택 기준" />
      <section className="ty-guard">
        <p>
          <strong>워드마크 SVG 자리</strong> — 공식 보증·증명 영역 (보도자료
          헤더 · 부스 인증 마크 · 공문 헤더). 타 폰트로 타이핑한 "KIMES"
          대체 불가 (Tier 1).
        </p>
        <p>
          <strong>텍스트 표기 자리</strong> — 마케팅·콘텐츠 영역. 회사 폰트·
          컬러 자유 사용.
        </p>
        <Link to="/logo#versions" className="btn btn-primary btn-md">
          KIMES 워드마크 다운로드 →
        </Link>
      </section>

      <p className="ty-cross">
        로고 자산 — <Link to="/logo">/logo</Link> · 표기 규칙 ·
        승인 필요 표현 — <Link to="/notation">/notation</Link>
      </p>
    </PageShell>
  );
}

window.TypographyPage = TypographyPage;

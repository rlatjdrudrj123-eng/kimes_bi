// §8 — /typography. 두 에셋(워드마크 vs 텍스트 표기) + 권장 서체·사양.
// 이전 6 sub-section에서 4 sub-section으로 압축 (Free Composition Gallery
// 제거 + Fonts 카드 6 굵기 → 권장 2개만).

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;

function TypographyPage() {
  const { year } = window.KIMES_EVENT;

  return (
    <PageShell
      eyebrow="04"
      title="Typography"
      subtitle="타이포그래피"
      lede="KIMES를 자기 자료에 표기할 때 두 가지 에셋(워드마크 SVG vs 텍스트 표기)을 어떻게 다르게 쓰는지, 권장 서체와 사양은 무엇인지 안내합니다."
    >
      {/* §8.1 두 에셋 ----------------------------------------------------- */}
      <SectionHeading id="purpose" title="Two Asset Models" subtitle="두 에셋" />
      <div className="ty-models">
        <article className="ty-model">
          <div className="ty-model-head">
            <span className="ty-model-tag">에셋 1</span>
            <h3 className="ty-model-name">KIMES 워드마크</h3>
          </div>
          <p className="ty-model-def">공식 KIMES SVG. 변형 없이 그대로 사용.</p>
          <ul className="ty-model-uses">
            <li>보도자료 헤더 락업</li>
            <li>부스 인증 마크</li>
            <li>공문·계약서 헤더</li>
          </ul>
          <Link to="/logo" className="ty-model-cta">에셋 다운로드 → /logo</Link>
        </article>
        <article className="ty-model">
          <div className="ty-model-head">
            <span className="ty-model-tag">에셋 2</span>
            <h3 className="ty-model-name">KIMES 텍스트 표기</h3>
          </div>
          <p className="ty-model-def">"KIMES" 4글자 텍스트. 회사 디자인 시스템에 맞춰 자유롭게 사용.</p>
          <ul className="ty-model-uses">
            <li>부스 그래픽 · 광고 카피</li>
            <li>SNS 콘텐츠</li>
            <li>사내 발표 자료 · 영상 자막</li>
          </ul>
        </article>
      </div>

      {/* §8.2 사용 서체 — 두 폰트 + 권장 굵기 한 줄 ---------------------- */}
      <SectionHeading id="fonts" title="Fonts" subtitle="사용 서체" />
      <p>
        KIMES는 <strong>Montserrat</strong>(영문) + <strong>Pretendard</strong>
        (한글) 페어를 권장합니다. 둘 다 무료·오픈소스. 굵기는{' '}
        <strong>800 ExtraBold</strong> 또는 <strong>700 Bold</strong>를 권장
        합니다 — 부스·인쇄물에서 멀리서도 또렷.
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

      {/* §8.3 권장 사양 ------------------------------------------------- */}
      <SectionHeading id="recommended" title="Recommended Notation" subtitle="권장 사양" />
      <p>
        권장 사항입니다. 회사 디자인 시스템에 맞춰 자유 조정 가능합니다.
        "KIMES {year} 참가" 같은 텍스트 표기를 자료에 넣을 때 이 사양을
        기준으로 시작하시면 결이 자연스럽습니다.
      </p>
      <div className="ty-rec">
        <div className="ty-rec-sample" aria-label="권장 사양 텍스트 샘플 (SVG 아닌 진짜 텍스트)">
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

      {/* §8.4 워드마크 자리에는 SVG 사용 (가드레일) --------------------- */}
      <SectionHeading id="guardrail" title="Wordmark Use" subtitle="워드마크 자리에는 SVG" />
      <section className="ty-guard">
        <p>
          공식 보증·증명이 필요한 자리(보도자료 헤더 마크, 부스 인증 마크,
          공문 헤더 등)에는 KIMES 워드마크 SVG를 사용해주세요. 다른 폰트로
          "KIMES"를 타이핑해서 워드마크 자리에 박는 것은 피해주세요. 그 외
          마케팅·콘텐츠 텍스트 표기는 자유롭게 사용하셔도 됩니다.
        </p>
        <Link to="/logo#versions" className="btn btn-primary btn-md">
          KIMES 워드마크 다운로드 →
        </Link>
      </section>

      <p className="ty-cross">
        로고 에셋은 → <Link to="/logo">/logo</Link>{' · '}
        표기 규칙·승인 필요 표현은 → <Link to="/notation">/notation</Link>
      </p>
    </PageShell>
  );
}

window.TypographyPage = TypographyPage;

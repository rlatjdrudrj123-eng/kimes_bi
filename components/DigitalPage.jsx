// §12 — /digital. 디지털·SNS 자산 가이드. 참가업체 마케팅의 80%가 디지털.
// 웹사이트·SNS·동영상에서 KIMES를 어떻게 표기할지 한 페이지로.
//
// 명세 §12.2.1~§12.2.6 평면 구조.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;

function DigitalPage() {
  const { year } = window.KIMES_EVENT;

  return (
    <PageShell
      eyebrow="08"
      title="Digital"
      subtitle="디지털·SNS 자산 가이드"
      lede="지금 시대 참가업체 마케팅의 80%는 디지털입니다. 웹사이트·SNS·동영상·온라인 광고에서 KIMES를 어떻게 표기할지 한 페이지로 정리했습니다."
    >
      {/* §12.2.1 회사 홈페이지 ------------------------------------------ */}
      <SectionHeading id="homepage" title="Company Homepage" subtitle="회사 홈페이지" />
      <ul className="dg-list">
        <li><strong>KIMES 참가 안내 위치</strong> — 메인 히어로 영역 / 상단 알림 바 / 또는 전용 랜딩 페이지를 권장합니다.</li>
        <li><strong>클리어 스페이스</strong> — KIMES 로고 사용 시 §6.2.3 클리어 스페이스 룰 (K 높이만큼 여백)을 그대로 유지합니다.</li>
        <li><strong>링크</strong> — KIMES 워드마크에 링크를 걸 때는 <code>https://kimes.kr</code>로만 연결합니다 (다른 페이지 권장하지 않음).</li>
        <li><strong>alt 텍스트</strong> — <code>KIMES {year} — 한국 국제 의료기기 전시회</code></li>
      </ul>

      {/* §12.2.2 OG 이미지·메타 ----------------------------------------- */}
      <SectionHeading id="og" title="OG Image & Meta" subtitle="OG 이미지·메타" />
      <div className="dg-og">
        <div className="dg-og-mock" aria-label="OG 이미지 권장 배치">
          <div className="dg-og-main">[회사 메인 비주얼]</div>
          <div className="dg-og-kimes">
            <span className="dg-og-kimes-label">KIMES {year}</span>
            <span className="dg-og-kimes-meta">EXHIBITOR</span>
          </div>
        </div>
        <ul className="dg-list">
          <li>권장 사이즈: <code>1200×630</code> (Open Graph 표준)</li>
          <li>KIMES 로고는 우측 하단에 작게</li>
          <li>본문 메인 비주얼은 회사 자체 디자인</li>
          <li>JPG 또는 PNG 권장. 파일 크기 300KB 이하</li>
        </ul>
      </div>

      {/* §12.2.3 SNS 채널 운영 ------------------------------------------ */}
      <SectionHeading id="sns" title="SNS Channels" subtitle="SNS 채널 운영" />
      <ul className="dg-list">
        <li><strong>태그</strong> — 게시물에 KIMES 워드마크가 등장할 때 캡션에 <code>@kimes_official</code> 태그를 권장합니다.</li>
        <li><strong>해시태그</strong> — <code>#KIMES{year} #KIMES #의료기기전시회 #COEX</code></li>
        <li><strong>라이브 스트리밍</strong> — KIMES 로고가 노출되는 라이브는 사전 통보를 권장합니다 (의무 아님).</li>
      </ul>

      {/* §12.2.4 영상 콘텐츠 -------------------------------------------- */}
      <SectionHeading id="video" title="Video" subtitle="영상 콘텐츠" />
      <ul className="dg-list">
        <li><strong>인트로/아웃트로 등장</strong> — 영상 인트로·아웃트로에 KIMES 로고 등장 시 사전 협의를 권장합니다.</li>
        <li><strong>정적 워드마크 노출</strong> — 최소 1.5초 이상 노출하면 가독성이 확보됩니다.</li>
        <li><strong>모션 효과</strong> — 회전·스케일·페이드 정도만 사용하시면 됩니다. 빠른 글리치·플리커는 권장하지 않습니다.</li>
      </ul>

      {/* §12.2.5 명도 대비 ---------------------------------------------- */}
      <SectionHeading id="contrast" title="Contrast" subtitle="명도 대비" />
      <p className="dg-contrast-note">
        충분한 명도 대비를 유지해주세요. 자세한 배경별 워드마크 선택은 →{' '}
        <Link to="/logo#bg-use">/logo의 Background Use 격자</Link>를 참고하세요.
        KIMES Red 위에 검정·회사 컬러 글씨는 가독성이 떨어지므로 권장하지
        않습니다.
      </p>

      {/* §12.2.6 다크 모드 ---------------------------------------------- */}
      <SectionHeading id="darkmode" title="Dark Mode" subtitle="다크 모드" />
      <div className="dg-dark-grid">
        <div className="dg-dark-sample dg-dark-sample-light" aria-label="라이트 모드">
          <span className="dg-dark-tag">Light</span>
          <span className="dg-dark-wm dg-dark-wm-red">KIMES</span>
        </div>
        <div className="dg-dark-sample dg-dark-sample-dark" aria-label="다크 모드">
          <span className="dg-dark-tag">Dark</span>
          <span className="dg-dark-wm dg-dark-wm-white">KIMES</span>
        </div>
      </div>
      <p className="dg-dark-note">
        회사 홈페이지·앱이 다크 모드를 지원할 경우, KIMES 워드마크는 화이트
        버전으로 자동 전환되도록 권장합니다. 빨간 워드마크를 어두운 배경에
        그대로 두는 것은 권장하지 않습니다.
      </p>
    </PageShell>
  );
}

window.DigitalPage = DigitalPage;

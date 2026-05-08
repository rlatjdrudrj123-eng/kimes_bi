// Page placeholders. Each page is a thin wrapper around <PageShell> with
// a stub body that points to the spec section the real content will come
// from. Phase 2~4 commits replace each stub with the real page body.

const PageShell = window.PageShell;
const Link = window.Link;

function Stub({ sectionRef }) {
  return (
    <div className="stub-card">
      <div className="stub-icon" aria-hidden="true">●</div>
      <div className="stub-body">
        <div className="stub-title">준비 중</div>
        <p className="stub-desc">
          이 페이지의 본문은 명세 <code>{sectionRef}</code>에 따라 작성됩니다.
        </p>
        <Link to="/" className="stub-back">← 시작 페이지로</Link>
      </div>
    </div>
  );
}

// LandingPage는 components/LandingPage.jsx에서 정의 (§4 작업으로 분리).

// OverviewPage는 components/OverviewPage.jsx에서 정의 (§5 작업으로 분리).

// LogoPage는 components/LogoPage.jsx에서 정의 (§6 작업으로 분리).

// ColorPage는 components/ColorPage.jsx에서 정의 (§7 작업으로 분리).

// TypographyPage는 components/TypographyPage.jsx에서 정의 (§8 작업으로 분리).

// CoBrandingPage는 components/CoBrandingPage.jsx에서 정의 (§9 작업으로 분리).

// NotationPage는 components/NotationPage.jsx에서 정의 (§10 작업으로 분리).

// ApplicationsPage는 components/ApplicationsPage.jsx에서 정의 (§11 작업으로 분리).

// DigitalPage는 components/DigitalPage.jsx에서 정의 (§12 작업으로 분리).

function SpecialZonesIndex() {
  return (
    <PageShell eyebrow="09" title="특별관" toc={false}>
      <Stub sectionRef="§13" />
    </PageShell>
  );
}

function SpecialZoneMedicomtek() {
  return (
    <PageShell eyebrow="09.1" title="MedicomteK" toc={false}>
      <Stub sectionRef="§13" />
    </PageShell>
  );
}

function SpecialZoneBeautyDerma() {
  return (
    <PageShell eyebrow="09.2" title="BEAUTY&DERMA SEOUL" toc={false}>
      <Stub sectionRef="§13" />
    </PageShell>
  );
}

function SpecialZoneInspire() {
  return (
    <PageShell eyebrow="09.3" title="INSPIRE Digital Health" toc={false}>
      <Stub sectionRef="§13" />
    </PageShell>
  );
}

function PermissionsPage() {
  return (
    <PageShell eyebrow="10" title="권한·승인·라이선스" toc={false}>
      <Stub sectionRef="§14" />
    </PageShell>
  );
}

function FaqPage() {
  return (
    <PageShell eyebrow="11" title="자주 묻는 질문" toc={false}>
      <Stub sectionRef="§15" />
    </PageShell>
  );
}

function DownloadsPage() {
  return (
    <PageShell eyebrow="12" title="에셋 다운로드" toc={false}>
      <Stub sectionRef="§16" />
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell eyebrow="13" title="문의·신청" toc={false}>
      <Stub sectionRef="§17" />
    </PageShell>
  );
}

function ChangelogPage() {
  return (
    <PageShell eyebrow="14" title="변경 이력" toc={false}>
      <Stub sectionRef="§18" />
    </PageShell>
  );
}

function NotFoundPage() {
  return (
    <PageShell
      eyebrow="404"
      title="페이지를 찾을 수 없습니다"
      lede="이 주소에 해당하는 페이지가 없습니다."
      toc={false}
    >
      <div className="stub-card">
        <div className="stub-icon" aria-hidden="true">●</div>
        <div className="stub-body">
          <div className="stub-title">주소를 다시 확인해주세요.</div>
          <Link to="/" className="stub-back">← 시작 페이지로</Link>
        </div>
      </div>
    </PageShell>
  );
}

Object.assign(window, {
  // LandingPage:  별도 파일 components/LandingPage.jsx에서 직접 등록
  // OverviewPage: 별도 파일 components/OverviewPage.jsx에서 직접 등록
  // LogoPage:     별도 파일 components/LogoPage.jsx에서 직접 등록
  // ColorPage:    별도 파일 components/ColorPage.jsx에서 직접 등록
  LogoPage,
  ColorPage,
  // TypographyPage:  별도 파일 components/TypographyPage.jsx에서 직접 등록
  // CoBrandingPage:  별도 파일 components/CoBrandingPage.jsx에서 직접 등록
  // NotationPage:    별도 파일 components/NotationPage.jsx에서 직접 등록
  // ApplicationsPage: 별도 파일 components/ApplicationsPage.jsx에서 직접 등록
  // DigitalPage:     별도 파일 components/DigitalPage.jsx에서 직접 등록
  SpecialZonesIndex,
  SpecialZoneMedicomtek,
  SpecialZoneBeautyDerma,
  SpecialZoneInspire,
  PermissionsPage,
  FaqPage,
  DownloadsPage,
  ContactPage,
  ChangelogPage,
  NotFoundPage,
});

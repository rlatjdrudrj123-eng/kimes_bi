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

// NotationPage는 components/NotationPage.jsx에서 정의 (§9 Writing Style 통합 작업).

// ApplicationsPage는 components/ApplicationsPage.jsx에서 정의 (§10 작업으로 분리).
// /digital 페이지는 §6.2.3·§6.2.5와 정보 중복 + 디자이너 영역으로 통째로 제거.
// SNS 태그·해시태그만 §9 Writing Style의 SNS Tag 섹션으로 흡수.

// SpecialZones (Index + 3 detail) 는 components/SpecialZonesPage.jsx에서 정의 (§13).

// PermissionsPage는 components/PermissionsPage.jsx에서 정의 (§14 작업으로 분리).

// FaqPage는 components/FaqPage.jsx에서 정의 (§15 작업으로 분리).

// DownloadsPage는 components/DownloadsPage.jsx에서 정의 (§16 작업으로 분리).
// ContactPage는 components/ContactPage.jsx에서 정의 (§17 작업으로 분리).

function ChangelogPage() {
  return (
    <PageShell eyebrow="11" title="변경 이력" toc={false}>
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
  // NotationPage:    별도 파일 components/NotationPage.jsx에서 직접 등록
  // ApplicationsPage: 별도 파일 components/ApplicationsPage.jsx에서 직접 등록
  // (/co-branding 페이지: 디자이너 영역이라 통째로 제거 — Restricted Expressions만 /notation으로 흡수)
  // (/digital 페이지: §6.2.3·§6.2.5 정보 중복으로 통째로 제거 — SNS Tag만 /notation으로 흡수)
  // SpecialZones*: components/SpecialZonesPage.jsx에서 직접 등록 (4종)
  // PermissionsPage: 별도 파일 components/PermissionsPage.jsx에서 직접 등록
  // FaqPage: 별도 파일 components/FaqPage.jsx에서 직접 등록
  // DownloadsPage: 별도 파일 components/DownloadsPage.jsx에서 직접 등록
  // ContactPage: 별도 파일 components/ContactPage.jsx에서 직접 등록
  ChangelogPage,
  NotFoundPage,
});

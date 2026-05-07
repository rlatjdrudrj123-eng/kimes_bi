/* eslint-disable */
/**
 * Navigation — top nav, breadcrumbs, tabs, and pagination. CSS lives in
 * components/navigation.css. Each variant is a self-contained docs example.
 */

const useSiteLang = window.useSiteLang;
function trN(en, ko, lang) { return lang === 'ko' && ko ? ko : en; }

/* ---- Intro ---- */
function NavigationIntro() {
  const lang = useSiteLang();
  return (
    <section id="navigation" className="section">
      <div className="section-eyebrow">{trN('04 — Navigation', '04 — 내비게이션')}</div>
      <h2>{trN('Navigation', '내비게이션')}</h2>
      <p className="lede">
        {trN(
          'Wayfinding patterns: top nav, breadcrumbs, tabs, and pagination. All inherit brand color from the active theme scope.',
          '길찾기 패턴 — 상단 내비, 브레드크럼, 탭, 페이지네이션. 모두 활성 브랜드 테마에서 컬러를 상속받습니다.'
        )}
      </p>
    </section>
  );
}

/* ---- Top nav bar ---- */
function NavTopBar() {
  const lang = useSiteLang();
  const items = [
    { label: trN('Visit', '방문 안내'),         active: true },
    { label: trN('Exhibitors', '참가업체'),      active: false },
    { label: trN('Programs', '프로그램'),        active: false },
    { label: trN('Press', '프레스'),             active: false },
    { label: trN('Contact', '문의'),             active: false },
  ];
  return (
    <div id="navigation-topbar" className="subsection">
      <h3>{trN('04.1 — Top navigation', '04.1 — 상단 내비')}</h3>
      <p className="desc">
        {trN(
          'Primary site nav. Logo on the left, anchors centered, CTA pinned to the right. Active link gets a 2px brand-red underline.',
          '주 사이트 내비. 로고는 왼쪽, 앵커는 가운데, CTA는 오른쪽 고정. 활성 링크는 2px 브랜드 레드 밑줄.'
        )}
      </p>
      <div className="knav-topbar">
        <span className="knav-brand">KIMES</span>
        <ul className="knav-list">
          {items.map(it => (
            <li key={it.label}>
              <a className={`knav-link ${it.active ? 'is-active' : ''}`} href="#">{it.label}</a>
            </li>
          ))}
        </ul>
        <a className="knav-cta" href="#">{trN('Pre-register', '사전등록')}</a>
      </div>
    </div>
  );
}

/* ---- Breadcrumbs ---- */
function NavBreadcrumbs() {
  const lang = useSiteLang();
  const trail = [
    trN('Home', '홈'),
    trN('Exhibitors', '참가업체'),
    trN('Imaging', '영상진단'),
    trN('Booth A-101', '부스 A-101'),
  ];
  return (
    <div id="navigation-breadcrumbs" className="subsection">
      <h3>{trN('04.2 — Breadcrumbs', '04.2 — 브레드크럼')}</h3>
      <p className="desc">
        {trN(
          'Always present from level 2 onward. Last segment is the current page (no link). Separator: middle dot.',
          '레벨 2 이상에서 항상 노출. 마지막 항목은 현재 페이지(링크 없음). 구분자: 가운뎃점.'
        )}
      </p>
      <nav className="knav-bc" aria-label="Breadcrumb">
        {trail.map((seg, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="knav-bc-sep">·</span>}
            {i < trail.length - 1
              ? <a className="knav-bc-item" href="#">{seg}</a>
              : <span className="knav-bc-item is-current" aria-current="page">{seg}</span>}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}

/* ---- Tabs ---- */
function NavTabs() {
  const lang = useSiteLang();
  const [active, setActive] = React.useState(0);
  const tabs = [
    trN('Overview', '개요'),
    trN('Schedule', '일정'),
    trN('Speakers', '연사'),
    trN('Floor plan', '플로어 플랜'),
  ];
  return (
    <div id="navigation-tabs" className="subsection">
      <h3>{trN('04.3 — Tabs', '04.3 — 탭')}</h3>
      <p className="desc">
        {trN(
          'In-page section switcher. Active tab gets a 2px brand-red underline; surrounding tabs are muted.',
          '페이지 내 섹션 전환. 활성 탭은 2px 브랜드 레드 밑줄, 나머지는 톤 다운.'
        )}
      </p>
      <div className="knav-tabs" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t}
            role="tab"
            aria-selected={i === active}
            className={`knav-tab ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >{t}</button>
        ))}
      </div>
      <div className="knav-tab-body">
        {trN('Showing tab:', '활성 탭:')} <strong>{tabs[active]}</strong>
      </div>
    </div>
  );
}

/* ---- Pagination ---- */
function NavPagination() {
  const lang = useSiteLang();
  const [page, setPage] = React.useState(3);
  const total = 8;
  return (
    <div id="navigation-pagination" className="subsection">
      <h3>{trN('04.4 — Pagination', '04.4 — 페이지네이션')}</h3>
      <p className="desc">
        {trN(
          'For long lists — exhibitor directory, news archive, search results. Always show first/last and current ±1.',
          '긴 목록용 — 참가업체 디렉터리, 뉴스 아카이브, 검색 결과. 첫·마지막 페이지와 현재 ±1 항상 노출.'
        )}
      </p>
      <nav className="knav-page" aria-label="Pagination">
        <button className="knav-page-btn" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>‹</button>
        {Array.from({ length: total }).map((_, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              className={`knav-page-num ${n === page ? 'is-active' : ''}`}
              onClick={() => setPage(n)}
            >{n}</button>
          );
        })}
        <button className="knav-page-btn" onClick={() => setPage(Math.min(total, page + 1))} disabled={page === total}>›</button>
      </nav>
    </div>
  );
}

/* ---- Page wrapper ---- */
function Navigation() {
  return (
    <React.Fragment>
      <NavigationIntro />
      <NavTopBar />
      <NavBreadcrumbs />
      <NavTabs />
      <NavPagination />
    </React.Fragment>
  );
}

Object.assign(window, {
  Navigation,
  NavigationIntro,
  NavTopBar,
  NavBreadcrumbs,
  NavTabs,
  NavPagination,
});

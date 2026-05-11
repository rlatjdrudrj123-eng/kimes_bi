// Hash-based router. Routes use the form `#/path` (with leading slash).
// Bare hashes like `#admin` or `#edit` are intentionally ignored so the
// content-editor.js trigger keeps working without colliding with routing.

const { useState, useEffect } = React;

function parseHash() {
  const h = (location.hash || '').replace(/^#/, '');
  if (!h || h === '/') return '/';
  if (h.startsWith('/')) {
    // 라우트 매칭에는 query string 제거. 전체 hash는 location.hash에 그대로
    // 남아 있어 getRouteQuery()로 읽을 수 있음.
    const qIdx = h.indexOf('?');
    return qIdx === -1 ? h : h.slice(0, qIdx);
  }
  return null;
}

// 현재 hash의 query string을 키-값 객체로 파싱.
//   #/contact?type=logo  →  { type: 'logo' }
// /contact·/permissions 등 진입 의도(type)를 다른 페이지에서 받을 때 사용.
function getRouteQuery() {
  const h = location.hash || '';
  const qIdx = h.indexOf('?');
  if (qIdx === -1) return {};
  const out = {};
  for (const part of h.slice(qIdx + 1).split('&')) {
    if (!part) continue;
    const eq = part.indexOf('=');
    const k = eq === -1 ? part : part.slice(0, eq);
    const v = eq === -1 ? '' : part.slice(eq + 1);
    out[decodeURIComponent(k)] = decodeURIComponent(v);
  }
  return out;
}

function useHashRoute() {
  const [path, setPath] = useState(parseHash() || '/');
  useEffect(() => {
    function onChange() {
      const p = parseHash();
      if (p === null) return;
      setPath(p);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}

// Route table. Routes with a numeric `nav` value appear in the global
// header in that order. `cta: true` marks the "다운로드" CTA pinned to
// the right end of the header.
// v2027.1 §22.3: nav 라벨은 한글 단독. URL slug만 영문 유지.
const ROUTES = [
  { path: '/',                           page: 'LandingPage' },
  { path: '/overview',                   page: 'OverviewPage',           label: '한눈에 보기',  nav: 1 },
  { path: '/logo',                       page: 'LogoPage',               label: '로고',         nav: 2 },
  { path: '/color',                      page: 'ColorPage',              label: '컬러',         nav: 3 },
  { path: '/typography',                 page: 'TypographyPage',         label: '타이포그래피', nav: 4 },
  { path: '/notation',                   page: 'NotationPage',           label: '표기 규칙',    nav: 5 },
  { path: '/special-zones',              page: 'SpecialZonesIndex',      label: '특별관',       nav: 6 },
  { path: '/permissions',                page: 'PermissionsPage',        label: '권한·승인',    nav: 7 },
  { path: '/faq',                        page: 'FaqPage',                label: 'FAQ',          nav: 8 },
  { path: '/downloads',                  page: 'DownloadsPage',          label: '다운로드',     cta: true },
  { path: '/contact',                    page: 'ContactPage' },
  { path: '/changelog',                  page: 'ChangelogPage' },
];

function matchRoute(path) {
  return ROUTES.find(r => r.path === path) || null;
}

function Link({ to, children, className, ariaLabel, onClick, ...rest }) {
  return (
    <a
      href={`#${to}`}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
}

Object.assign(window, {
  useHashRoute,
  ROUTES,
  matchRoute,
  Link,
  getRouteQuery,
});

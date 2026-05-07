// Hash-based router. Routes use the form `#/path` (with leading slash).
// Bare hashes like `#admin` or `#edit` are intentionally ignored so the
// content-editor.js trigger keeps working without colliding with routing.

const { useState, useEffect } = React;

function parseHash() {
  const h = (location.hash || '').replace(/^#/, '');
  if (!h || h === '/') return '/';
  if (h.startsWith('/')) return h;
  return null;
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
// header in that order. `cta: true` marks the "자산 다운로드" CTA pinned
// to the right end of the header.
const ROUTES = [
  { path: '/',                           page: 'LandingPage' },
  { path: '/overview',                   page: 'OverviewPage',           label: '한눈에',      nav: 1 },
  { path: '/logo',                       page: 'LogoPage',               label: '로고',        nav: 2 },
  { path: '/color',                      page: 'ColorPage',              label: '컬러',        nav: 3 },
  { path: '/co-branding',                page: 'CoBrandingPage',         label: '함께쓰기',    nav: 4 },
  { path: '/notation',                   page: 'NotationPage',           label: '표기',        nav: 5 },
  { path: '/applications',               page: 'ApplicationsPage',       label: '적용예시',    nav: 6 },
  { path: '/digital',                    page: 'DigitalPage',            label: '디지털',      nav: 7 },
  { path: '/special-zones',              page: 'SpecialZonesIndex',      label: '특별관',      nav: 8 },
  { path: '/special-zones/medicomtek',   page: 'SpecialZoneMedicomtek' },
  { path: '/special-zones/beauty-derma', page: 'SpecialZoneBeautyDerma' },
  { path: '/special-zones/inspire',      page: 'SpecialZoneInspire' },
  { path: '/permissions',                page: 'PermissionsPage',        label: '권한',        nav: 9 },
  { path: '/faq',                        page: 'FaqPage',                label: 'FAQ',         nav: 10 },
  { path: '/typography',                 page: 'TypographyPage' },
  { path: '/downloads',                  page: 'DownloadsPage',          label: '자산 다운로드', cta: true },
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
});

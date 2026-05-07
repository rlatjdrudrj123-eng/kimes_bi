// Global app shell — header (§3.2), footer (§3.4), and page shell with
// optional sticky TOC (§3.3). Pages use <PageShell> to get the consistent
// title bar + body layout.

const { useState, useEffect } = React;
const Link = window.Link;
const KimesWordmark = window.KimesWordmark;

function Header() {
  const path = window.useHashRoute();
  const [open, setOpen] = useState(false);
  const items = window.ROUTES.filter(r => r.nav).sort((a, b) => a.nav - b.nav);
  const cta = window.ROUTES.find(r => r.cta);

  function isActive(itemPath) {
    if (path === itemPath) return true;
    if (itemPath !== '/' && path.startsWith(itemPath + '/')) return true;
    return false;
  }

  return (
    <header className="shell-header">
      <div className="shell-header-inner">
        <Link to="/" className="shell-logo brand-mark" ariaLabel={`${window.KIMES_EVENT.event.nameKo} BI 가이드 — 시작 페이지`}>
          <KimesWordmark height={20} />
          <span className="shell-logo-sub">{window.KIMES_EVENT.event.year} BI Guide</span>
        </Link>

        <nav className={`shell-nav ${open ? 'is-open' : ''}`} aria-label="주 메뉴">
          {items.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`shell-nav-link ${isActive(item.path) ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="shell-header-end">
          {cta && (
            <Link to={cta.path} className="shell-cta">
              {cta.label}
            </Link>
          )}
          <button
            type="button"
            className="shell-burger"
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span aria-hidden="true">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  // 푸터 표기는 components/config.js의 KIMES_EVENT를 단일 출처로 사용.
  const { event, guide, contact } = window.KIMES_EVENT;
  return (
    <footer className="shell-footer">
      <div className="shell-footer-inner">
        <div className="shell-footer-col">
          <div className="ft-strong">{event.nameKo} BI 가이드</div>
          <div className="ft-meta">{guide.version} · 최종 갱신 {guide.updatedAt}</div>
          <Link to="/changelog" className="ft-link">변경 이력 보기 →</Link>
        </div>
        <div className="shell-footer-col">
          <div>대표 문의: <a href={`mailto:${contact.email}`}>{contact.email}</a></div>
          <div>대표 전화: <a href={`tel:${contact.tel.replace(/-/g,'')}`}>{contact.tel}</a></div>
          <div className="ft-meta">승인 검토: 영업일 3–5일</div>
        </div>
        <div className="shell-footer-col">
          <div>주최: {event.organizationKo}</div>
          <div>공식 사이트: <a href="https://kimes.kr" target="_blank" rel="noopener noreferrer">kimes.kr</a></div>
        </div>
      </div>
      <div className="shell-footer-legal">
        © {event.organizerEn}. KIMES, MedicomteK, Beauty&Derma Seoul, INSPIRE Digital Health는 {event.organizerEn}의 등록 상표입니다. 무단 사용 시 법적 조치를 받을 수 있습니다.
      </div>
    </footer>
  );
}

// PageShell — every page wraps its body in this. §22.5 영문/한글 패턴:
// `title` = English H1 (Montserrat 800/900, big), `subtitle` = Korean sub
// (Pretendard 500, KIMES Gray, smaller). `eyebrow` is the small section
// number above the title (e.g., "02"). `lede` is the intro paragraph.
// `toc` defaults to true; landing/stub pages pass false. TOC scans the
// rendered DOM for H2s on mount.
function PageShell({ eyebrow, title, subtitle, lede, children, toc = true }) {
  return (
    <div className="page-shell">
      <header className="page-header">
        {eyebrow && <div className="page-eyebrow">{eyebrow}</div>}
        <h1 className="page-title">{title}</h1>
        {subtitle && <div className="page-subtitle">{subtitle}</div>}
        {lede && <p className="page-lede">{lede}</p>}
      </header>
      <div className={`page-body ${toc ? 'with-toc' : ''}`}>
        <article className="page-content">{children}</article>
        {toc && <TocSidebar />}
      </div>
    </div>
  );
}

function TocSidebar() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const article = document.querySelector('.page-content');
    if (!article) return;
    const heads = Array.from(article.querySelectorAll('h2'));
    const list = heads.map((h, i) => {
      if (!h.id) {
        const slug = (h.textContent || '').trim().replace(/\s+/g, '-').toLowerCase();
        h.id = slug || `section-${i}`;
      }
      return { id: h.id, text: h.textContent };
    });
    setItems(list);
  }, []);
  if (!items.length) return null;
  return (
    <aside className="page-toc" aria-label="이 페이지 안 목차">
      <div className="toc-head">이 페이지 안</div>
      <ol>
        {items.map(it => (
          <li key={it.id}><a href={`#${it.id}`}>{it.text}</a></li>
        ))}
      </ol>
    </aside>
  );
}

Object.assign(window, {
  Header,
  Footer,
  PageShell,
  TocSidebar,
});

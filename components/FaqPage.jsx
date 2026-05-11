// §13 — /faq. 사무국이 받는 같은 질문을 미리 답해두는 페이지. 검색창 +
// 카테고리 필터 + 아코디언.
//
// 데이터 출처: content/faq.json — 어드민(/admin/)에서 추가/수정/삭제 가능.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;
const { useState, useMemo } = React;

const FALLBACK = { categories: [{ id: 'all', label: '전체' }], items: [] };

function FaqPage() {
  const data = (window.CONTENT && window.CONTENT.faq) || FALLBACK;
  const FAQS = data.items || [];
  const CATEGORIES = data.categories || FALLBACK.categories;

  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return FAQS.filter(f => {
      if (cat !== 'all' && f.cat !== cat) return false;
      if (!s) return true;
      return (f.q + ' ' + f.a).toLowerCase().includes(s);
    });
  }, [search, cat, FAQS]);

  return (
    <PageShell
      eyebrow="08"
      title="FAQ"
      subtitle="자주 묻는 질문"
      lede={`사무국이 받는 같은 질문 ${FAQS.length}개를 미리 답해두었습니다. 위 검색창과 카테고리 필터로 빠르게 찾을 수 있습니다.`}
    >
      {/* §15.2.1 검색 + 필터 -------------------------------------------- */}
      <div className="fq-search">
        <input
          type="search"
          className="fq-search-input"
          placeholder="질문을 검색해주세요 (예: 색, 로고, 굿즈)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="질문 검색"
        />
        {search && (
          <button type="button" className="fq-search-clear" onClick={() => setSearch('')} aria-label="검색 지우기">
            ✕
          </button>
        )}
      </div>

      <div className="fq-filters" role="tablist" aria-label="카테고리 필터">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={cat === c.id}
            className={`fq-filter ${cat === c.id ? 'is-active' : ''}`}
            onClick={() => setCat(c.id)}
          >
            {c.label}
            {c.id !== 'all' && (
              <span className="fq-filter-count">{FAQS.filter(f => f.cat === c.id).length}</span>
            )}
          </button>
        ))}
      </div>

      {/* §15.2.2 아코디언 ----------------------------------------------- */}
      <div className="fq-list">
        {filtered.length === 0 ? (
          <p className="fq-empty">
            검색 결과가 없습니다. 다른 키워드로 시도해보시거나 →{' '}
            <a href={`mailto:${window.KIMES_EVENT.contact.email}`}>
              {window.KIMES_EVENT.contact.email}
            </a>
            로 문의해주세요.
          </p>
        ) : (
          filtered.map(f => (
            <details
              key={f.id}
              className="fq-item"
              open={open === f.id}
              onToggle={e => e.target.open && setOpen(f.id)}
            >
              <summary className="fq-item-q">
                <span className="fq-item-num">Q{f.id}.</span>
                <span className="fq-item-text">{f.q}</span>
                <span className="fq-item-icon" aria-hidden="true">+</span>
              </summary>
              <div className="fq-item-a">{f.a}</div>
            </details>
          ))
        )}
      </div>

      <p className="fq-foot">
        가이드에 없는 사용 케이스가 있다면 → <Link to="/contact">/contact</Link>{' · '}
        <a href={`mailto:${window.KIMES_EVENT.contact.email}`}>
          {window.KIMES_EVENT.contact.email}
        </a>
      </p>
    </PageShell>
  );
}

window.FaqPage = FaqPage;

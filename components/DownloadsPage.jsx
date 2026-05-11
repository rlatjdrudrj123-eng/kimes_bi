// §14 — /downloads. 가이드 전반에서 흩어져 있는 자산을 한 페이지에 모아
// 한 번에 다운로드. 통합 패키지 + 카테고리별 + 사용 약관 동의.
//
// 데이터는 content/downloads.json 단일 출처. 어드민(/admin/)에서 status
// 토글 + 항목별 URL 편집 가능. 빈 url은 disabled (Coming Soon).

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;
const { useState } = React;

// JSON 로드 실패 시 폴백 (빈 구조). 정상 흐름에서는 _loader.js가 CONTENT_READY
// 이후 React 마운트하므로 window.CONTENT.downloads 항상 존재.
const FALLBACK = { status: 'pending', bundle: {}, categories: [] };

function DownloadsPage() {
  const data = (window.CONTENT && window.CONTENT.downloads) || FALLBACK;
  const status = data.status || 'pending';
  const bundle = data.bundle || {};
  const categories = data.categories || [];
  const pending = status !== 'ready';

  const [agreed, setAgreed] = useState(false);
  const [openCat, setOpenCat] = useState(categories[0] && categories[0].id);

  return (
    <PageShell
      eyebrow="09"
      title="Downloads"
      subtitle="에셋 다운로드"
      lede="가이드 전반에 흩어져 있는 자산을 한 페이지에 모았습니다. 통합 패키지 한 번에 받거나 카테고리별로 골라 받으실 수 있습니다."
    >
      {/* 통합 패키지 ---------------------------------------------------- */}
      <SectionHeading id="bundle" title="All-in-One Bundle" subtitle="통합 패키지" />
      <article className="dl-bundle">
        <div className="dl-bundle-body">
          <h3 className="dl-bundle-title">{bundle.title || 'KIMES 2027 BI 패키지'}</h3>
          <p className="dl-bundle-desc">{bundle.desc}</p>
          <div className="dl-bundle-meta">
            {bundle.ext  && <span className="dl-bundle-ext">{bundle.ext}</span>}
            {bundle.size && <span className="dl-bundle-size">{bundle.size}</span>}
          </div>
        </div>
        <div className="dl-bundle-action">
          {(pending || !bundle.url) ? (
            <button type="button" className="btn btn-primary btn-lg" disabled title="Coming soon">
              다운로드
            </button>
          ) : (
            <a
              href={bundle.url}
              className={`btn btn-primary btn-lg ${agreed ? '' : 'is-disabled'}`}
              download
              aria-disabled={!agreed}
              onClick={e => { if (!agreed) e.preventDefault(); }}
            >
              다운로드
            </a>
          )}
          {(pending || !bundle.url) && <div className="dl-bundle-pending">Coming Soon</div>}
        </div>
      </article>

      {/* 사용 약관 동의 ------------------------------------------------- */}
      <label className="dl-terms">
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
        />
        <span>
          위 자산은 KIMES {window.KIMES_EVENT.year} 참가 사실의 표기 목적으로만
          사용하며, 가이드의 권한 범위(→ <Link to="/permissions">/permissions</Link>)
          를 준수할 것에 동의합니다.
        </span>
      </label>

      {/* 카테고리별 다운로드 (아코디언) --------------------------------- */}
      <SectionHeading id="categories" title="By Category" subtitle="카테고리별" />
      <div className="dl-cats">
        {categories.map(cat => (
          <details
            key={cat.id}
            className="dl-cat"
            open={openCat === cat.id}
            onToggle={e => e.target.open && setOpenCat(cat.id)}
          >
            <summary className="dl-cat-head">
              <span className="dl-cat-label">{cat.label}</span>
              <span className="dl-cat-count">{cat.items.length}</span>
              <span className="dl-cat-icon" aria-hidden="true">+</span>
            </summary>
            <ul className="dl-cat-list">
              {cat.items.map((item, i) => (
                <li key={i} className="dl-cat-item">
                  <div className="dl-cat-item-name">{item.name}</div>
                  <div className="dl-cat-item-meta">
                    {item.size && <span className="dl-cat-item-size">{item.size}</span>}
                    {item.external && item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                        Open ↗
                      </a>
                    ) : (pending || !item.url) ? (
                      <button type="button" className="btn btn-sm btn-outline" disabled title="Coming soon">
                        다운로드
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        className={`btn btn-sm btn-outline ${agreed ? '' : 'is-disabled'}`}
                        download
                        aria-disabled={!agreed}
                        onClick={e => { if (!agreed) e.preventDefault(); }}
                      >
                        다운로드
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      {/* §16.2.4 변경 이력 링크 ----------------------------------------- */}
      <p className="dl-changelog">
        자산이 갱신되었습니다. 변경 이력 보기 → <Link to="/changelog">/changelog</Link>
      </p>
    </PageShell>
  );
}

window.DownloadsPage = DownloadsPage;

// §10 — /downloads (v2027.1). 통합 패키지 + 카테고리별. 데이터:
// content/downloads.json. status·URL은 어드민 편집.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;
const { useState } = React;

const FALLBACK = { status: 'pending', bundle: {}, categories: [] };

function DownloadsPage() {
  const data = (window.CONTENT && window.CONTENT.downloads) || FALLBACK;
  const status = data.status || 'pending';
  const bundle = data.bundle || {};
  const categories = data.categories || [];
  const pending = status !== 'ready';
  const releaseLabel = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.releaseLabel) || '행사 D-60 공개 예정';

  const [agreed, setAgreed] = useState(false);
  const [openCat, setOpenCat] = useState(categories[0] && categories[0].id);

  return (
    <PageShell
      title="다운로드"
      lede="자산 패키지 통합 다운로드 + 카테고리별 다운로드."
    >
      {/* 통합 패키지 ---------------------------------------------------- */}
      <SectionHeading id="bundle" title="통합 패키지" />
      <article className="dl-bundle">
        <div className="dl-bundle-body">
          <h3 className="dl-bundle-title">{bundle.title || 'KIMES 2027 BI 패키지'}</h3>
          <p className="dl-bundle-desc">{bundle.desc}</p>
          <div className="dl-bundle-meta">
            {bundle.ext  && <span className="dl-bundle-ext">{bundle.ext}</span>}
            {bundle.size && <span className="dl-bundle-size">{bundle.size}</span>}
            <span className="dl-bundle-release">{releaseLabel}</span>
          </div>
        </div>
        <div className="dl-bundle-action">
          {(pending || !bundle.url) ? (
            <button type="button" className="btn btn-primary btn-lg" disabled title={releaseLabel}>
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
          {(pending || !bundle.url) && <div className="dl-bundle-pending">Coming Soon — {releaseLabel}</div>}
        </div>
      </article>

      {/* 사용 약관 동의 (Tier 1) ------------------------------------------------- */}
      <label className="dl-terms">
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
        />
        <span>
          본 자산은 KIMES {window.KIMES_EVENT.event.year} 참가 표기 목적에
          한해 사용. 가이드의 권한 매트릭스 (→{' '}
          <Link to="/permissions">/permissions §8.1</Link>) 준수 (Tier 1).
        </span>
      </label>

      {/* 카테고리별 (아코디언) --------------------------------- */}
      <SectionHeading id="categories" title="카테고리별" />
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
                        열기 ↗
                      </a>
                    ) : (pending || !item.url) ? (
                      <button type="button" className="btn btn-sm btn-outline" disabled title={releaseLabel}>
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

      <p className="dl-changelog">
        자산 갱신 이력 → <Link to="/changelog">/changelog</Link>
      </p>
    </PageShell>
  );
}

window.DownloadsPage = DownloadsPage;

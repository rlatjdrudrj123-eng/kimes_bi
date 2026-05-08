// §16 — /downloads. 가이드 전반에서 흩어져 있는 자산을 한 페이지에 모아
// 한 번에 다운로드. 통합 패키지 + 카테고리별 + 사용 약관 동의.
//
// 명세 §16.2.1~§16.2.4.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;
const { useState } = React;

// 카테고리별 자산 데이터
const CATEGORIES = [
  {
    id: 'logos',
    label: 'Logos / 로고',
    items: [
      { name: 'KIMES 워드마크 (4버전 × 4포맷)',         file: 'kimes-wordmark-pack.zip', size: '약 8 MB' },
      { name: 'MedicomteK 워드마크',                     file: 'medicomtek-wordmark.zip', size: '약 2 MB' },
      { name: 'BEAUTY&DERMA SEOUL 워드마크',            file: 'beauty-derma-seoul.zip',  size: '약 2 MB' },
      { name: 'INSPIRE Digital Health 워드마크',        file: 'inspire-digital-health.zip', size: '약 2 MB' },
    ],
  },
  {
    id: 'colors',
    label: 'Colors / 컬러',
    items: [
      { name: 'Adobe Swatch (Illustrator·Photoshop·InDesign)', file: 'kimes-colors.ase',           size: '12 KB' },
      { name: 'Sketch 팔레트',                                  file: 'kimes-colors.sketchpalette', size: '8 KB' },
      { name: 'Figma 라이브러리 링크',                          external: 'https://figma.com',     size: '외부' },
      { name: 'CSS·SCSS 변수 스니펫',                           file: 'kimes-colors.css',           size: '4 KB' },
    ],
  },
  {
    id: 'fonts',
    label: 'Fonts / 서체',
    items: [
      { name: 'Montserrat (Google Fonts)',                                external: 'https://fonts.google.com/specimen/Montserrat',           size: '외부' },
      { name: 'Pretendard (GitHub)',                                       external: 'https://github.com/orioncactus/pretendard/releases/latest', size: '외부' },
    ],
  },
  {
    id: 'templates',
    label: 'Templates / 템플릿',
    items: [
      { name: '보도자료 템플릿 (한·영)',                file: 'press-template-ko-en.docx', size: '120 KB' },
      { name: '이메일 서명 배너 4종',                   file: 'email-signature-pack.zip',  size: '320 KB' },
      { name: '회사 홈페이지 배너 (1920·1200·모바일)',   file: 'web-banner-pack.zip',       size: '1.2 MB' },
      { name: 'SNS 카드 (1:1, 4:5, 9:16, OG)',          file: 'sns-card-pack.zip',         size: '1.5 MB' },
      { name: '카탈로그·브로셔 표지 (A4 / 레터)',        file: 'catalog-cover.zip',         size: '480 KB' },
    ],
  },
  {
    id: 'docs',
    label: 'Documents / 문서',
    items: [
      { name: 'BI 가이드 PDF 전체 (인쇄용)',           file: 'kimes-bi-guide.pdf',                size: '약 12 MB' },
      { name: '권한·승인 신청서',                       file: 'permission-application.docx',       size: '60 KB' },
      { name: 'MedicomteK 특별관 가이드 PDF',           file: 'medicomtek-special-zone-guide.pdf', size: '약 4 MB' },
      { name: 'BEAUTY&DERMA SEOUL 특별관 가이드 PDF',   file: 'beauty-derma-seoul-guide.pdf',      size: '약 4 MB' },
      { name: 'INSPIRE 특별관 가이드 PDF',              file: 'inspire-special-zone-guide.pdf',    size: '약 4 MB' },
    ],
  },
];

function DownloadsPage() {
  const [agreed, setAgreed] = useState(false);
  const [openCat, setOpenCat] = useState('logos');
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';
  const pending = assetStatus !== 'ready';

  return (
    <PageShell
      eyebrow="12"
      title="Downloads"
      subtitle="에셋 다운로드"
      lede="가이드 전반에 흩어져 있는 자산을 한 페이지에 모았습니다. 통합 패키지 한 번에 받거나 카테고리별로 골라 받으실 수 있습니다."
    >
      {/* §16.2.1 통합 패키지 -------------------------------------------- */}
      <SectionHeading id="bundle" title="All-in-One Bundle" subtitle="통합 패키지" />
      <article className="dl-bundle">
        <div className="dl-bundle-body">
          <h3 className="dl-bundle-title">KIMES 2027 BI 패키지</h3>
          <p className="dl-bundle-desc">
            모든 로고 + 컬러 팔레트 + 폰트 안내 + 표기 가이드 PDF
          </p>
          <div className="dl-bundle-meta">
            <span className="dl-bundle-ext">.zip</span>
            <span className="dl-bundle-size">약 28 MB</span>
          </div>
        </div>
        <div className="dl-bundle-action">
          {pending ? (
            <button type="button" className="btn btn-primary btn-lg" disabled title="Coming soon">
              다운로드
            </button>
          ) : (
            <a
              href="/assets/kimes-2027-bi-package.zip"
              className={`btn btn-primary btn-lg ${agreed ? '' : 'is-disabled'}`}
              download
              aria-disabled={!agreed}
              onClick={e => { if (!agreed) e.preventDefault(); }}
            >
              다운로드
            </a>
          )}
          {pending && <div className="dl-bundle-pending">Coming Soon</div>}
        </div>
      </article>

      {/* §16.2.3 사용 약관 동의 ----------------------------------------- */}
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

      {/* §16.2.2 카테고리별 다운로드 (아코디언) ------------------------- */}
      <SectionHeading id="categories" title="By Category" subtitle="카테고리별" />
      <div className="dl-cats">
        {CATEGORIES.map(cat => (
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
                    {item.external ? (
                      <a href={item.external} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                        Open ↗
                      </a>
                    ) : pending ? (
                      <button type="button" className="btn btn-sm btn-outline" disabled title="Coming soon">
                        다운로드
                      </button>
                    ) : (
                      <a
                        href={`/assets/downloads/${item.file}`}
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

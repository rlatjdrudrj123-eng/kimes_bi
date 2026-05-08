// §10 — /applications. 디자인 인력이 없는 영세 회사도 양식만 받아 회사 정보·
// 부스 번호만 채우면 되는 5종 자료 갤러리. 카테고리 필터 X.
//
// 데이터 출처: content/downloads.json의 applications 배열 (어드민 편집 가능).
// status 토글 + 항목 url 채우기로 활성화. 빈 url은 Coming Soon disabled.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;

const FALLBACK = { status: 'pending', applications: [] };

function ApplicationsPage() {
  const data = (window.CONTENT && window.CONTENT.downloads) || FALLBACK;
  const status = data.status || 'pending';
  const tiles = data.applications || [];

  return (
    <PageShell
      eyebrow="06"
      title="Applications"
      subtitle="적용 예시 갤러리"
      lede="디자인 인력이 없는 회사도 양식만 받아서 회사 정보·부스 번호만 채우면 됩니다. KIMES 표기가 정확히 적용된 자료 5종을 양식으로 제공합니다."
    >
      <div className="ap-gallery">
        {tiles.map(t => <TileCard key={t.id} tile={t} status={status} />)}
      </div>
    </PageShell>
  );
}

function TileCard({ tile, status }) {
  const disabled = status !== 'ready' || !tile.url;
  return (
    <article className="ap-tile">
      <div className="ap-tile-preview" aria-label={`${tile.title} 미리보기`}>
        <span className="ap-tile-preview-label">{tile.title}</span>
      </div>
      <div className="ap-tile-body">
        <h3 className="ap-tile-title">{tile.title}</h3>
        <p className="ap-tile-situation">{tile.situation}</p>
        <dl className="ap-tile-meta">
          <div className="ap-tile-meta-row">
            <dt>형식</dt>
            <dd>{tile.format}</dd>
          </div>
          <div className="ap-tile-meta-row">
            <dt>호환</dt>
            <dd>{tile.compat}</dd>
          </div>
        </dl>
        {disabled ? (
          <button type="button" className="btn btn-sm btn-outline" disabled title="Coming soon">
            다운로드
          </button>
        ) : (
          <a href={tile.url} className="btn btn-sm btn-outline" download>
            다운로드
          </a>
        )}
        {disabled && <div className="ap-tile-pending">Coming Soon</div>}
      </div>
    </article>
  );
}

window.ApplicationsPage = ApplicationsPage;

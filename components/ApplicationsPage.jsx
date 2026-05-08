// §10 — /applications. 디자인 인력이 없는 영세 회사도 양식만 받아 회사 정보·
// 부스 번호만 채우면 되는 5종 자료 갤러리. 카테고리 필터 X (5종이라 불필요).
//
// 이전 17종 갤러리에서 5종으로 압축. 제거 사유:
//   - §9 /co-branding 제거 결정 사항 (명함·초청장·이메일 서명·부스 디테일)
//   - §12 /digital 제거 결정 사항 (홈페이지 팝업·구글 검색 광고)
//   - 빈도 / 사무국 영역 (행사 안내 포스터·보도자료 워드 템플릿·리플렛)
// 진짜 사용자(디자인 역량 없는 영세 업체) 페르소나 기준으로 양식 다운로드
// 가치 있는 자료에 집중.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;

// 5종 — 영세 업체가 양식만 받아 채워 쓸 수 있는 자료.
const TILES = [
  {
    id: 'invite-card',
    title: '마케팅 초청 카드',
    situation: '이메일·SNS·카톡으로 고객·파트너에게 KIMES 부스 안내',
    format: '양식 받아 회사명·부스 번호 채워 사용',
    compat: '이메일 첨부 · 인스타 · 카톡 공유',
    file: 'invite-card.zip',
  },
  {
    id: 'booth-intro',
    title: '부스 소개 카드',
    situation: '부스 비치·고객 배포용 한 장 카드',
    format: 'A4·A5 양식',
    compat: '인쇄 + 디지털 두 용도',
    file: 'booth-intro-card.zip',
  },
  {
    id: 'sns-card',
    title: 'SNS 카드 양식',
    situation: 'Instagram · LinkedIn · KakaoTalk 게시물',
    format: '1:1, 4:5, 9:16(스토리) 3종 묶음',
    compat: '모든 SNS 채널',
    file: 'sns-card-pack.zip',
  },
  {
    id: 'poster',
    title: '공식 포스터 (세로형)',
    situation: '부스 · 회사 홈페이지 · 사무실 게시',
    format: 'A2 · A3 세로형 (KIMES 사무국 제작)',
    compat: '인쇄 + 디지털',
    file: 'official-poster.zip',
  },
  {
    id: 'web-kv',
    title: '웹용 배너 KV',
    situation: '회사 홈페이지·SNS·디지털 광고에 합성·게시',
    format: '가로(1920×400, 1200×300) / 정방(800·1080) / 세로(600×800, 720×960)',
    compat: '모든 디지털 채널',
    file: 'web-banner-kv.zip',
  },
];

function ApplicationsPage() {
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';

  return (
    <PageShell
      eyebrow="06"
      title="Applications"
      subtitle="적용 예시 갤러리"
      lede="디자인 인력이 없는 회사도 양식만 받아서 회사 정보·부스 번호만 채우면 됩니다. KIMES 표기가 정확히 적용된 자료 5종을 양식으로 제공합니다."
    >
      <div className="ap-gallery">
        {TILES.map(t => <TileCard key={t.id} tile={t} assetStatus={assetStatus} />)}
      </div>
    </PageShell>
  );
}

function TileCard({ tile, assetStatus }) {
  const pending = assetStatus !== 'ready';
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
        {pending ? (
          <button type="button" className="btn btn-sm btn-outline" disabled title="Coming soon">
            {tile.file}
          </button>
        ) : (
          <a href={`/assets/applications/${tile.file}`} className="btn btn-sm btn-outline" download>
            {tile.file}
          </a>
        )}
        {pending && <div className="ap-tile-pending">Coming Soon</div>}
      </div>
    </article>
  );
}

window.ApplicationsPage = ApplicationsPage;

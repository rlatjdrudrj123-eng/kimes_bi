// §11 — /applications. 적용 예시 갤러리. 참가업체가 자기 자료를 만들 때
// 참고할 수 있는 실제 케이스 16종 + 카테고리 필터.
//
// 명세 §11.2.1 필터 + §11.2.2 갤러리 16종 + §11.2.3 각 타일 디테일 다운로드.
// 자산은 status pending 시 disabled, ready 시 다운로드 링크 작동.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const { useState } = React;

// 16종 — 카테고리 5개. 사용 상황 한 줄 (디자이너 언어 회피, §22.11).
const TILES = [
  // 인쇄
  { id: 'press-tpl',  cat: 'print',   title: '보도자료 워드 템플릿 (한·영)', situation: '보도자료 헤더·본문·보일러플레이트 표준', file: 'press-template.docx' },
  { id: 'card',       cat: 'print',   title: '명함 옆면 표기 양식',           situation: '행사 기간 한정 명함 옆면 KIMES 2027 EXHIBITOR', file: 'business-card.ai' },
  { id: 'invite',     cat: 'print',   title: '초청장 (한·영 양면)',           situation: '회사 부스 초청장. 회사 로고 메인',           file: 'invitation.ai' },
  { id: 'leaflet',    cat: 'print',   title: '리플렛 표지 양식',              situation: '주력 제품 리플렛에 KIMES 표기 위치',         file: 'leaflet-cover.ai' },
  { id: 'poster',     cat: 'print',   title: '행사 안내 포스터 (사내 게시)',  situation: '회사 사무실 게시 — 직원 안내용',             file: 'office-poster.ai' },
  // 디지털
  { id: 'email-sig',  cat: 'digital', title: '이메일 서명 배너 4종',          situation: 'Outlook · Gmail · Apple Mail · 모바일 호환', file: 'email-signature.zip' },
  { id: 'web-banner', cat: 'digital', title: '회사 홈페이지 KIMES 배너',       situation: '데스크톱 1920×400 / 모바일 750×400',         file: 'web-banner.zip' },
  { id: 'web-popup',  cat: 'digital', title: '회사 홈페이지 팝업',             situation: '600×400 알림 팝업 — 행사 1-2개월 전 노출',   file: 'web-popup.png' },
  { id: 'google-ad',  cat: 'digital', title: '구글 검색 광고 텍스트 양식',     situation: '검색 광고 헤드라인·디스크립션 권장 카피',     file: 'google-ad.txt' },
  // 부스
  { id: 'booth-sign', cat: 'booth',   title: '부스 헤더 사이니지 3종',         situation: '가로 4m · 6m · 8m 부스 폭별',                file: 'booth-signage.zip' },
  { id: 'booth-card', cat: 'booth',   title: '부스 명함꽂이 표기',             situation: '명함꽂이 옆면 KIMES 2027 EXHIBITOR',         file: 'booth-cardholder.ai' },
  { id: 'booth-vid',  cat: 'booth',   title: '부스 영상 인트로 (3초)',         situation: '부스 모니터·LED 인트로 — 정적 워드마크만',   file: 'booth-video-intro.mp4' },
  // SNS
  { id: 'ig-feed',    cat: 'sns',     title: 'Instagram 피드 (1:1, 4:5)',     situation: 'Instagram·LinkedIn 피드 게시물',             file: 'instagram-feed.zip' },
  { id: 'ig-story',   cat: 'sns',     title: 'Instagram Story (9:16)',        situation: '24시간 노출용 스토리 카드',                   file: 'instagram-story.zip' },
  { id: 'linkedin',   cat: 'sns',     title: 'LinkedIn 회사 페이지 헤더',      situation: 'LinkedIn 커버 1128×191 — KIMES 참가 시즌',   file: 'linkedin-cover.png' },
  { id: 'kakao',      cat: 'sns',     title: 'KakaoTalk 채널 커버',            situation: '카카오 채널 커버 1080×360',                   file: 'kakao-cover.png' },
  // 영상
  { id: 'video-end',  cat: 'video',   title: '영상 엔딩 카드 (5초)',           situation: '영상 끝 KIMES 참가 표기 카드 5초',           file: 'video-endcard.mp4' },
];

const FILTERS = [
  { id: 'all',     label: 'All / 전체' },
  { id: 'print',   label: 'Print / 인쇄' },
  { id: 'digital', label: 'Digital / 디지털' },
  { id: 'booth',   label: 'Booth / 부스' },
  { id: 'sns',     label: 'SNS' },
  { id: 'video',   label: 'Video / 영상' },
];

function ApplicationsPage() {
  const [filter, setFilter] = useState('all');
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';

  const filtered = filter === 'all' ? TILES : TILES.filter(t => t.cat === filter);

  return (
    <PageShell
      eyebrow="07"
      title="Applications"
      subtitle="적용 예시 갤러리"
      lede="말로 설명하는 것보다 보여주는 게 빠릅니다. 참가업체가 자기 자료를 만들 때 직접 참고할 수 있는 실제 적용 예시 17종을 카테고리별로 정리했습니다."
    >
      {/* §11.2.1 필터 ---------------------------------------------------- */}
      <div className="ap-filters" role="tablist" aria-label="카테고리 필터">
        {FILTERS.map(f => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={filter === f.id}
            className={`ap-filter ${filter === f.id ? 'is-active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
            {f.id !== 'all' && (
              <span className="ap-filter-count">
                {TILES.filter(t => t.cat === f.id).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* §11.2.2 갤러리 ------------------------------------------------- */}
      <div className="ap-gallery">
        {filtered.map(t => <TileCard key={t.id} tile={t} assetStatus={assetStatus} />)}
      </div>

      {filtered.length === 0 && (
        <p className="ap-empty">해당 카테고리에 등록된 사례가 없습니다.</p>
      )}
    </PageShell>
  );
}

function TileCard({ tile, assetStatus }) {
  const pending = assetStatus !== 'ready';
  return (
    <article className="ap-tile">
      <div className="ap-tile-preview" aria-label={`${tile.title} 미리보기`}>
        <span className="ap-tile-cat">{categoryLabel(tile.cat)}</span>
      </div>
      <div className="ap-tile-body">
        <h3 className="ap-tile-title">{tile.title}</h3>
        <p className="ap-tile-situation">{tile.situation}</p>
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

function categoryLabel(cat) {
  const map = { print: '인쇄', digital: '디지털', booth: '부스', sns: 'SNS', video: '영상' };
  return map[cat] || cat;
}

window.ApplicationsPage = ApplicationsPage;

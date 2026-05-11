/* ===========================================================================
 * Content loader (어드민 편집 가능 4 영역)
 * ---------------------------------------------------------------------------
 * 어드민(/admin/ Sveltia CMS)에서 편집하는 4 JSON을 병렬 fetch 후
 *   window.CONTENT[<name>] = {...}
 * 로 노출. index.html은 window.CONTENT_READY를 await한 다음 React를 마운트.
 *
 * downloads.json의 status 값은 부수 효과로 window.KIMES_EVENT.assets.status
 * 에 동기화 — 어드민에서 status 토글 시 사이트 전체 다운로드 버튼이
 * 일괄 활성화/비활성화됨.
 * ========================================================================= */

(function () {
  const SHARED_FILES = [
    'downloads',
    'faq',
    'permissions',
    'special-zones',
  ];

  window.CONTENT = {};
  window.CONTENT_READY = Promise.all(
    SHARED_FILES.map(name =>
      fetch(`content/${name}.json`, { cache: 'no-store' })
        .then(r => {
          if (!r.ok) throw new Error(`content/${name}.json: HTTP ${r.status}`);
          return r.json();
        })
        .then(json => {
          window.CONTENT[name] = json;
          if (name === 'downloads' && json.status &&
              window.KIMES_EVENT && window.KIMES_EVENT.assets) {
            window.KIMES_EVENT.assets.status = json.status;
          }
        })
        .catch(err => {
          // 한 파일이 실패해도 나머지는 로드되도록 — 페이지별 FALLBACK이 빈
          // 구조를 채워서 화면은 깨지지 않음.
          console.warn('[content-loader]', err.message || err);
        })
    )
  ).then(() => window.CONTENT);
})();

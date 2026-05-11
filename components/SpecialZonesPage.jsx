// §7 — /special-zones (v2027.1). KIMES 마스터 + 3 서브 브랜드 구조.
// 데이터: content/special-zones.json. 컬러: config.js 단일 출처.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;

function getZones() {
  const { colors } = window.KIMES_EVENT;
  const data = (window.CONTENT && window.CONTENT['special-zones']) || { zones: [] };
  return (data.zones || []).map(z => ({
    ...z,
    color: colors.sub[z.colorKey],
  }));
}

function isLightHex(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 160;
}

function SpecialZonesIndex() {
  const zones = getZones();
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';
  const releaseLabel = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.releaseLabel) || '행사 D-60 공개';

  return (
    <PageShell
      title="특별관"
      lede="KIMES 2027 산하 3개 서브 브랜드 전시. 각 특별관은 KIMES 마스터 브랜드 아래 독자 시각 정체성을 가짐. 특별관 참가업체는 KIMES 표기와 해당 특별관 표기를 병용."
    >
      {/* §7.1 마스터-서브 브랜드 관계 */}
      <SectionHeading id="master-sub" title="마스터 — 서브 브랜드 관계" />
      <ul className="sz-master-sub">
        <li><strong>마스터 브랜드</strong> — KIMES (Red <code>#E60012</code>)</li>
        <li><strong>서브 브랜드</strong> — MedicomteK · BEAUTY&amp;DERMA SEOUL · INSPIRE Digital Health</li>
      </ul>
      <p>
        특별관 단독 표기는 특별관 내부 한정. 외부 자료 (보도자료·홈페이지·SNS)
        에서는 KIMES 마스터 브랜드와 병기 필수 (Tier 1).
      </p>
      <div className="sz-diagram-placeholder">
        [다이어그램 — KIMES 마스터 + 3 서브 브랜드 결합 배치 예시 · {releaseLabel}]
      </div>

      {zones.map(z => (
        <ZoneSection key={z.id} zone={z} pending={assetStatus !== 'ready'} releaseLabel={releaseLabel} />
      ))}

      {/* §7.5 표기 규칙 */}
      <SectionHeading id="rules" title="표기 규칙" />
      <ul>
        <li>외부 자료 — KIMES 마스터 + 특별관 서브 병기 필수 (Tier 1)</li>
        <li>내부 자료 (특별관 부스·내부 사이니지) — 특별관 단독 표기 허용</li>
        <li>결합 배치 비율·간격 — 행사 D-60 공개 자산에 결합 배치 가이드 포함</li>
      </ul>

      <p className="sz-foot-note">
        표기 규칙 상세 → <Link to="/notation">/notation</Link>
      </p>
    </PageShell>
  );
}

function ZoneSection({ zone, pending, releaseLabel }) {
  return (
    <section className="sz-section" id={zone.slug}>
      <div className="sz-hero" style={{ background: zone.color.hex }}>
        <div className="sz-hero-content" style={{ color: isLightHex(zone.color.hex) ? '#231815' : '#fff' }}>
          <div className="sz-hero-tagline">{zone.tagline}</div>
          <h2 className="sz-hero-name">{zone.name}</h2>
          <div className="sz-hero-name-ko">{zone.nameKo}</div>
          <p className="sz-hero-lede-en">{zone.ledeEn}</p>
        </div>
      </div>

      <div className="sz-meta">
        {zone.positioning && (
          <div className="sz-meta-row">
            <span className="sz-meta-key">포지셔닝</span>
            <span className="sz-meta-val">{zone.positioning}</span>
          </div>
        )}
        {zone.targetExhibitors && (
          <div className="sz-meta-row">
            <span className="sz-meta-key">타깃 참가업체</span>
            <span className="sz-meta-val">{zone.targetExhibitors}</span>
          </div>
        )}
        {zone.targetVisitors && (
          <div className="sz-meta-row">
            <span className="sz-meta-key">타깃 관람객</span>
            <span className="sz-meta-val">{zone.targetVisitors}</span>
          </div>
        )}
        <div className="sz-meta-row">
          <span className="sz-meta-key">위치 · 일정</span>
          <span className="sz-meta-val">{zone.hall}</span>
        </div>
        <div className="sz-meta-row">
          <span className="sz-meta-key">메인 컬러</span>
          <span className="sz-meta-val">
            <span className="sz-color-dot" style={{ background: zone.color.hex }} aria-hidden="true" />
            {zone.color.label} · <code>{zone.color.hex.toUpperCase()}</code>
            {zone.color.pantone && <> · <code>Pantone {zone.color.pantone}</code></>}
          </span>
        </div>
        {zone.priorYear && (
          <div className="sz-meta-row">
            <span className="sz-meta-key">직전 회차 (2026)</span>
            <span className="sz-meta-val">{zone.priorYear}</span>
          </div>
        )}
        <div className="sz-meta-row">
          <span className="sz-meta-key">로고 자산</span>
          <span className="sz-meta-val">
            {['SVG', 'PNG', 'AI', 'EPS'].map(ext => (
              <button key={ext} type="button" className="btn btn-sm btn-outline" disabled={pending} title={pending ? releaseLabel : ''}>
                {ext}
              </button>
            ))}
            {pending && <span className="sz-pending"> {releaseLabel}</span>}
          </span>
        </div>
      </div>

      <div className="sz-lockup-placeholder">
        [부스 헤더 예시 — KIMES + {zone.name} 결합 배치 · {releaseLabel}]
      </div>

      <p className="sz-boilerplate">{zone.boilerplate100}</p>
    </section>
  );
}

window.SpecialZonesIndex = SpecialZonesIndex;

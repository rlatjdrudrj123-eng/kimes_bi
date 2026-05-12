// §7 — /special-zones (v2027.1). KIMES 산하 3개 특별관 정보를 한 페이지에
// 섹션으로 나열. 데이터: content/special-zones.json (어드민 편집).
// 컬러: config.js의 KIMES_EVENT.colors.sub 단일 출처.

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

function SpecialZonesIndex() {
  const zones = getZones();
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';
  const pending = assetStatus !== 'ready';

  return (
    <PageShell
      eyebrow="06"
      title="Concurrent Events"
      subtitle="특별관"
      lede="KIMES 2027은 3개 특별관 운영. 특별관 참가업체는 KIMES 표기와 해당 특별관 표기를 병기."
    >
      {zones.map(z => (
        <ZoneSection key={z.id} zone={z} pending={pending} />
      ))}

      <p className="sz-foot-note">
        특별관 단독 표기는 특별관 내부 한정. 외부 자료(보도자료·홈페이지·
        SNS 등)는 KIMES와 병기. → <Link to="/overview">/overview</Link>의 Official Names 참고.
      </p>
    </PageShell>
  );
}

// 특별관 1종 섹션 — 헤더(태그라인+이름) + 이미지 placeholder 영역 +
// 컬러 메타 + 로고 다운로드 + 한 줄 보일러플레이트.
function ZoneSection({ zone, pending }) {
  return (
    <section className="sz-section" id={zone.slug}>
      <header className="sz-section-head">
        <div className="sz-tagline" style={{ color: zone.color.hex }}>
          {zone.tagline}
        </div>
        <h2 className="sz-zone-name">
          {zone.name}
          <span className="sz-zone-name-ko">{zone.nameKo}</span>
        </h2>
      </header>

      <figure
        className="sz-image-slot"
        style={{ '--zone-accent': zone.color.hex }}
        aria-label={`${zone.name} 키비주얼 이미지 영역`}
      >
        <span className="sz-image-slot-label">
          이미지 영역 · {zone.name}
        </span>
        <span className="sz-image-slot-sub">
          키비주얼 자료 도착 시 교체
        </span>
      </figure>

      <div className="sz-meta">
        <div className="sz-meta-row">
          <span className="sz-meta-key">한 줄 소개</span>
          <span className="sz-meta-val">{zone.lede}</span>
        </div>
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
        <div className="sz-meta-row">
          <span className="sz-meta-key">로고 파일</span>
          <span className="sz-meta-val">
            {['SVG', 'PNG', 'AI'].map(ext => (
              <button key={ext} type="button" className="btn btn-sm btn-outline" disabled={pending} title={pending ? '준비 중' : ''}>
                {ext}
              </button>
            ))}
          </span>
        </div>
      </div>

      <p className="sz-boilerplate">{zone.boilerplate100}</p>
    </section>
  );
}

window.SpecialZonesIndex = SpecialZonesIndex;

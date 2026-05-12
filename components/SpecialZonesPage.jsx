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
        SNS 등)는 KIMES와 병기. 규칙은 → <Link to="/notation">/notation</Link>.
      </p>
    </PageShell>
  );
}

// 특별관 1종 섹션 — Hero(컬러 색면) + 컬러 메타 + 로고 다운로드 + 한 줄
// 보일러플레이트. 이전 별도 페이지의 6 섹션 정보를 1 섹션으로 압축.
function ZoneSection({ zone, pending }) {
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

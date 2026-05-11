// §11 — /special-zones. KIMES 안에서 운영되는 3개 특별관 정보를 한 페이지에
// 모아서 안내. 이전 4페이지(인덱스 + 3 상세) 구조에서 1페이지 단일화 —
// 특별관 참가업체는 5-10%만이라 별도 상세 페이지는 과함.
//
// 데이터: content/special-zones.json (어드민 편집), 컬러: config.js 단일 출처.

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
      title="Special Zones"
      subtitle="특별관"
      lede="KIMES 2027은 3개의 특별관을 운영합니다. 각 특별관은 KIMES 안에서 별도 테마와 시각 정체성을 갖습니다. 특별관 참가업체는 KIMES 표기에 더해 해당 특별관 표기도 함께 사용할 수 있습니다."
    >
      {zones.map(z => (
        <ZoneSection key={z.id} zone={z} pending={pending} />
      ))}

      <p className="sz-foot-note">
        특별관 단독 표기는 특별관 안에서만 사용합니다. 외부 자료(보도자료·
        회사 홈페이지·SNS 등)에서는 KIMES와 함께 표기해주세요. 표기 규칙은
        → <Link to="/notation">/notation</Link>.
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
          <span className="sz-meta-key">로고 자산</span>
          <span className="sz-meta-val">
            {['SVG', 'PNG', 'AI', 'EPS'].map(ext => (
              <button key={ext} type="button" className="btn btn-sm btn-outline" disabled={pending} title={pending ? 'Coming soon' : ''}>
                {ext}
              </button>
            ))}
            {pending && <span className="sz-pending"> Coming Soon</span>}
          </span>
        </div>
      </div>

      <p className="sz-boilerplate">{zone.boilerplate100}</p>
    </section>
  );
}

window.SpecialZonesIndex = SpecialZonesIndex;

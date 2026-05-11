// §13 — /special-zones. KIMES 안에서 운영되는 3개 특별관(MedicomteK /
// BEAUTY&DERMA SEOUL / INSPIRE Digital Health) 인덱스 + 3 상세 페이지.
//
// 명세 §13.2 인덱스 + §13.3 상세 공통 구조 + §13.4 특별관 데이터.
// 컬러는 KIMES_EVENT.colors.sub 단일 출처.

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;
const Link = window.Link;

// 3 특별관 데이터. 메타정보는 content/special-zones.json (어드민 편집 가능),
// 컬러는 config.js의 KIMES_EVENT.colors.sub 단일 출처에서 colorKey로 매핑.
function getZones() {
  const { colors } = window.KIMES_EVENT;
  const data = (window.CONTENT && window.CONTENT['special-zones']) || { zones: [] };
  return (data.zones || []).map(z => ({
    ...z,
    color: colors.sub[z.colorKey],
  }));
}

/* ---------- §13.2 인덱스 페이지 ---------- */
function SpecialZonesIndex() {
  const zones = getZones();
  return (
    <PageShell
      eyebrow="09"
      title="Special Zones"
      subtitle="특별관"
      lede="KIMES 2027은 3개의 특별관을 운영합니다. 각 특별관은 KIMES 안에서 별도 테마와 시각 정체성을 갖습니다. 특별관 참가업체는 KIMES 표기에 더해 해당 특별관 표기도 함께 사용할 수 있습니다."
    >
      <div className="sz-index">
        {zones.map(z => (
          <Link key={z.id} to={`/special-zones/${z.slug}`} className="sz-card">
            <div className="sz-card-swatch" style={{ background: z.color.hex }}>
              <span className="sz-card-tagline" style={{ color: isLightHex(z.color.hex) ? '#231815' : '#fff' }}>
                {z.tagline}
              </span>
            </div>
            <div className="sz-card-body">
              <h3 className="sz-card-name">{z.name}</h3>
              <div className="sz-card-name-ko">{z.nameKo}</div>
              <p className="sz-card-lede">{z.lede}</p>
              <div className="sz-card-meta">
                <span className="sz-card-color-dot" style={{ background: z.color.hex }} aria-hidden="true" />
                <span className="sz-card-color-name">{z.color.label}</span>
                <span className="sz-card-color-hex">{z.color.hex.toUpperCase()}</span>
              </div>
              <span className="sz-card-cta">자세히 보기 →</span>
            </div>
          </Link>
        ))}
      </div>

      <p className="sz-foot-note">
        특별관 단독 표기는 특별관 안에서만 사용합니다. 외부 자료(보도자료·
        회사 홈페이지·SNS 등)에서는 KIMES와 함께 표기해주세요. 표기 규칙은
        → <Link to="/notation">/notation</Link>.
      </p>
    </PageShell>
  );
}

/* ---------- §13.3 상세 페이지 공통 컴포넌트 ---------- */
function ZoneDetail({ slug }) {
  const zone = getZones().find(z => z.slug === slug);
  if (!zone) return null;

  const eyebrowMap = { medicomtek: '09.1', 'beauty-derma': '09.2', inspire: '09.3' };
  const assetStatus = (window.KIMES_EVENT.assets && window.KIMES_EVENT.assets.status) || 'pending';
  const pending = assetStatus !== 'ready';

  return (
    <PageShell
      eyebrow={eyebrowMap[slug]}
      title={zone.name}
      subtitle={zone.nameKo}
      lede={`${zone.lede} · ${zone.hall}`}
    >
      {/* §13.3.1 헤더 — 컬러 색면 */}
      <div className="sz-hero" style={{ background: zone.color.hex }}>
        <div className="sz-hero-content" style={{ color: isLightHex(zone.color.hex) ? '#231815' : '#fff' }}>
          <div className="sz-hero-tagline">{zone.tagline}</div>
          <h2 className="sz-hero-name">{zone.name}</h2>
          <div className="sz-hero-name-ko">{zone.nameKo}</div>
          <p className="sz-hero-lede-en">{zone.ledeEn}</p>
        </div>
      </div>

      {/* §13.3.2 로고 (현재 자산 pending — Coming Soon) */}
      <SectionHeading id="logo" title="Logo" subtitle="로고" />
      <div className="sz-logo-card">
        <div className="sz-logo-tile">
          <span className="sz-logo-placeholder" style={{ color: zone.color.hex }}>
            {zone.name}
          </span>
        </div>
        <div className="sz-logo-meta">
          <p>특별관 워드마크 SVG·PNG·AI 자산은 사무국이 별도 제공합니다.
            아래 버튼은 자산 패키지 정리 후 활성화됩니다.</p>
          <div className="sz-logo-actions">
            {['SVG', 'PNG', 'AI', 'EPS'].map(ext => (
              <button key={ext} type="button" className="btn btn-sm btn-outline" disabled={pending} title={pending ? 'Coming soon' : ''}>
                {ext}
              </button>
            ))}
          </div>
          {pending && <div className="sz-logo-pending">Coming Soon</div>}
        </div>
      </div>

      {/* §13.3.3 컬러 */}
      <SectionHeading id="color" title="Color" subtitle="컬러" />
      <div className="sz-color">
        <div className="sz-color-swatch" style={{ background: zone.color.hex }} />
        <table className="sz-color-meta">
          <tbody>
            <tr><th>이름</th><td>{zone.color.label}</td></tr>
            <tr><th>HEX</th><td><code>{zone.color.hex.toUpperCase()}</code></td></tr>
            <tr><th>RGB</th><td><code>{zone.color.rgb.join(', ')}</code></td></tr>
            <tr><th>CMYK</th><td><code>{zone.color.cmyk.join(' / ')}</code></td></tr>
            {zone.color.pantone && <tr><th>Pantone</th><td><code>{zone.color.pantone}</code></td></tr>}
            <tr><th>CSS 변수</th><td><code>var({zone.colorVar})</code></td></tr>
          </tbody>
        </table>
      </div>

      {/* §13.3.4 KIMES + 특별관 함께 표기 */}
      <SectionHeading id="lockup" title="Lockup with KIMES" subtitle="KIMES와 함께 표기" />
      <div className="sz-lockup">
        <div className="sz-lockup-mock">
          <span className="sz-lockup-kimes">KIMES</span>
          <span className="sz-lockup-divider" aria-hidden="true" />
          <span className="sz-lockup-zone" style={{ color: zone.color.hex }}>
            {zone.name}
          </span>
        </div>
        <ul className="sz-lockup-rules">
          <li><strong>비율</strong> — KIMES : 특별관 = 1 : 0.85 (특별관이 살짝 작음, KIMES가 상위)</li>
          <li><strong>간격</strong> — 1.5X (X = KIMES K 높이)</li>
          <li><strong>구분선</strong> — 1px 세로선 권장</li>
          <li><strong>정렬</strong> — 시각적 중심선</li>
        </ul>
        <div className="sz-lockup-signals">
          <div className="sz-lockup-signal sz-lockup-signal-ok">
            <span className="sz-lockup-mark sz-lockup-mark-ok">✓</span>
            <span>특별관 안에서의 부스·자료에서는 특별관 단독 표기 가능</span>
          </div>
          <div className="sz-lockup-signal sz-lockup-signal-bad">
            <span className="sz-lockup-mark sz-lockup-mark-bad">✗</span>
            <span>KIMES 외부 자료(보도자료·홈페이지 등)에서 특별관만 표기는 권장하지 않음 — 항상 KIMES와 함께</span>
          </div>
        </div>
      </div>

      {/* §13.3.5 보일러플레이트 */}
      <SectionHeading id="boilerplate" title="Boilerplate" subtitle="보일러플레이트" />
      <p className="sz-boilerplate">{zone.boilerplate100}</p>

      {/* §13.3.6 문의 */}
      <SectionHeading id="contact" title="Contact" subtitle="특별관 문의" />
      <p className="sz-contact">
        특별관 관련 문의는 KIMES 사무국으로 통합 연락주세요 →{' '}
        <a href={`mailto:${window.KIMES_EVENT.contact.email}`}>{window.KIMES_EVENT.contact.email}</a>
        {' · '}
        <a href={`tel:${window.KIMES_EVENT.contact.tel.replace(/-/g, '')}`}>{window.KIMES_EVENT.contact.tel}</a>
      </p>

      <p className="sz-cross">
        특별관 인덱스 → <Link to="/special-zones">/special-zones</Link>{' · '}
        표기 규칙 → <Link to="/notation">/notation</Link>
      </p>
    </PageShell>
  );
}

// hex 색상이 밝은지 어두운지 판단해 텍스트 컬러 결정
function isLightHex(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 160;
}

function SpecialZoneMedicomtek()  { return <ZoneDetail slug="medicomtek" />; }
function SpecialZoneBeautyDerma() { return <ZoneDetail slug="beauty-derma" />; }
function SpecialZoneInspire()     { return <ZoneDetail slug="inspire" />; }

window.SpecialZonesIndex      = SpecialZonesIndex;
window.SpecialZoneMedicomtek  = SpecialZoneMedicomtek;
window.SpecialZoneBeautyDerma = SpecialZoneBeautyDerma;
window.SpecialZoneInspire     = SpecialZoneInspire;

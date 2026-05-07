/* eslint-disable */
/**
 * Event signage — Section under Applications. On-site large-format collateral
 * built into the COEX exhibition halls: hall banners, booth markers,
 * registration desk graphics, and wayfinding pictograms. All reproduced
 * here as small CSS mock-ups so the design tokens stay the source of truth.
 */

const useSiteLang = window.useSiteLang;
function trE(en, ko, lang) { return lang === 'ko' && ko ? ko : en; }

/* ---- Intro ---- */
function EventSignageIntro() {
  const lang = useSiteLang();
  return (
    <section id="signage" className="section">
      <div className="section-eyebrow">{trE('Applications · On-site signage', '어플리케이션 · 현장 사이니지')}</div>
      <h2>{trE('Event signage', '현장 사이니지')}</h2>
      <p className="lede">
        {trE(
          'Wayfinding and identification across the COEX halls — large-format banners, booth markers at every aisle, registration-desk graphics, and the standard pictogram set used on every directional sign.',
          '코엑스 홀 전반의 길찾기·식별 — 대형 배너, 통로마다 부스 마커, 등록 데스크 그래픽, 모든 방향 표지에 사용하는 표준 픽토그램 세트.'
        )}
      </p>
    </section>
  );
}

/* ---- 06.1 Hall banners ---- */
function HallBanners() {
  const lang = useSiteLang();
  const halls = [
    { letter: 'A', cat: 'Imaging diagnostics',     krCat: '영상진단기기',   bg: '#E60012' },
    { letter: 'B', cat: 'Surgical instruments',    krCat: '수술 관련 기기', bg: '#231815' },
    { letter: 'C', cat: 'Hospital equipment',      krCat: '병원설비',       bg: '#036EB8' },
    { letter: 'D', cat: 'Beauty & skincare',       krCat: '피부미용',        bg: '#5D3B8B' },
    { letter: 'E', cat: 'Digital health',          krCat: '디지털 헬스',    bg: '#595757' },
  ];
  return (
    <div id="signage-banners" className="subsection">
      <h3>{trE('06.1 — Hall banners', '06.1 — 홀 배너')}</h3>
      <p className="desc">
        {trE(
          'Suspended above each hall entrance — 6 m × 1.8 m fabric banner, single brand color, hall letter at 1.2 m cap-height. Visible from across the COEX atrium.',
          '각 홀 입구 위 천장에 걸리는 6 m × 1.8 m 패브릭 배너. 단색 브랜드 컬러, 홀 영문 1.2 m 높이. 코엑스 아트리움 건너편에서도 식별 가능.'
        )}
      </p>
      <div className="kes-banner-row">
        {halls.map(h => (
          <div className="kes-banner" key={h.letter} style={{ background: h.bg }}>
            <div className="kes-banner-letter">{h.letter}</div>
            <div className="kes-banner-cat">{lang === 'ko' && h.krCat ? h.krCat : h.cat}</div>
            <div className="kes-banner-foot">KIMES 2026 · COEX</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- 06.2 Booth markers ---- */
function BoothMarkers() {
  const lang = useSiteLang();
  const markers = [
    { booth: 'A-101', name: 'Hyundai MedTech',     krName: '현대 메드텍',    booth_h: 'A' },
    { booth: 'B-211', name: 'Olympus Korea',        krName: '올림푸스코리아', booth_h: 'B' },
    { booth: 'C-302', name: 'Stryker Korea',        krName: '스트라이커',     booth_h: 'C' },
    { booth: 'D-401', name: 'Siemens Healthineers', krName: '지멘스',         booth_h: 'D' },
  ];
  return (
    <div id="signage-booth" className="subsection">
      <h3>{trE('06.2 — Booth markers', '06.2 — 부스 마커')}</h3>
      <p className="desc">
        {trE(
          'Suspended at every booth — 1 m × 0.6 m double-sided fascia. Booth number is set in Montserrat 900 at the maximum legible cap-height; company name underneath in Pretendard / Montserrat at half the size.',
          '각 부스 위에 매다는 1 m × 0.6 m 양면 패시아. 부스 번호는 가장 큰 가독 cap-height의 Montserrat 900, 업체명은 그 절반 크기의 Pretendard·Montserrat.'
        )}
      </p>
      <div className="kes-booth-row">
        {markers.map(m => (
          <div className="kes-booth" key={m.booth}>
            <div className="kes-booth-aisle">HALL {m.booth_h}</div>
            <div className="kes-booth-num">{m.booth}</div>
            <div className="kes-booth-name">{lang === 'ko' && m.krName ? m.krName : m.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- 06.3 Registration desk ---- */
function RegistrationDesk() {
  const lang = useSiteLang();
  const lanes = [
    { type: 'PRE-REGISTERED', krType: '사전등록자',    color: '#231815', icon: '✓', krNote: 'NFC 카드 태그',          note: 'Tap NFC card' },
    { type: 'ON-SITE',         krType: '현장 등록',     color: '#E60012', icon: '✎', krNote: '명함 + 폼 작성',        note: 'Card + paper form' },
    { type: 'PRESS',           krType: '프레스',        color: '#036EB8', icon: '📷', krNote: '프레스 카드 확인',     note: 'Press card check' },
    { type: 'EXHIBITOR',       krType: '참가업체',      color: '#5D3B8B', icon: '★', krNote: '참가업체 코드',         note: 'Exhibitor code' },
  ];
  return (
    <div id="signage-registration" className="subsection">
      <h3>{trE('06.3 — Registration desk', '06.3 — 등록 데스크')}</h3>
      <p className="desc">
        {trE(
          'Four-lane registration at COEX East Gate. Lane signage is back-lit, brand-color band over a black ID strip. Lane symbols are reused from the wayfinding pictogram set.',
          '코엑스 동문 4-레인 등록 데스크. 레인 사이니지는 후광 조명, 브랜드 컬러 띠 위 블랙 ID 띠. 레인 심볼은 길찾기 픽토그램 세트에서 재사용.'
        )}
      </p>
      <div className="kes-reg-row">
        {lanes.map(l => (
          <div className="kes-reg-lane" key={l.type} style={{ '--lane-color': l.color }}>
            <div className="kes-reg-lane-icon">{l.icon}</div>
            <div className="kes-reg-lane-type">{lang === 'ko' && l.krType ? l.krType : l.type}</div>
            <div className="kes-reg-lane-note">{lang === 'ko' && l.krNote ? l.krNote : l.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- 06.4 Wayfinding pictograms ---- */
function Wayfinding() {
  const lang = useSiteLang();
  const arrows = [
    { dir: '↑',  label: 'Halls A–C',       krLabel: '홀 A–C' },
    { dir: '→',  label: 'Halls D–E',       krLabel: '홀 D–E' },
    { dir: '↑',  label: 'Registration',     krLabel: '등록' },
    { dir: '←',  label: 'Press lounge',     krLabel: '프레스 라운지' },
    { dir: '↓',  label: 'Parking · B2',     krLabel: '주차장 · B2' },
    { dir: '→',  label: 'Cafeteria',        krLabel: '카페테리아' },
    { dir: '↑',  label: 'Conference',       krLabel: '컨퍼런스' },
    { dir: '←',  label: 'Exit · East',      krLabel: '출구 · 동' },
  ];
  return (
    <div id="signage-wayfinding" className="subsection">
      <h3>{trE('06.4 — Wayfinding pictograms', '06.4 — 길찾기 픽토그램')}</h3>
      <p className="desc">
        {trE(
          'Black-on-white arrow tiles posted at every aisle intersection. Arrow weight matches the icon system (1.5 px stroke, rounded caps); destination set in Montserrat 700 at 24 pt minimum.',
          '모든 통로 교차점에 부착되는 화이트 위 블랙 화살표 타일. 화살표 두께는 아이콘 시스템 일치 (1.5 px 스트로크, 둥근 끝); 목적지는 Montserrat 700, 최소 24 pt.'
        )}
      </p>
      <div className="kes-way-grid">
        {arrows.map((a, i) => (
          <div className="kes-way-tile" key={i}>
            <div className="kes-way-arrow" aria-hidden="true">{a.dir}</div>
            <div className="kes-way-label">{lang === 'ko' && a.krLabel ? a.krLabel : a.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Page wrapper ---- */
function EventSignage() {
  return (
    <React.Fragment>
      <EventSignageIntro />
      <HallBanners />
      <BoothMarkers />
      <RegistrationDesk />
      <Wayfinding />
    </React.Fragment>
  );
}

Object.assign(window, {
  EventSignage,
  EventSignageIntro,
  HallBanners,
  BoothMarkers,
  RegistrationDesk,
  Wayfinding,
});

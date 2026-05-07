/* eslint-disable */
/**
 * Print collateral — Section under Applications. Mock-poster level demos for
 * program book covers, exhibitor catalog rows, ID badges (lanyard), and a
 * brochure spread. All visuals are pure CSS so they re-render correctly when
 * brand colors change in the design tokens.
 */

const useSiteLang = window.useSiteLang;
function trP(en, ko, lang) { return lang === 'ko' && ko ? ko : en; }

/* ---- Intro ---- */
function PrintCollateralIntro() {
  const lang = useSiteLang();
  return (
    <section id="print" className="section">
      <div className="section-eyebrow">{trP('Applications · Print', '어플리케이션 · 인쇄')}</div>
      <h2>{trP('Print collateral', '인쇄 자료')}</h2>
      <p className="lede">
        {trP(
          'Print materials shipped on-site at KIMES — the program book, exhibitor catalog, visitor ID badges, and the bilingual brochure for international press kits. Every layout uses solid brand color (no gradients), Montserrat for Latin / numerals, Pretendard for Korean.',
          '현장에서 사용되는 KIMES 인쇄물 — 프로그램북, 참가업체 카탈로그, 방문자 ID 배지, 해외 프레스 키트용 양언어 브로셔. 모든 레이아웃은 단색 브랜드 컬러(그라디언트 없음), 라틴·숫자 Montserrat, 한글 Pretendard.'
        )}
      </p>
    </section>
  );
}

/* ---- 05.1 Program book cover ---- */
function ProgramCover() {
  const lang = useSiteLang();
  return (
    <div id="print-program" className="subsection">
      <h3>{trP('05.1 — Program book cover', '05.1 — 프로그램북 표지')}</h3>
      <p className="desc">
        {trP(
          'Saddle-stitched 32-page program. Cover follows the KIMES proportion (60 white / 25 black / 15 red): white image area top, red eyebrow band, black footer with venue + dates. Spine remains blank for binding.',
          '32페이지 새들 스티치 프로그램. 표지는 KIMES 비율 적용 (화이트 60 / 블랙 25 / 레드 15) — 상단 화이트 이미지, 레드 띠, 하단 블랙 푸터에 장소·날짜. 등쪽은 제본을 위해 비워둠.'
        )}
      </p>
      <div className="kpc-row">
        <div className="kpc-program">
          <div className="kpc-program-image">
            <span className="kpc-program-mark">KIMES 2026</span>
          </div>
          <div className="kpc-program-band">
            <span>{trP('41st edition · Korea International Medical Exhibition', '제41회 · 한국 국제 의료기기 전시회')}</span>
          </div>
          <div className="kpc-program-foot">
            <span className="kpc-program-foot-l">{trP('March 19—22, 2026', '2026년 3월 19—22일')}</span>
            <span className="kpc-program-foot-r">{trP('COEX · Seoul', '코엑스 · 서울')}</span>
          </div>
        </div>
        <div className="kpc-program-meta">
          <h4>{trP('Spec', '사양')}</h4>
          <dl className="kpc-spec-dl">
            <dt>{trP('Format', '판형')}</dt><dd>A4 (210 × 297 mm)</dd>
            <dt>{trP('Pages', '페이지')}</dt><dd>32 + cover</dd>
            <dt>{trP('Paper', '용지')}</dt><dd>{trP('Cover 200 g · Body 100 g matte', '표지 200 g · 본문 100 g 무광')}</dd>
            <dt>{trP('Binding', '제본')}</dt><dd>{trP('Saddle stitch', '새들 스티치')}</dd>
            <dt>{trP('Print', '인쇄')}</dt><dd>{trP('CMYK + spot K (cover)', 'CMYK + 별색 K (표지)')}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ---- 05.2 Exhibitor catalog page ---- */
function ExhibitorCatalog() {
  const lang = useSiteLang();
  const rows = [
    { booth: 'A-101', name: 'Hyundai MedTech',     krName: '현대 메드텍',         cat: 'Imaging diagnostics',     krCat: '영상진단기기',    flag: '🇰🇷' },
    { booth: 'A-104', name: 'Samsung Medison',      krName: '삼성메디슨',           cat: 'Imaging diagnostics',    krCat: '영상진단기기',    flag: '🇰🇷' },
    { booth: 'B-211', name: 'Olympus Korea',        krName: '올림푸스코리아',       cat: 'Surgical instruments',   krCat: '수술 관련 기기',  flag: '🇯🇵' },
    { booth: 'B-218', name: 'Philips Healthcare',   krName: '필립스 헬스케어',      cat: 'Patient monitoring',     krCat: '환자 모니터링',  flag: '🇳🇱' },
    { booth: 'C-302', name: 'Stryker Korea',        krName: '스트라이커 코리아',    cat: 'Surgical instruments',   krCat: '수술 관련 기기',  flag: '🇺🇸' },
    { booth: 'C-309', name: 'Medtronic Korea',      krName: '메드트로닉 코리아',    cat: 'Cardiovascular',         krCat: '심혈관',          flag: '🇺🇸' },
    { booth: 'D-401', name: 'Siemens Healthineers', krName: '지멘스 헬시니어스',   cat: 'Imaging diagnostics',    krCat: '영상진단기기',    flag: '🇩🇪' },
    { booth: 'E-503', name: 'Tristar BioMed',       krName: '트리스타 바이오메드', cat: 'Disposable supplies',    krCat: '일회용 의료용품', flag: '🇰🇷' },
  ];
  return (
    <div id="print-catalog" className="subsection">
      <h3>{trP('05.2 — Exhibitor catalog page', '05.2 — 참가업체 카탈로그 페이지')}</h3>
      <p className="desc">
        {trP(
          'Right-page sample from the 1,400-line catalog. Booth numbers ranged left in mono; company names in Pretendard / Montserrat depending on registration; one-line category in muted gray.',
          '1,400행 카탈로그의 우측 페이지 샘플. 부스 번호는 좌측 정렬·모노스페이스, 업체명은 등록 언어에 따라 Pretendard·Montserrat, 카테고리는 한 줄·회색.'
        )}
      </p>
      <div className="kpc-catalog">
        <div className="kpc-catalog-head">
          <span>{trP('Booth', '부스')}</span>
          <span>{trP('Exhibitor', '참가업체')}</span>
          <span>{trP('Category', '카테고리')}</span>
          <span></span>
        </div>
        {rows.map(r => (
          <div className="kpc-catalog-row" key={r.booth}>
            <span className="kpc-catalog-booth mono">{r.booth}</span>
            <span className="kpc-catalog-name">{lang === 'ko' && r.krName ? r.krName : r.name}</span>
            <span className="kpc-catalog-cat">{lang === 'ko' && r.krCat ? r.krCat : r.cat}</span>
            <span className="kpc-catalog-flag" aria-hidden="true">{r.flag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- 05.3 ID badge / lanyard ---- */
function IdBadge() {
  const lang = useSiteLang();
  const variants = [
    { type: 'TRADE',     krType: '참관객',  name: 'Park Young-hee', krName: '박영희', org: 'Seoul National University Hospital', krOrg: '서울대학교병원',   color: '#231815' },
    { type: 'PRESS',     krType: '프레스',  name: 'Kim Joon-ho',    krName: '김준호', org: 'Medical Korea Daily',               krOrg: '메디컬코리아',     color: '#E60012' },
    { type: 'EXHIBITOR', krType: '참가업체', name: 'Lee Hye-rin',    krName: '이혜린', org: 'Hyundai MedTech',                    krOrg: '현대 메드텍',       color: '#036EB8' },
    { type: 'STAFF',     krType: '운영진',   name: 'Chung Min-soo',  krName: '정민수', org: 'KIMES Bureau',                       krOrg: 'KIMES 사무국',     color: '#595757' },
  ];
  return (
    <div id="print-badge" className="subsection">
      <h3>{trP('05.3 — ID badge / lanyard', '05.3 — 출입증 / 랜야드')}</h3>
      <p className="desc">
        {trP(
          'Four visitor types. Color-coded eyebrow band lets ushers and security identify access level at a glance. Always print on bright-white 280 g card with NFC chip embedded for lead retrieval.',
          '4가지 방문자 유형. 컬러 띠로 안내·보안 인력이 한눈에 출입 레벨을 식별. 항상 밝은 화이트 280 g 카드에 인쇄, 리드 리트리벌용 NFC 칩 내장.'
        )}
      </p>
      <div className="kpc-badge-row">
        {variants.map(v => (
          <div className="kpc-badge" key={v.type}>
            <div className="kpc-badge-band" style={{ background: v.color }}>
              <span>{lang === 'ko' && v.krType ? v.krType : v.type}</span>
            </div>
            <div className="kpc-badge-body">
              <div className="kpc-badge-mark">KIMES 2026</div>
              <div className="kpc-badge-name">{lang === 'ko' && v.krName ? v.krName : v.name}</div>
              <div className="kpc-badge-org">{lang === 'ko' && v.krOrg ? v.krOrg : v.org}</div>
            </div>
            <div className="kpc-badge-foot mono">A1B2-C3D4</div>
            <div className="kpc-badge-strap" aria-hidden="true"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- 05.4 Brochure spread ---- */
function BrochureSpread() {
  const lang = useSiteLang();
  return (
    <div id="print-brochure" className="subsection">
      <h3>{trP('05.4 — Bilingual brochure spread', '05.4 — 양언어 브로셔 스프레드')}</h3>
      <p className="desc">
        {trP(
          '6-panel tri-fold for international press kits. Korean on the inside spread, English on the outside. Cover (left): logo, dates, hero image. Inside (center): three program highlights with numbered tags.',
          '해외 프레스 키트용 6면 3단 접지. 안쪽 면은 한글, 바깥쪽은 영문. 커버(좌측) — 로고·날짜·히어로 이미지. 안쪽 가운데 — 번호 태그가 있는 핵심 프로그램 3개.'
        )}
      </p>
      <div className="kpc-brochure">
        <div className="kpc-brochure-panel kpc-brochure-cover">
          <span className="kpc-brochure-mark">KIMES 2026</span>
          <span className="kpc-brochure-date">{trP('March 19—22', '3월 19—22')}</span>
          <span className="kpc-brochure-venue">{trP('COEX · Seoul', '코엑스 · 서울')}</span>
        </div>
        <div className="kpc-brochure-panel kpc-brochure-mid">
          <span className="kpc-brochure-num">01</span>
          <h5>{trP('1,400+ exhibitors', '1,400+ 참가업체')}</h5>
          <p>{trP('Across 14 categories — imaging, surgical, dental, beauty/derma, digital health.', '14개 카테고리 — 영상진단·수술·치과·미용/피부·디지털 헬스 등.')}</p>
        </div>
        <div className="kpc-brochure-panel kpc-brochure-mid">
          <span className="kpc-brochure-num">02</span>
          <h5>{trP('80,000 trade visitors', '8만 명 참관객')}</h5>
          <p>{trP('From 60+ countries — clinicians, hospital purchasing, distributors, regulators.', '60+개국 — 임상의·병원 구매·유통사·규제기관.')}</p>
        </div>
        <div className="kpc-brochure-panel kpc-brochure-back">
          <span className="kpc-brochure-cta">{trP('Pre-register at kimes.kr', 'kimes.kr 사전등록')}</span>
        </div>
      </div>
    </div>
  );
}

/* ---- Page wrapper ---- */
function PrintCollateral() {
  return (
    <React.Fragment>
      <PrintCollateralIntro />
      <ProgramCover />
      <ExhibitorCatalog />
      <IdBadge />
      <BrochureSpread />
    </React.Fragment>
  );
}

Object.assign(window, {
  PrintCollateral,
  PrintCollateralIntro,
  ProgramCover,
  ExhibitorCatalog,
  IdBadge,
  BrochureSpread,
});

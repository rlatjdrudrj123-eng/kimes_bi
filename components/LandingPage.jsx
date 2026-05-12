// §1 — 시작하며 (랜딩) — v2027.1
//
//   §1.1 Hero (좌측: 헤드라인 + 서브 + CTA 2개)
//   §1.4 사용 대상 (1단 카드)
//   §1.6 자주 찾는 자료 (6장)
//   §1.8 문의
// 행사 메타데이터는 components/config.js의 KIMES_EVENT 단일 출처에서 읽음.

const Link = window.Link;

// §1.6 자주 찾는 자료 — 6장 (Overview 중복분 제거).
const QUICK_LINKS = [
  { to: '/downloads', label: '파일 패키지',        desc: '.zip 통합 패키지',         icon: 'download' },
  { to: '/notation',  label: '표기 규칙',           desc: '명칭·날짜·숫자·SNS 태그', icon: 'doc' },
  { to: '/downloads', label: '이메일 서명 배너',   desc: '메일 서명용',              icon: 'mail' },
  { to: '/downloads', label: 'SNS 카드 양식',       desc: 'SNS 공유용',               icon: 'sns' },
  { to: '/faq',       label: '자주 묻는 질문',      desc: '32개 항목',                icon: 'help' },
  { to: '/contact',   label: '승인 신청',           desc: '사전 승인 신청',           icon: 'check' },
];

function LandingPage() {
  const { event } = window.KIMES_EVENT;

  return (
    <div className="landing">
      {/* §1.1 Hero (좌측만) ----------------------------------------- */}
      <section className="landing-hero">
        <div className="landing-hero-text">
          <h1 className="landing-headline">
            <span className="landing-headline-line">{event.nameKo}</span>
            <span className="landing-headline-line">브랜드 가이드</span>
          </h1>
          <p className="landing-subhead">
            보도자료·부스·초청장·SNS에서의 KIMES 표기 규정.
          </p>
          <div className="landing-cta-row">
            <Link to="/downloads" className="btn btn-primary btn-lg">로고 다운로드</Link>
            <Link to="/overview" className="btn btn-outline btn-lg">가이드 보기</Link>
          </div>
        </div>
      </section>

      {/* §1.4 사용 대상 (1단) ------------------------------------------ */}
      <section className="landing-section" id="audience">
        <div className="landing-h2-block">
          <h2 className="landing-h2">대상</h2>
        </div>
        <div className="landing-audience landing-audience-single">
          <div className="landing-audience-card landing-audience-yes">
            <h3>대상 사용자</h3>
            <ul>
              <li>{event.nameKo} 참가업체 마케팅·디자인 담당자</li>
              <li>참가업체 외주 대행사 (PR·디자인·영상)</li>
              <li>특별관 참가업체 (MedicomteK / BEAUTY&amp;DERMA SEOUL / INSPIRE Digital Health)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* §1.6 자주 찾는 자료 (6장) ------------------------------------ */}
      <section className="landing-section" id="quick-links">
        <div className="landing-h2-block">
          <h2 className="landing-h2">자주 찾는 자료</h2>
        </div>
        <div className="landing-tiles">
          {QUICK_LINKS.map(item => (
            <Link key={item.label} to={item.to} className="landing-tile">
              <span className="landing-tile-icon" aria-hidden="true">
                <QuickIcon name={item.icon} />
              </span>
              <span className="landing-tile-label">{item.label}</span>
              <span className="landing-tile-desc">{item.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* §1.8 문의 ---------------------------------------------- */}
      <section className="landing-section" id="contact">
        <div className="landing-contact-box">
          <div className="landing-h2-block">
            <h2 className="landing-h2 landing-contact-h2">문의</h2>
          </div>
          <p>
            가이드에 없는 사용 사례는{' '}
            <a href={`mailto:${window.KIMES_EVENT.contact.email}`}>{window.KIMES_EVENT.contact.email}</a>로
            문의. 영업일 3~5일 내 회신.
          </p>
        </div>
      </section>
    </div>
  );
}

// 24×24 인라인 SVG 글리프 — currentColor 사용해 호스트 색 상속.
function QuickIcon({ name }) {
  const common = {
    width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 2,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'download':
      return (
        <svg {...common}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      );
    case 'doc':
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      );
    case 'booth':
      return (
        <svg {...common}>
          <path d="M3 9h18v12H3z" />
          <path d="M3 9l3-5h12l3 5" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3 7 12 13 21 7" />
        </svg>
      );
    case 'sns':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="12" cy="12" r="3.5" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
        </svg>
      );
    case 'press':
      return (
        <svg {...common}>
          <path d="M3 11l18-7v16l-18-7z" />
          <path d="M11 17a3 3 0 0 1-6 0v-3" />
        </svg>
      );
    case 'help':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4" />
          <line x1="12" y1="17" x2="12" y2="17.01" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    default:
      return null;
  }
}

window.LandingPage = LandingPage;

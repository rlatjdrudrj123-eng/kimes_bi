// §1 — 시작하며 (랜딩) — v2027.1
//
// 명세 v2027.1 §1의 5 섹션:
//   §1.1 Hero (헤드라인 + CTA 2개 + 행사 일정 메타박스)
//   §1.2 대상 (좌·우 2단 비교 카드)
//   §1.3 Quick Links (4 항목)
//   §1.4 변경 이력
//   §1.5 문의

const Link = window.Link;

// §1.3 Quick Links — 4 항목
const QUICK_LINKS = [
  { to: '/overview',  label: '공식 명칭 (한·영)',   desc: '복사해서 바로 사용', icon: 'doc'      },
  { to: '/logo',      label: '로고 다운로드',        desc: '워드마크 4종 × 4포맷', icon: 'download' },
  { to: '/overview',  label: '보일러플레이트 4벌',   desc: '40·100·200·400자',     icon: 'press'    },
  { to: '/downloads', label: '통합 자산 패키지',     desc: '.zip 일괄 다운로드',   icon: 'download' },
];

// §1.4 변경 이력 — 최근 3개. /changelog와 같은 데이터.
const UPDATES = [
  { date: '2026-05-11', title: 'v2027.1 — 톤 개정, 분량 감축' },
  { date: '2026-04-15', title: '특별관 BI 추가 (MedicomteK · BEAUTY&DERMA SEOUL · INSPIRE)' },
  { date: '2026-03-20', title: '공식 보일러플레이트 한·영 갱신' },
];

function LandingPage() {
  const { event } = window.KIMES_EVENT;
  const status = window.KIMES_EVENT.getEventStatus(new Date());

  return (
    <div className="landing">
      {/* §1.1 Hero ----------------------------------------------- */}
      <section className="landing-hero">
        <div className="landing-hero-text">
          <h1 className="landing-headline">
            {event.nameKo} 참가업체를 위한 공식 브랜드 자산과 사용 가이드
          </h1>
          <div className="landing-cta-row">
            <Link to="/logo" className="btn btn-primary btn-lg">로고 다운로드</Link>
            <Link to="/overview" className="btn btn-outline btn-lg">가이드 보기</Link>
          </div>
        </div>
        <aside
          className={`landing-meta-box landing-meta-${status.state}`}
          aria-label="행사 일정"
        >
          <div className="landing-meta-line">
            {event.dateShort} · {event.venueShortKo}
          </div>
          <div className="landing-meta-label" aria-live="polite">
            {status.label}
          </div>
          <div className="landing-meta-sub">{status.sub}</div>
        </aside>
      </section>

      {/* §1.2 대상 -------------------------------------------------- */}
      <section className="landing-section" id="audience">
        <div className="landing-h2-block">
          <h2 className="landing-h2">대상</h2>
        </div>
        <div className="landing-audience">
          <div className="landing-audience-card landing-audience-yes">
            <h3>이 가이드 사용 대상</h3>
            <ul>
              <li>{event.nameKo} 참가업체 마케팅·디자인 담당자</li>
              <li>참가업체 외주 대행사 (PR · 디자인 · 영상)</li>
              <li>특별관 참가업체 (MedicomteK · BEAUTY&amp;DERMA SEOUL · INSPIRE Digital Health)</li>
            </ul>
          </div>
          <div className="landing-audience-card landing-audience-no">
            <h3>별도 안내</h3>
            <ul>
              <li>일반 관람객 → <a href="https://kimes.kr" target="_blank" rel="noopener noreferrer">kimes.kr</a></li>
              <li>언론사 → 프레스룸</li>
              <li>스폰서 → 별도 스폰서 키트</li>
            </ul>
          </div>
        </div>
      </section>

      {/* §1.3 Quick Links ----------------------------------------- */}
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

      {/* §1.4 변경 이력 ----------------------------------------- */}
      <section className="landing-section" id="updates">
        <div className="landing-h2-block">
          <h2 className="landing-h2">변경 이력</h2>
        </div>
        <ul className="landing-updates-list">
          {UPDATES.map(u => (
            <li key={u.date}>
              <span className="landing-update-date">{u.date}</span>
              <span className="landing-update-title">{u.title}</span>
            </li>
          ))}
        </ul>
        <Link to="/changelog" className="landing-updates-more">전체 변경 이력 →</Link>
      </section>

      {/* §1.5 문의 ---------------------------------------------- */}
      <section className="landing-section" id="contact">
        <div className="landing-contact-box">
          <div className="landing-h2-block">
            <h2 className="landing-h2 landing-contact-h2">문의</h2>
          </div>
          <p>
            가이드 외 사용 사례 —{' '}
            <a href={`mailto:${window.KIMES_EVENT.contact.email}`}>{window.KIMES_EVENT.contact.email}</a>
            {' '}(영업일 3~5일 회신).
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
    case 'press':
      return (
        <svg {...common}>
          <path d="M3 11l18-7v16l-18-7z" />
          <path d="M11 17a3 3 0 0 1-6 0v-3" />
        </svg>
      );
    default:
      return null;
  }
}

window.LandingPage = LandingPage;

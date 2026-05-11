// §4 — 시작하며 (랜딩)
//
// 명세 §4.2의 6개 섹션을 모두 구현.
//   §4.2.1 히어로 (헤드라인 + 서브카피 + CTA 2개 + D-카운트다운 메타박스)
//   §4.2.2 이 가이드는 누구를 위한 것인가 (좌·우 2단 비교 카드)
//   §4.2.3 5분 빠른 시작 (3단계 가로 카드)
//   §4.2.4 자주 찾는 자료 (4×2 Quick Links)
//   §4.2.5 공지·업데이트 (최근 3개)
//   §4.2.6 문의 박스
// 행사 메타데이터는 components/config.js의 KIMES_EVENT 단일 출처에서 읽음.

const Link = window.Link;

// §4.2.4 자주 찾는 자료 — 4×2 그리드의 8개 타일.
const QUICK_LINKS = [
  { to: '/downloads',    label: '파일 패키지',           desc: '.zip 통합 패키지',           icon: 'download' },
  { to: '/overview',     label: '공식 명칭 한·영',       desc: '복사해서 바로 사용',          icon: 'doc' },
  { to: '/notation',     label: '표기 규칙',              desc: '명칭·날짜·숫자·SNS 태그',     icon: 'doc' },
  { to: '/downloads',    label: '이메일 서명 배너',      desc: '메일 마지막에 첨부',          icon: 'mail' },
  { to: '/downloads',    label: 'SNS 카드 양식',          desc: '인스타·링크드인 공유용',       icon: 'sns' },
  { to: '/overview',     label: '보도자료 보일러플레이트', desc: '40·100·200·400자',           icon: 'press' },
  { to: '/faq',          label: '자주 묻는 질문',          desc: '9개 분류 32개 답변',          icon: 'help' },
  { to: '/contact',      label: '승인 신청',              desc: '특수 사용 사전 검토',         icon: 'check' },
];

// §4.2.5 최근 3개 공지. /changelog와 동일한 데이터 — Phase 4에서 JSON으로
// 분리 예정. 그때까지는 여기에 인라인.
const UPDATES = [
  { date: '2026-05-07', title: 'v2027.0 — 참가업체용 가이드로 전면 개편' },
  { date: '2026-04-15', title: '특별관 BI 추가 (MedicomteK / BEAUTY&DERMA SEOUL / INSPIRE)' },
  { date: '2026-03-20', title: '공식 보일러플레이트 한·영 갱신' },
];

function LandingPage() {
  const { event } = window.KIMES_EVENT;
  const assets = window.KIMES_EVENT.assets || {};
  const status = window.KIMES_EVENT.getEventStatus(new Date());
  const assetsPending = assets.status !== 'ready';

  return (
    <div className="landing">
      {/* §4.2.1 Hero ----------------------------------------------- */}
      <section className="landing-hero">
        <div className="landing-hero-text">
          <h1 className="landing-headline">
            {event.nameKo} 참가업체를 위한 브랜드 가이드
          </h1>
          <p className="landing-subhead">
            보도자료, 부스 디자인, 초청장, SNS — KIMES와 함께하는 모든 자료에서
            브랜드를 정확하게 표기하는 방법입니다.
          </p>
          <div className="landing-cta-row">
            <Link to="/downloads" className="btn btn-primary btn-lg">로고 다운로드</Link>
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

      {assetsPending && (
        <section className="landing-asset-notice" aria-label="자산 공개 일정">
          <div className="landing-asset-notice-row">
            <span className="landing-asset-notice-label">자산 공개 예정</span>
            <span className="landing-asset-notice-date">행사 D-60 · 2027.01.17</span>
          </div>
          <p className="landing-asset-notice-body">
            그 전까지는 공식 명칭·표기 규칙·회사 소개 문구만 사용 가능합니다.
            로고·컬러 팔레트·템플릿 등 다운로드 파일은 D-60에 일괄 공개됩니다.
          </p>
        </section>
      )}

      {/* §4.2.2 이 가이드는 누구를 위한 것인가 -------------------------- */}
      <section className="landing-section" id="audience">
        <div className="landing-h2-block">
          <h2 className="landing-h2">Audience</h2>
          <div className="landing-h2-sub">이 가이드는 누구를 위한 것인가</div>
        </div>
        <div className="landing-audience">
          <div className="landing-audience-card landing-audience-yes">
            <h3>이 가이드가 필요한 분</h3>
            <ul>
              <li>{event.nameKo} 참가업체 마케팅·디자인 담당자</li>
              <li>참가업체 외주 대행사 (PR·디자인·영상)</li>
              <li>특별관 참가업체 (MedicomteK / BEAUTY&amp;DERMA SEOUL / INSPIRE Digital Health)</li>
            </ul>
          </div>
          <div className="landing-audience-card landing-audience-no">
            <h3>다른 자료가 필요한 분</h3>
            <ul>
              <li>
                일반 관람객 → <a href="https://kimes.kr" target="_blank" rel="noopener noreferrer">kimes.kr</a> 방문 안내
              </li>
              <li>언론사 → 프레스룸 안내</li>
              <li>스폰서·후원사 → 별도 스폰서 키트 안내</li>
            </ul>
          </div>
        </div>
      </section>

      {/* §4.2.3 5분 빠른 시작 ----------------------------------------- */}
      <section className="landing-section" id="quickstart">
        <div className="landing-h2-block">
          <h2 className="landing-h2">Quick Start</h2>
          <div className="landing-h2-sub">5분 빠른 시작</div>
        </div>
        <ol className="landing-steps">
          <li className="landing-step">
            <span className="landing-step-num" aria-hidden="true">1</span>
            <div className="landing-step-body">
              <span className="landing-step-title">공식 표기 확인</span>
              <Link to="/overview" className="landing-step-link">/overview →</Link>
            </div>
          </li>
          <li className="landing-step">
            <span className="landing-step-num" aria-hidden="true">2</span>
            <div className="landing-step-body">
              <span className="landing-step-title">로고·컬러 받기</span>
              <span className="landing-step-link">
                <Link to="/logo">/logo</Link>
                <span className="landing-step-sep"> · </span>
                <Link to="/color">/color</Link>
              </span>
            </div>
          </li>
          <li className="landing-step">
            <span className="landing-step-num" aria-hidden="true">3</span>
            <div className="landing-step-body">
              <span className="landing-step-title">텍스트·표기 규칙 확인</span>
              <Link to="/notation" className="landing-step-link">/notation →</Link>
            </div>
          </li>
        </ol>
      </section>

      {/* §4.2.4 자주 찾는 자료 ----------------------------------------- */}
      <section className="landing-section" id="quick-links">
        <div className="landing-h2-block">
          <h2 className="landing-h2">Quick Links</h2>
          <div className="landing-h2-sub">자주 찾는 자료</div>
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

      {/* §4.2.5 공지·업데이트 ----------------------------------------- */}
      <section className="landing-section" id="updates">
        <div className="landing-h2-block">
          <h2 className="landing-h2">Recent Updates</h2>
          <div className="landing-h2-sub">최근 업데이트</div>
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

      {/* §4.2.6 문의 박스 ---------------------------------------------- */}
      <section className="landing-section" id="contact">
        <div className="landing-contact-box">
          <div className="landing-h2-block">
            <h2 className="landing-h2 landing-contact-h2">Contact</h2>
            <div className="landing-h2-sub">더 궁금한 점이 있다면</div>
          </div>
          <p>
            가이드에 없는 사용 사례가 있나요?{' '}
            <a href={`mailto:${window.KIMES_EVENT.contact.email}`}>{window.KIMES_EVENT.contact.email}</a>로
            문의해주세요. 영업일 3~5일 안에 답변드립니다.
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

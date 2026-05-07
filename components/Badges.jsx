/* eslint-disable */
/**
 * Badges — small status pills used across exhibitor lists, schedule rows,
 * news cards, and lead-retrieval surfaces. CSS lives in components/badges.css.
 */

const useSiteLang = window.useSiteLang;
function trB(en, ko, lang) { return lang === 'ko' && ko ? ko : en; }

function BadgesIntro() {
  const lang = useSiteLang();
  return (
    <section id="badges" className="section">
      <div className="section-eyebrow">{trB('05 — Badges', '05 — 배지')}</div>
      <h2>{trB('Badges & pills', '배지 & 필')}</h2>
      <p className="lede">
        {trB(
          'Tiny status indicators — live sessions, sold-out booths, press-only events, new exhibitors. Set in Montserrat 700 at 10.5 px with 0.08 em tracking; never above 14 px.',
          '작은 상태 표시 — 라이브 세션, 매진 부스, 프레스 전용 이벤트, 신규 참가업체. Montserrat 700 / 10.5 px / 자간 0.08 em; 14 px 초과 금지.'
        )}
      </p>
    </section>
  );
}

function BadgesSet() {
  const lang = useSiteLang();
  const items = [
    { label: 'LIVE',      krLabel: '라이브',     cls: 'live' },
    { label: 'NEW',        krLabel: '신규',       cls: 'new' },
    { label: 'PRESS',      krLabel: '프레스',     cls: 'press' },
    { label: 'SOLD OUT',   krLabel: '매진',       cls: 'soldout' },
    { label: 'INVITE-ONLY', krLabel: '초청 전용',  cls: 'invite' },
    { label: 'KIMES PICK', krLabel: 'KIMES 추천',  cls: 'pick' },
    { label: 'BETA',       krLabel: '베타',       cls: 'beta' },
    { label: 'ARCHIVED',   krLabel: '아카이브',   cls: 'archived' },
  ];
  return (
    <div id="badges-set" className="subsection">
      <h3>{trB('05.1 — Status pills', '05.1 — 상태 필')}</h3>
      <p className="desc">
        {trB('Eight common statuses. Each pill carries a single semantic — never combine two.', '자주 쓰는 8개 상태. 각 필은 한 가지 의미만 — 두 개 결합 금지.')}
      </p>
      <div className="kbg-row">
        {items.map(it => (
          <span key={it.label} className={`kbg kbg--${it.cls}`}>{lang === 'ko' && it.krLabel ? it.krLabel : it.label}</span>
        ))}
      </div>
    </div>
  );
}

function BadgesNumeric() {
  const lang = useSiteLang();
  return (
    <div id="badges-numeric" className="subsection">
      <h3>{trB('05.2 — Numeric badges', '05.2 — 숫자 배지')}</h3>
      <p className="desc">
        {trB('Small dot or count attached to icons. Use for unread counts and notification flags.', '아이콘에 부착하는 작은 도트·카운트. 읽지 않음·알림 표시에 사용.')}
      </p>
      <div className="kbg-num-row">
        <button className="kbg-icon" aria-label="Notifications">🔔<span className="kbg-dot" /></button>
        <button className="kbg-icon" aria-label="Messages">✉<span className="kbg-count">3</span></button>
        <button className="kbg-icon" aria-label="Cart">🛒<span className="kbg-count">12</span></button>
        <button className="kbg-icon" aria-label="Pile">📂<span className="kbg-count">99+</span></button>
      </div>
    </div>
  );
}

function Badges() {
  return (
    <React.Fragment>
      <BadgesIntro />
      <BadgesSet />
      <BadgesNumeric />
    </React.Fragment>
  );
}

Object.assign(window, { Badges, BadgesIntro, BadgesSet, BadgesNumeric });

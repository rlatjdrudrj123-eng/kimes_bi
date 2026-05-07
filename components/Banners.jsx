/* eslint-disable */
/**
 * Banners — full-width alerts pinned to the top of a page or section.
 * Five tones (info / success / warning / error / brand) plus a dismissable
 * variant. CSS lives in components/banners.css.
 */

const useSiteLang = window.useSiteLang;
function trBn(en, ko, lang) { return lang === 'ko' && ko ? ko : en; }

function BannersIntro() {
  const lang = useSiteLang();
  return (
    <section id="banners" className="section">
      <div className="section-eyebrow">{trBn('06 — Banners', '06 — 배너')}</div>
      <h2>{trBn('Banners', '배너')}</h2>
      <p className="lede">
        {trBn(
          'Page-level alerts. Use for show-day operations (delays, hall closures), CTA reminders (pre-registration deadline), and policy updates. Never stack more than two.',
          '페이지 단위 알림. 행사 당일 운영(지연·홀 폐쇄), CTA 리마인더(사전등록 마감), 정책 변경 안내에 사용. 두 개 초과 적층 금지.'
        )}
      </p>
    </section>
  );
}

function BannersSet() {
  const lang = useSiteLang();
  const items = [
    {
      tone: 'info',
      icon: 'ⓘ',
      label: trBn('Schedule update', '일정 변경 안내'),
      body: trBn('Hall B-211 keynote moved to 14:30. Same speaker, new room.', '홀 B-211 키노트가 14:30으로 이동. 동일 연사, 새 룸.'),
    },
    {
      tone: 'success',
      icon: '✓',
      label: trBn('Pre-registration confirmed', '사전등록 완료'),
      body: trBn('Your visitor badge has been emailed. Bring photo ID at the East Gate.', '방문자 배지가 이메일로 발송됨. 동문에서 신분증 지참.'),
    },
    {
      tone: 'warning',
      icon: '!',
      label: trBn('Limited availability', '잔여 좌석 적음'),
      body: trBn('INSPIRE Stage 02 — only 12 seats remain for the 16:00 session.', 'INSPIRE Stage 02 — 16:00 세션 잔여 12석.'),
    },
    {
      tone: 'error',
      icon: '✗',
      label: trBn('Hall D temporarily closed', '홀 D 일시 폐쇄'),
      body: trBn('Power maintenance until 11:00. Beauty&Derma booths reopen on schedule.', '11:00까지 전력 점검. Beauty&Derma 부스는 예정대로 재개.'),
    },
    {
      tone: 'brand',
      icon: '★',
      label: trBn('Last day to pre-register', '사전등록 마감일'),
      body: trBn('On-site registration is ₩50,000. Pre-register free at kimes.kr by March 18.', '현장 등록 ₩50,000. 3월 18일까지 kimes.kr에서 무료 사전등록.'),
    },
  ];
  return (
    <div id="banners-set" className="subsection">
      <h3>{trBn('06.1 — Tone variants', '06.1 — 톤 변형')}</h3>
      <p className="desc">
        {trBn('Five tones cover almost every operational message. Add a close button only when the message is non-blocking.', '운영 메시지의 거의 모든 케이스를 커버하는 5개 톤. 차단성이 없는 메시지에만 닫기 버튼 추가.')}
      </p>
      <div className="kbn-stack">
        {items.map((it, i) => (
          <div key={it.tone} className={`kbn kbn--${it.tone}`}>
            <span className="kbn-icon" aria-hidden="true">{it.icon}</span>
            <div className="kbn-body">
              <strong>{it.label}</strong>
              <span>{it.body}</span>
            </div>
            <button className="kbn-close" aria-label={trBn('Dismiss', '닫기')}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BannersInline() {
  const lang = useSiteLang();
  return (
    <div id="banners-inline" className="subsection">
      <h3>{trBn('06.2 — Inline messages', '06.2 — 인라인 메시지')}</h3>
      <p className="desc">
        {trBn(
          'Compact form-field-level feedback. Sits inside a content card or under a form, never spans the full page.',
          '폼 필드 단위의 컴팩트 피드백. 콘텐츠 카드 안 또는 폼 하단에 위치, 페이지 전체를 차지하지 않음.'
        )}
      </p>
      <div className="kbn-inline-row">
        <div className="kbn-inline kbn-inline--info">
          <span className="kbn-inline-icon">ⓘ</span>
          <span>{trBn('NFC card replaces paper tickets at all KIMES halls.', 'NFC 카드가 모든 KIMES 홀에서 종이 티켓을 대체합니다.')}</span>
        </div>
        <div className="kbn-inline kbn-inline--warning">
          <span className="kbn-inline-icon">!</span>
          <span>{trBn('This session is conducted in Korean only.', '이 세션은 한국어로만 진행됩니다.')}</span>
        </div>
      </div>
    </div>
  );
}

function Banners() {
  return (
    <React.Fragment>
      <BannersIntro />
      <BannersSet />
      <BannersInline />
    </React.Fragment>
  );
}

Object.assign(window, { Banners, BannersIntro, BannersSet, BannersInline });

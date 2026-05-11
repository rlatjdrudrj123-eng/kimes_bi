// §11 — /contact (v2027.1). 3종 문의 채널 — kimes@kimes.kr. 메일 제목
// prefix로 분류 (mailto 링크 자동 적용).

const PageShell = window.PageShell;
const SectionHeading = window.SectionHeading;

const CHANNELS = [
  {
    id: 'general',
    label: '일반 BI 문의',
    en: 'General Inquiry',
    desc: '가이드 외 사용 사례 · 표기 질문',
    time: '영업일 1~2일',
    subject: '[BI 문의] ',
  },
  {
    id: 'permission',
    label: '사전 승인',
    en: 'Pre-approval',
    desc: '굿즈·광고·영상물 등 사전 승인 대상',
    time: '영업일 3~5일 1차 회신',
    subject: '[승인 신청] ',
  },
  {
    id: 'license',
    label: '라이선스',
    en: 'Licensing',
    desc: '"공식 파트너" 등 별도 계약 필요 표현',
    time: '영업일 5~10일 1차 회신',
    subject: '[라이선스 문의] ',
  },
];

function ContactPage() {
  const { contact } = window.KIMES_EVENT;

  return (
    <PageShell
      title="문의 · 신청"
      lede={`3종 문의 채널 — ${contact.email}. 메일 제목 prefix로 분류.`}
    >
      <SectionHeading id="channels" title="문의 채널" />
      <div className="ct-channels">
        {CHANNELS.map(c => (
          <article key={c.id} className="ct-channel">
            <header className="ct-channel-head">
              <span className="ct-channel-label">{c.label}</span>
              <span className="ct-channel-en">{c.en}</span>
            </header>
            <p className="ct-channel-desc">{c.desc}</p>
            <div className="ct-channel-meta">회신 — {c.time}</div>
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent(c.subject)}`}
              className="btn btn-primary btn-md"
            >
              {c.subject.trim()} 메일 →
            </a>
          </article>
        ))}
      </div>

      <SectionHeading id="direct" title="직접 연락" />
      <div className="ct-direct">
        <ul className="ct-direct-list">
          <li>
            <strong>메일</strong> —{' '}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>
            <strong>전화</strong> —{' '}
            <a href={`tel:${contact.tel.replace(/-/g, '')}`}>{contact.tel}</a>
          </li>
        </ul>
        <p className="ct-direct-note">
          사전 승인·라이선스 문의 시 매체·기간·시안 (PDF·이미지) 첨부 시
          검토 단축.
        </p>
      </div>
    </PageShell>
  );
}

window.ContactPage = ContactPage;
